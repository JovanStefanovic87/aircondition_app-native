-- update_v4.sql

INSERT INTO GroupType (name) VALUES ('PHYSIKALISCH');
INSERT INTO GroupType (name) VALUES ('KONSTRUKTIV');
INSERT INTO GroupType (name) VALUES ('MIKROBIOLOGISCH');
INSERT INTO GroupType (name) VALUES ('LUFTKEIMZAHLMESSUNG');


INSERT INTO TitleComponent (name, isUsingImage) VALUES ('ANLAGE', true);
INSERT INTO TitleComponent (name, isUsingImage) VALUES ('ANLAGE', false);
INSERT INTO TitleComponent (name, isUsingImage) VALUES ('GESAMT', true);
INSERT INTO TitleComponent (name, isUsingImage) VALUES ('AUSSEN', true);

INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (12, 'Schmutz', 1, 2, true, 1);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (13, 'Korrosion', 1, 2, true, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (14, 'Blätter', 1, 2, false, 3);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (15, 'Beschädigung', 2, 2, false, 4);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (16, 'Nicht einsehbar', 2, 2, false, 5);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (17, 'Schutzgitter nicht vorhanden', 2, 2, false, 6);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (18, 'Abstand AL-Öffnung zu Aufbau nicht ausreichend', 2, 2, false, 7);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (19, 'Abstand AL-Öffnung zu Boden nicht ausreichend', 2, 2, false, 8);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId, isUsingNote, displayOrder) VALUES (20, 'Abstand AL-Öffnung zu FL-AL nicht ausreichend', 2, 2, false, 9);


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


INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (12, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (13, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (14, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (15, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (16, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (17, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (18, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (19, 3, 1);
INSERT INTO ElementAndTitle (deviceStateComponentId, titleComponentId, deviceElementId) VALUES (20, 3, 1);