-- update_v1.sql

CREATE TABLE IF NOT EXISTS DatabaseVersion (
  version INTEGER PRIMARY KEY
);

-- Insert the first version into the DatabaseVersion table
INSERT INTO DatabaseVersion (version) VALUES (1);

CREATE TABLE IF NOT EXISTS DeviceType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS InspectionType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS UserRole (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  name VARCHAR(100),
  userName VARCHAR(255),
  password VARCHAR(255),
  roleId INTEGER,
  FOREIGN KEY (roleId) REFERENCES UserRole(id)
);

CREATE TABLE IF NOT EXISTS InspectionStatus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50)
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
  constructionYear INTEGER,
  lastMaintenance DATE,
  userId TEXT,
  inspectionStatusId INTEGER,
  isDeleted BOOLEAN DEFAULT 0,
  FOREIGN KEY (deviceTypeId) REFERENCES DeviceType(id),
  FOREIGN KEY (inspectionTypeId) REFERENCES InspectionType(id),
  FOREIGN KEY (userId) REFERENCES User(id)
  FOREIGN KEY (inspectionStatusId) REFERENCES InspectionStatus(id)
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


INSERT INTO InspectionStatus (name) VALUES ('Started');
INSERT INTO InspectionStatus (name) VALUES ('Completed');
INSERT INTO InspectionStatus (name) VALUES ('Finalized');
INSERT INTO InspectionStatus (name) VALUES ('Locked');

INSERT INTO UserRole (name) VALUES ('admin');
INSERT INTO UserRole (name) VALUES ('user');


INSERT INTO User (id, name, userName, password, roleId) VALUES (<GUID>, 'Darko Sovilj', 'darko', 'hashed_password', 1);