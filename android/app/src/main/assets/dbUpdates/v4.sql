-- update_v4.sql

INSERT INTO DeviceElementType (id, name) VALUES (1, 'KANAL');
INSERT INTO DeviceElementType (id, name) VALUES (2, 'KLAPPE');
INSERT INTO DeviceElementType (id, name) VALUES (3, 'WÄRMETAUSCHER');
INSERT INTO DeviceElementType (id, name) VALUES (4, 'FILTER');
INSERT INTO DeviceElementType (id, name) VALUES (5, 'REGISTER');
INSERT INTO DeviceElementType (id, name) VALUES (6, 'VENTILATOR');
INSERT INTO DeviceElementType (id, name) VALUES (7, 'BEFEUCHTER');
INSERT INTO DeviceElementType (id, name) VALUES (8, 'SONSTIGES');
INSERT INTO DeviceElementType (id, name) VALUES (9, 'KÜHLTÜRME');
INSERT INTO DeviceElementType (id, name) VALUES (10, 'DIGESTORIEN');


INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (1, 'Außenluftansaugung', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (2, 'Außenluftkanal', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (3, 'Schalldämpfer', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (4, 'Zuluftkanal in Technikzentrale', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (5, 'Zuluftkanal', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (6, 'Luftauslass', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (7, 'Umluftansaugung', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (8, 'Edverlegter Kanal', 1, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (9, 'Jalousieklappe', 2, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (10, 'Mischluftklappe', 2, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (11, 'Bypass', 2, './assets/images/devices/abluftanglage.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (12, 'Kreislaufverbudsystem', 3, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (13, 'Rotationswärmetauscher', 3, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (14, 'Kreuzwermetauscher', 3, './assets/images/devices/abluftanglage.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (15, 'Filter M5', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (16, 'Filter F7', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (17, 'Filter <= G4', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (18, 'Filter F9', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (19, 'Filter ePM1 >= 50%', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (20, 'Filter ePM2,5 >= 50%', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (21, 'Filter H13', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (22, 'Filter ePM10 > 50%', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (23, 'Filter ePM1 > 80%', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (24, 'Filer Coarse', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (25, 'UV-Lampe', 4, './assets/images/devices/abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, deviceImagePath) VALUES (26, 'Filter H11', 4, './assets/images/devices/abluftanglage.png');
