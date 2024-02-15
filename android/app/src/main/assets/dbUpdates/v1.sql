-- update_v1.sql

CREATE TABLE IF NOT EXISTS DatabaseVersion (
  version INTEGER PRIMARY KEY
);

-- Insert the first version into the DatabaseVersion table
INSERT INTO DatabaseVersion (version) VALUES (1);

CREATE TABLE IF NOT EXISTS DeviceType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS InspectionType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS UserRole (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  name VARCHAR(255),
  userName VARCHAR(255),
  password VARCHAR(255),
  roleId INTEGER,
  FOREIGN KEY (roleId) REFERENCES UserRole(id)
);

CREATE TABLE IF NOT EXISTS Inspection (
  id TEXT PRIMARY KEY,
  barcode VARCHAR(13),
  deviceTypeId INTEGER,
  inspectionTypeId INTEGER,
  facilityName VARCHAR(100),
  location VARCHAR(100),
  contractNumber VARCHAR(100),
  createdAt DATE DEFAULT (datetime('now','localtime')),
  airVolume NUMERIC,
  userId TEXT,
  FOREIGN KEY (deviceTypeId) REFERENCES DeviceType(id),
  FOREIGN KEY (inspectionTypeId) REFERENCES InspectionType(id),
  FOREIGN KEY (userId) REFERENCES User(id)
);


INSERT INTO DeviceType (name) VALUES ('RLT-Anlage');
INSERT INTO DeviceType (name) VALUES ('Kühlturm');
INSERT INTO DeviceType (name) VALUES ('Gefahrstoffschrank');
INSERT INTO DeviceType (name) VALUES ('Laborabzung');
INSERT INTO DeviceType (name) VALUES ('Nassabscheider');


INSERT INTO InspectionType (name) VALUES ('Gefährdungsbeurteilung VDI 6022');
INSERT INTO InspectionType (name) VALUES ('Hygieneerstinspektion VDI 6022');
INSERT INTO InspectionType (name) VALUES ('Hygieneinspektion VDI 6022');
INSERT INTO InspectionType (name) VALUES ('Routineprüfung nach DIN EN 14175 von Gefahrstoffschränken');
INSERT INTO InspectionType (name) VALUES ('Routineprüfung nach DIN EN 14175 von Laborabzügen');


INSERT INTO UserRole (name) VALUES ('admin');
INSERT INTO UserRole (name) VALUES ('user');


INSERT INTO User (id, name, userName, password, roleId) VALUES (<GUID>, 'Darko Sovilj', 'darko', 'hashed_password', 1);