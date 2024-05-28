-- update_v4.sql

-- INSERT INTO GroupType (name) VALUES ('PHYSIKALISCH');
-- INSERT INTO GroupType (name) VALUES ('KONSTRUKTIV');
-- INSERT INTO GroupType (name) VALUES ('MIKROBIOLOGISCH');
-- INSERT INTO GroupType (name) VALUES ('LUFTKEIMZAHLMESSUNG');


-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (1, 'ANLAGE', true);
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (2, 'ANLAGE', false);
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (3, 'GESAMT', true);
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (4, 'AUSSEN', true);
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (5, 'DÄMPFELEMENT', true);

-- INSERT INTO StateType (id, name) VALUES (1, 'State of whole device');
-- INSERT INTO StateType (id, name) VALUES (2, 'State of device element');

ä => Ä
ö => Ö
ü => Ü
ß => SS

INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (12, 'Schmutz', 1, 2, true);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (13, 'Korrosion', 1, 2, true);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (14, 'Blätter', 1, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (15, 'Beschädigung', 2, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (16, 'Nicht einsehbar', 2, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (17, 'Schutzgitter nicht vorhanden', 2, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (18, 'Abstand AL-Öffnung zu Aufbau nicht ausreichend', 2, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (19, 'Abstand AL-Öffnung zu Boden nicht ausreichend', 2, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (20, 'Abstand AL-Öffnung zu FL-AL nicht ausreichend', 2, 2, false);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote) VALUES (21, 'Abstand AL-Öffnung zu FL-AL nicht ausreichend', 2, 2, false);


INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (12, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (12, 3);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (13, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (13, 3);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (14, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (14, 3);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (15, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (15, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (15, 3);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (15, 4);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (16, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (16, 3);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (17, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (17, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (18, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (18, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (19, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (19, 2);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (20, 1);
INSERT INTO Device_StateValue (deviceStateComponentId, stateValueId) VALUES (20, 2);


INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (12, 3, 1, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (13, 3, 1, 2);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (14, 3, 1, 3);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (15, 3, 1, 4);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (16, 3, 1, 5);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (17, 3, 1, 6);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (18, 3, 1, 7);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (19, 3, 1, 8);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (20, 3, 1, 9);

INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (12, 3, 2, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (13, 3, 2, 2);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (16, 3, 2, 3);

INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (12, 5, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (13, 5, 3, 2);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (15, 5, 3, 3);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (16, 5, 3, 4);


INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (12, 3, 4, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (13, 3, 4, 2);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (15, 3, 4, 3);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (16, 3, 4, 4);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (15, 3, 4, 5);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId, displayOrder) VALUES (16, 3, 4, 6);