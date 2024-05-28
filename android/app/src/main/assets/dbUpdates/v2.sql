-- update_v2.sql

CREATE TABLE IF NOT EXISTS DeviceElementType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS DeviceElementPosition (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);


CREATE TABLE IF NOT EXISTS DeviceElement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  imageFileName TEXT,
  imagePath TEXT,
  deviceElementTypeId INTEGER,
  isDeleted BOOL DEFAULT false,
  FOREIGN KEY (deviceElementTypeId) REFERENCES DeviceElementType(id)
);

CREATE TABLE IF NOT EXISTS ImageStorage (
  id TEXT PRIMARY KEY,
  name TEXT,
  storagePath TEXT
);

CREATE TABLE IF NOT EXISTS TitleComponent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  isUsingImage BOOL DEFAULT false
);

CREATE TABLE IF NOT EXISTS TitleComponent_Image (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titleComponentId INTEGER,
  imageId TEXT,
  FOREIGN KEY (titleComponentId) REFERENCES TitleComponent(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);

CREATE TABLE IF NOT EXISTS GroupType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS StateType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS DeviceStateComponent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  groupTypeId INTEGER,
  stateTypeId INTEGER,
  isUsingNote BOOL DEFAULT false,
  FOREIGN KEY (groupTypeId) REFERENCES GroupType(id),
  FOREIGN KEY (stateTypeId) REFERENCES StateType(id),
);

CREATE TABLE IF NOT EXISTS ElementAndTitle (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deviceStateComponentId INTEGER,
  titleComponentId INTEGER,
  deviceElementId INTEGER NULL,
  displayOrder INTEGER,
  FOREIGN KEY (deviceStateComponentId) REFERENCES DeviceStateComponent(id),
  FOREIGN KEY (titleComponentId) REFERENCES TitleComponent(id),
  FOREIGN KEY (deviceElementId) REFERENCES DeviceElement(id)
);

CREATE TABLE IF NOT EXISTS MeasurementComponent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  groupTypeId INTEGER,
  titleComponentId INTEGER,
  elementId INTEGER NULL,
  displayOrder INTEGER,
  FOREIGN KEY (groupTypeId) REFERENCES GroupType(id),
  FOREIGN KEY (titleComponentId) REFERENCES TitleComponent(id),
  FOREIGN KEY (elementId) REFERENCES DeviceElement(id)
);

CREATE TABLE IF NOT EXISTS QuestionGroup (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  number INTEGER
);

CREATE TABLE IF NOT EXISTS QuestionComponent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  inspectionTypeId INTEGER,
  questionGroupId INTEGER,
  fullDescription TEXT,
  displayOrder INTEGER,
  FOREIGN KEY (inspectionTypeId) REFERENCES InspectionType(id),
  FOREIGN KEY (questionGroupId) REFERENCES QuestionGroup(id)
);

CREATE TABLE IF NOT EXISTS Question_Image (
  id TEXT PRIMARY KEY,
  questionId INTEGER,
  imageId TEXT,
  FOREIGN KEY (questionId) REFERENCES QuestionComponent(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);

CREATE TABLE IF NOT EXISTS AnswerType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS StateValue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Inspection_Question (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  questionId INTEGER,
  answerId INTEGER,
  comment TEXT,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (questionId) REFERENCES QuestionComponent(id),
  FOREIGN KEY (answerId) REFERENCES AnswerType(id)
);

CREATE TABLE IF NOT EXISTS Inspection_Measurement (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  measurementId INTEGER,
  value REAL NULL,
  barcode VARCHAR(13),
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (measurementId) REFERENCES MeasurementComponent(id)
);

CREATE TABLE IF NOT EXISTS Inspection_DeviceState (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  deviceStateId INTEGER,
  value REAL NULL,
  note TEXT,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (deviceStateId) REFERENCES DeviceStateComponent(id)
);

CREATE TABLE IF NOT EXISTS Inspection_DeviceElement (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  deviceElementId INTEGER,
  deviceOrder INTEGER,
  elementPositionId INTEGER,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (deviceElementId) REFERENCES DeviceElement(id),
  FOREIGN KEY (elementPositionId) REFERENCES DeviceElementPosition(id)
);

CREATE TABLE IF NOT EXISTS Device_StateValue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deviceStateComponentId INTEGER,
  stateValueId INTEGER,
  FOREIGN KEY (deviceStateComponentId) REFERENCES DeviceStateComponent(id),
  FOREIGN KEY (stateValueId) REFERENCES StateValue(id)
);

INSERT INTO DeviceElementPosition (id, name) VALUES (1, 'BEFORE');
INSERT INTO DeviceElementPosition (id, name) VALUES (2, 'BETWEEN');
INSERT INTO DeviceElementPosition (id, name) VALUES (3, 'AFTER');

INSERT INTO StateType (id, name) VALUES (1, 'State of whole device');
INSERT INTO StateType (id, name) VALUES (2, 'State of device element');

INSERT INTO StateValue (name) VALUES ('GREEN');
INSERT INTO StateValue (name) VALUES ('YELLOW');
INSERT INTO StateValue (name) VALUES ('ORANGE');
INSERT INTO StateValue (name) VALUES ('RED');

INSERT INTO GroupType (name) VALUES ('PHYSIKALISCH');
INSERT INTO GroupType (name) VALUES ('KONSTRUKTIV');
INSERT INTO GroupType (name) VALUES ('MIKROBIOLOGISCH');
INSERT INTO GroupType (name) VALUES ('LUFTKEIMZAHLMESSUNG');

INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (1, 'ANLAGE', true);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (2, 'ANLAGE', false);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (3, 'GESAMT', true);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (4, 'AUSSEN', true);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (5, 'DÄMPFELEMENT', true);

INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (1, 'Gehäuse-/ Türabdichtung fehlt / defekt', 2, 1, true);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (2, 'Gehäuse undicht', 2, 1, true);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (3, 'Bodenablauf nicht verschlossen', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (4, 'Kenndaten fehlen', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (5, 'Nicht einsehbar/prüfbar', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (6, 'Innendämmung abgelöst / beschädigt', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (7, 'Pflanzenbewuchs', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (8, 'Poröse Gehäuse-/Rahmendichtung', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (9, 'Poröe Innendämmung', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (10, 'Element fehlt / vertauscht', 2, 1, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (11, 'Fremdmaterial', 1, 1, true);

INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (1, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (1, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (2, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (2, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (3, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (3, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (4, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (4, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (5, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (5, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (6, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (6, 4);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (7, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (7, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (8, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (8, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (9, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (9, 4);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (10, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (10, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (10, 3);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (10, 4);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (11, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (11, 2);

INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (1, 1, NULL, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (2, 1, NULL, 2);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (3, 1, NULL, 3);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (4, 1, NULL, 4);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (5, 1, NULL, 5);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (6, 1, NULL, 6);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (7, 1, NULL, 7);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (8, 1, NULL, 8);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (9, 1, NULL, 9);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (10, 1, NULL, 10);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (11, 1, NULL, 11);



