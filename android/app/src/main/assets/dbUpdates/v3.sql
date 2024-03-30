-- update_v3.sql

CREATE TABLE IF NOT EXISTS Inspection_Image (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  imageId TEXT,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);

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


INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (1, 'Außenluftansaugung', 1, 'außenluftansaugung.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (2, 'Außenluftkanal', 1, 'außenluftkanal.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (3, 'Schalldämpfer', 1, 'schalldämpfer.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (4, 'Zuluftkanal in Technikzentrale', 1, 'zuluftkanalint.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (5, 'Zuluftkanal', 1, 'zuluftkanal.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (6, 'Luftauslass', 1, 'luftauslass.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (7, 'Umluftansaugung', 1, 'umluftansaugung.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (8, 'Edverlegter Kanal', 1, 'edverlegterkanal.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (9, 'Jalousieklappe', 2, 'jalousieklappe.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (10, 'Mischluftklappe', 2, 'mischluftklappe.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (11, 'Bypass', 2, 'bypass.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (12, 'Kreislaufverbudsystem', 3, 'kreislaufverbudsystem.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (13, 'Rotationswärmetauscher', 3, 'rotationswarm.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (14, 'Kreuzwermetauscher', 3, 'kreuzwermetauscher.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (15, 'Filter M5', 4, 'filterM5.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (16, 'Filter F7', 4, 'filterF7.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (17, 'Filter <= G4', 4, 'filterG4Arrow.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (18, 'Filter F9', 4, 'filterF9.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (19, 'Filter ePM1 >= 50%', 4, 'filterePM1-50.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (20, 'Filter ePM2,5 >= 50%', 4, 'filterePM2,5-50.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (21, 'Filter H13', 4, 'filterH13.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (22, 'Filter ePM10 > 50%', 4, 'filterePM10-50.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (23, 'Filter ePM1 > 80%', 4, 'filterePM1-80.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (24, 'Filer Coarse', 4, 'filtercoarse.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (25, 'UV-Lampe', 4, 'uv-lampe.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (26, 'Filter H11', 4, 'filterH11.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (27, 'Erhitzer', 5, 'erhitzer.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (28, 'Kühler', 5, 'kühler.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (29, 'Tropfenabscheider', 5, 'tropfenabsche.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (30, 'Ventilator', 6, 'ventilator.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (31, 'Dampfbefeuchter', 7, 'dampfbefeuch.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (32, 'Befeuchter', 7, 'befeuchter.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (33, 'Entfeuchter', 7, 'entfeuchter.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (34, 'Dummy', 8, 'dummyelement.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (35, 'Splitgerät', 8, 'splitgerät.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (36, 'Abluftanlage', 8, 'abluftanglage.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (37, 'Abluftkanal', 8, 'abluftkanal.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (38, 'Behandlugszone', 8, 'behandlugszone.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (39, 'Umluftkühlgerät', 8, 'umluftkuhlgerat.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (40, 'Füllkörper', 9, 'füllkörper.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (41, 'Berieselung / Düsen', 9, 'berieselungd.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (42, 'Becken', 9, 'becken.png');

INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (43, 'Abluftgitter Digestorien', 10, 'abluftgitterdig.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (44, 'Filter Digestorien', 10, 'filterdigestori.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (45, 'Abluftkanal Digestorien', 10, 'abluftkanaldig.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (46, 'Frontschieber', 10, 'frontschieber-01.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (47, 'Abstellplatz', 10, 'abstellplatz.png');
INSERT INTO DeviceElement (id, name, deviceElementTypeId, imageFileName) VALUES (48, 'Gefahrstoffschrank', 10, 'gefahrstoffschran.png');
