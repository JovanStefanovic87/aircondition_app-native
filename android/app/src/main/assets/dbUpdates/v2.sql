

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
  deviceElementTypeId INTEGER,
  isDeleted INTEGER DEFAULT 0,
  FOREIGN KEY (deviceElementTypeId) REFERENCES DeviceElementType(id)
);

CREATE TABLE IF NOT EXISTS ImageStorage (
  id TEXT PRIMARY KEY,
  name TEXT,
  storagePath TEXT,
  storagePathS3 TEXT
);

CREATE TABLE IF NOT EXISTS TitleComponent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  isUsingImage INTEGER DEFAULT 0
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
  placeholder TEXT,
  FOREIGN KEY (groupTypeId) REFERENCES GroupType(id),
  FOREIGN KEY (stateTypeId) REFERENCES StateType(id)
);

CREATE TABLE IF NOT EXISTS Component_Element_Title (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deviceStateComponentId INTEGER,
  titleComponentId INTEGER,
  deviceElementId INTEGER,
  displayOrder INTEGER,
  isUsingNote INTEGER DEFAULT 0,
  isUsingMeasurementCheckbox INTEGER DEFAULT 0,
  FOREIGN KEY (deviceStateComponentId) REFERENCES DeviceStateComponent(id),
  FOREIGN KEY (titleComponentId) REFERENCES TitleComponent(id),
  FOREIGN KEY (deviceElementId) REFERENCES DeviceElement(id)
);

CREATE TABLE IF NOT EXISTS QuestionGroup (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  groupSymbol TEXT,
  groupReference TEXT
);

CREATE TABLE IF NOT EXISTS QuestionComponent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  inspectionTypeId INTEGER,
  questionGroupId INTEGER,
  fullDescription TEXT,
  displayOrder INTEGER,
  questionNumber TEXT,
  FOREIGN KEY (inspectionTypeId) REFERENCES InspectionType(id),
  FOREIGN KEY (questionGroupId) REFERENCES QuestionGroup(id)
);

CREATE TABLE IF NOT EXISTS AnswerType (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS StateValue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
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

CREATE TABLE IF NOT EXISTS Inspection_DeviceState (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  componentElementTitleId INTEGER,
  inspectionDeviceElementId TEXT,
  value REAL,
  note TEXT,
  isMeasurementPossible INTEGER,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (componentElementTitleId) REFERENCES Component_Element_Title(id),
  FOREIGN KEY (inspectionDeviceElementId) REFERENCES Inspection_DeviceElement(id)
);

CREATE TABLE IF NOT EXISTS Device_StateValue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  componentElementTitleId INTEGER,
  stateValueId INTEGER,
  FOREIGN KEY (componentElementTitleId) REFERENCES Component_Element_Title(id),
  FOREIGN KEY (stateValueId) REFERENCES StateValue(id)
);

CREATE TABLE IF NOT EXISTS InspectionQuestion_Image (
  id TEXT PRIMARY KEY,
  inspectionQuestionId TEXT NOT NULL,
  imageId TEXT NOT NULL,
  FOREIGN KEY (inspectionQuestionId) REFERENCES Inspection_Question(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);

CREATE TABLE IF NOT EXISTS DeviceElement_Image (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deviceElementId INTEGER NOT NULL,
  imageId TEXT NOT NULL,
  FOREIGN KEY (deviceElementId) REFERENCES DeviceElement(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);

CREATE TABLE IF NOT EXISTS Inspection_Element_Title_Group_Image (
  id TEXT PRIMARY KEY,
  inspectionDeviceElementId TEXT NOT NULL,
  titleComponentId INTEGER NOT NULL,
  groupTypeId INTEGER NOT NULL,
  imageId TEXT NOT NULL,
  FOREIGN KEY (inspectionDeviceElementId) REFERENCES Inspection_DeviceElement(id),
  FOREIGN KEY (titleComponentId) REFERENCES TitleComponent(id),
  FOREIGN KEY (groupTypeId) REFERENCES GroupType(id)
);

CREATE TABLE IF NOT EXISTS Inspection_Title_Group_Image (
  id TEXT PRIMARY KEY,
  inspectionId TEXT NOT NULL,
  titleComponentId INTEGER NOT NULL,
  groupTypeId INTEGER NOT NULL,
  imageId TEXT NOT NULL,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (titleComponentId) REFERENCES TitleComponent(id),
  FOREIGN KEY (groupTypeId) REFERENCES GroupType(id)
);

CREATE TABLE IF NOT EXISTS Inspection_Element_Image (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inspectionDeviceElementId TEXT NOT NULL,
  imageId TEXT NOT NULL,
  FOREIGN KEY (inspectionDeviceElementId) REFERENCES Inspection_DeviceElement(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);

INSERT INTO DeviceElementPosition (id, name) VALUES (1, 'BEFORE');
INSERT INTO DeviceElementPosition (id, name) VALUES (2, 'BETWEEN');
INSERT INTO DeviceElementPosition (id, name) VALUES (3, 'AFTER');

INSERT INTO StateType (id, name) VALUES (1, 'State of whole device');
INSERT INTO StateType (id, name) VALUES (2, 'State of device element');

INSERT INTO StateValue (id, name) VALUES (1, 'GREEN');
INSERT INTO StateValue (id, name) VALUES (2, 'YELLOW');
INSERT INTO StateValue (id, name) VALUES (3, 'ORANGE');
INSERT INTO StateValue (id, name) VALUES (4, 'RED');

INSERT INTO GroupType (name) VALUES ('PHYSIKALISCH');
INSERT INTO GroupType (name) VALUES ('KONSTRUKTIV');
INSERT INTO GroupType (name) VALUES ('MIKROBIOLOGISCH');
INSERT INTO GroupType (name) VALUES ('LUFTKEIMZAHLMESSUNG');
INSERT INTO GroupType (name) VALUES ('UMLAUFWASSERUNTERSUCHUNG');

INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (1, 'ANLAGE', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (2, 'ANLAGE', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (3, 'GESAMT', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (4, 'AUSSEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (5, 'DÄMPFELEMENT', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (6, 'LAMELLEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (7, 'RAHMEN, GESAMT', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (8, 'KONDENSATWANNE', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (9, 'GEHÄUSE', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (10, 'FILTER', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (11, 'REGISTER', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (12, 'VENTILATORGEHÄUSE', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (13, 'SCHAUFELRAD', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (14, 'BODEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (15, 'BECKEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (16, 'DAMPFLANZE', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (17, 'SPRÜHDÜSEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (18, 'LUFTAUSLASS', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (19, 'KÜHLERREGISTER', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (20, 'ABLUFTKANAL', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (21, 'VENTILATOR', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (22, 'JALOUSIEKLAPPEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (23, 'KÜHLER', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (24, 'MATERIAL', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (25, 'GEHÄUSE / RAHMEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (26, 'DÜSEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (27, 'MEDIEN', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (28, 'KANAL', 1);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (29, 'GLAS', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (30, 'SYSTEM', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (31, 'FLÄCHE', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (32, 'DÄMPFELEMENT', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (33, 'GESAMT', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (34, 'LAMELLEN', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (35, 'KONDENSATWANNE', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (36, 'GEHÄUSE', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (37, 'FILTER', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (38, 'SCHAUFELRAD', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (39, 'BECKEN', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (40, 'LUFTAUSLASS', 0);
INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (41, 'KÜHLER', 0);


INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (1, 'Gehäuse-/ Türabdichtung fehlt / defekt', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (2, 'Gehäuse undicht', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (3, 'Bodenablauf nicht verschlossen', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (4, 'Kenndaten fehlen', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (5, 'Nicht einsehbar/prüfbar', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (6, 'Innendämmung abgelöst / beschädigt', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (7, 'Pflanzenbewuchs', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (8, 'Poröse Gehäuse-/Rahmendichtung', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (9, 'Poröe Innendämmung', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (10, 'Element fehlt / vertauscht', 2, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (11, 'Fremdmaterial', 1, 1);



INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (1, 1, 1, NULL, 2, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (2, 2, 1, NULL, 3, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (3, 3, 1, NULL, 4, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (4, 4, 1, NULL, 5, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (5, 5, 1, NULL, 6, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (6, 6, 1, NULL, 7, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (7, 7, 1, NULL, 8, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (8, 8, 1, NULL, 9, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (9, 9, 1, NULL, 10, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (10, 10, 1, NULL, 11, 1);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (11, 11, 1, NULL, 1, 1);



INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (1, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (1, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (2, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (2, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (3, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (3, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (4, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (4, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (5, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (5, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (6, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (6, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (7, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (7, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (8, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (8, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (9, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (9, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (10, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (10, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (10, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (10, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (11, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (11, 2);

INSERT INTO AnswerType (id, name) VALUES (1, 'Yes');
INSERT INTO AnswerType (id, name) VALUES (2, 'No');
INSERT INTO AnswerType (id, name) VALUES (3, 'Not relevant');
