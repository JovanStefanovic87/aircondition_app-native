// runUpdates.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';
import { getDatabase } from '../dbConnection/initDatabase';
import uuid from 'react-native-uuid';


async function getCurrentDatabaseVersion() {
  const db = getDatabase();
  return await new Promise<number>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT MAX(version) AS currentVersion FROM DatabaseVersion', [], (_, result) => {
        const currentVersion = result.rows.item(0).currentVersion || 0;
        resolve(currentVersion);
      }, (_, error) => {
        resolve(0)
      });
    });
  });
}



async function executeSqlScript(scriptContent: string) {
  const db = getDatabase();

  return new Promise<void>((resolve, reject) => {
    const statements = scriptContent?.split(';').filter((statement) => statement.trim() !== '');

    const generateGuids = (script: string) => {
      return script.replace(/<GUID>/g, () => {
        const guid = uuid.v4();
        return `'${guid}'`;
      });
    };


    db.transaction((tx) => {
      console.log('.................Database update started.................')
      const processStatement = (index: number) => {

        if (statements && index < statements.length) {
          const sql = generateGuids(statements[index]);

          console.log('sql', sql)

          tx.executeSql(sql, [], (_, result) => {
            processStatement(index + 1);
          }, (_, error) => {
            console.log('error-executeSqlScript', error);
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
  const db = getDatabase();
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO DatabaseVersion (version) VALUES (?)', [newVersion], (_, result) => {
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
  const currentVersion = await getCurrentDatabaseVersion();

  const readSqlFile = async (version: number) => {
    const scriptPath = `dbUpdates/v${version}.sql`;
    const scriptContent = await fs.readFileAssets(scriptPath);
    return scriptContent;
  };

  async function processUpdate(version: number) {
    try {
      const scriptContent = await readSqlFile(version);

      await executeSqlScript(scriptContent);

      // Update the database_version table after each successful update
      if (version > 1) await updateDatabaseVersion(version);

      // Process the next update
      await processUpdate(version + 1);
    } catch (error) {
      if (error?.code === 'ENOENT') {
        // File not found, nothing to update
        console.log(`Database version v${version - 1} is up to date.`);
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



