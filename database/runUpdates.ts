// runUpdates.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

let db = null;

export async function openDatabaseConnection(): Promise<void> {
  if (!db) {
    db = await SQLite.openDatabase({ name: 'AC_inspector.db', location: 'default' });
  }
}


async function getCurrentDatabaseVersion() {
  return await new Promise<number>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT MAX(version) AS currentVersion FROM DatabaseVersion', [], (_, result) => {
        console.log('Inside transaction success callback'); // Log to check if this part is reached

        const currentVersion = result.rows.item(0).currentVersion || 0;
        resolve(currentVersion);
      }, (_, error) => {
        resolve(0)
      });
    });
  });
}



async function executeSqlScript(scriptContent: string) {
  return new Promise<void>((resolve, reject) => {
    const statements = scriptContent.split(';').filter((statement) => statement.trim() !== '');

    db.transaction((tx) => {
      const processStatement = (index: number) => {
        if (index < statements.length) {
          tx.executeSql(statements[index], [], (_, result) => {
            processStatement(index + 1);
          }, (_, error) => {
            reject(error);
          });
        } else {
          // All statements executed, commit the transaction
          tx.executeSql('COMMIT', [], () => {
            console.log('resolved');
            resolve();
          }, (_, error) => {
            console.log('error-commit', error);
            reject(error);
          });
        }
      };

      // Start processing statements
      processStatement(0);
    });
  });
}


async function updateDatabaseVersion(newVersion: number) {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO database_version (version) VALUES (?)', [newVersion], (_, result) => {
        tx.executeSql('COMMIT', [], () => {
          resolve();
        }, (_, error) => {
          reject(error);
        });
      }, (_, error) => {
        reject(error);
      });
    });
  });
}

export async function runDBUpdates() {
  console.log('.................Database update started.................')
  await openDatabaseConnection();

  const currentVersion = await getCurrentDatabaseVersion();

  console.log('currentVersion', currentVersion);

  const readSqlFile = async (version: number) => {
    const scriptPath = `updates/v${version}.sql`;
    const scriptContent = await fs.readFileAssets(scriptPath);
    return scriptContent;
  };

  async function processUpdate(version: number) {
    try {
      const scriptContent = await readSqlFile(version);

      await executeSqlScript(scriptContent);

      // Update the database_version table after each successful update
      // await updateDatabaseVersion(version);

      // Process the next update
      await processUpdate(version + 1);
    } catch (error) {
      if (error?.code === 'ENOENT') {
        // File not found, nothing to update
        console.log(`Database version v${version} is up to date.`);
      } else {
        // Handle other errors during script execution
        console.error(`Error executing update script v${version}:`, error);
      }
    }
  }

  // Start processing updates
  try {
    await processUpdate(currentVersion + 1);
    console.log('All updates were successful.');
  } catch (error) {
    console.error('Error processing updates:', error);
  }
}


export const clearDBInitialization = async () => {
  await AsyncStorage.removeItem('hasInitialized');
}



