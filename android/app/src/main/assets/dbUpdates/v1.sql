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
  name VARCHAR(50),
  sortOrder INTEGER
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
  note TEXT,
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


INSERT INTO InspectionType (id, name, sortOrder) VALUES (1, 'Hygieneerstinspektion VDI 6022', 2);
INSERT INTO InspectionType (id, name, sortOrder) VALUES (2, 'Gefährdungsbeurteilung VDI 6022', 1);
INSERT INTO InspectionType (id, name, sortOrder) VALUES (3, 'Hygieneinspektion VDI 6022', 3);
INSERT INTO InspectionType (id, name, sortOrder) VALUES (4, 'Routineprüfung nach DIN EN 14175 von Gefahrstoffschränken', 5);
INSERT INTO InspectionType (id, name, sortOrder) VALUES (5, 'Routineprüfung nach DIN EN 14175 von Laborabzügen', 6);
INSERT INTO InspectionType (id, name, sortOrder) VALUES (6, 'Hygieneerstinspektion und Gefährdungsbeurteilung', 4);


INSERT INTO InspectionStatus (id, name) VALUES (1, 'Started');
INSERT INTO InspectionStatus (id, name) VALUES (2, 'Completed');
INSERT INTO InspectionStatus (id, name) VALUES (3, 'Finalized');
INSERT INTO InspectionStatus (id, name) VALUES (4, 'Locked');

INSERT INTO UserRole (name) VALUES ('admin');
INSERT INTO UserRole (name) VALUES ('user');


INSERT INTO User (id, name, userName, password, roleId) VALUES (<GUID>, 'Darko Sovilj', 'darko', 'hashed_password', 1);