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


INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('83782107-ae93-42bb-aa6e-b62cde126393', 'außenluftansaugung.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/außenluftansaugung');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('45727ce1-f904-4bd8-a3d1-fba7cd51f40a', 'außenluftkanal.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/außenluftkanal');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('2c3b1f4e-1e2e-4d0c-8f3a-5b6e1f9c8a7d', 'schalldämpfer.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/schalldämpfer');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('d4f5e6a7-b8c9-4d0e-9f1a-2b3c4d5e6f7g', 'zuluftkanalint.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/zuluftkanalint');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('e7f8g9h0-i1j2-4k3l-5m6n-7o8p9q0r1s2t', 'zuluftkanal.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/zuluftkanal');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('u3v4w5x6-y7z8-4a5b-6c7d-8e9f0g1h2i3j', 'luftauslass.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/luftauslass');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('j4k5l6m7-n8o9-4p0q-1r2s-3t4u5v6w7x8y', 'umluftansaugung.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/umluftansaugung');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('z9a0b1c2-d3e4-4f5g-6h7i-8j9k0l1m2n3o', 'edverlegterkanal.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/edverlegterkanal');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('o4p5q6r7-s8t9-4u0v-1w2x-3y4z5a6b7c8d', 'jalousieklappe.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/jalousieklappe');

INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('d9e0f1g2-h3i4-4j5k-6l7m-8n9o0p1q2r3s', 'mischluftklappe.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/mischluftklappe');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('s4t5u6v7-w8x9-4y0z-1a2b-3c4d5e6f7g8h', 'bypass.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/bypass');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('h9i0j1k2-l3m4-4n5o-6p7q-8r9s0t1u2v3w', 'kreislaufverbudsystem.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/kreislaufverbudsystem');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('w4x5y6z7-a8b9-4c0d-1e2f-3g4h5i6j7k8l', 'rotationswarm.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/rotationswarm');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('l9m0n1o2-p3q4-4r5s-6t7u-8v9w0x1y2z3a', 'kreuzwermetauscher.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/kreuzwermetauscher');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('a4b5c6d7-e8f9-4g0h-1i2j-3k4l5m6n7o8p', 'filterM5.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterM5');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('p9q0r1s2-t3u4-4v5w-6x7y-8z9a0b1c2d3e', 'filterF7.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterF7');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('e4f5g6h7-i8j9-4k0l-1m2n-3o4p5q6r7s8t', 'filterG4Arrow.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterG4Arrow');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('t9u0v1w2-x3y4-4z5a-6b7c-8d9e0f1g2h3i', 'filterF9.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterF9');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('i4j5k6l7-m8n9-4o0p-1q2r-3s4t5u6v7w8x', 'filterePM1-50.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterePM1-50');

INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('x9y0z1a2-b3c4-4d5e-6f7g-8h9i0j1k2l3m', 'filterePM2,5-50.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterePM2,5-50');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('m4n5o6p7-q8r9-4s0t-1u2v-3w4x5y6z7a8b', 'filterH13.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterH13');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('b9c0d1e2-f3g4-4h5i-6j7k-8l9m0n1o2p3q', 'filterePM10-50.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterePM10-50');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('q4r5s6t7-u8v9-4w0x-1y2z-3a4b5c6d7e8f', 'filterePM1-80.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterePM1-80');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('f9g0h1i2-j3k4-4l5m-6n7o-8p9q0r1s2t3u', 'filtercoarse.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filtercoarse');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('u4v5w6x7-y8z9-4a0b-1c2d-3e4f5g6h7i8j', 'uv-lampe.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/uv-lampe');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('j9k0l1m2-n3o4-4p5q-6r7s-8t9u0v1w2x3y', 'filterH11.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterH11');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('y4z5a6b7-c8d9-4e0f-1g2h-3i4j5k6l7m8n', 'erhitzer.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/erhitzer');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('n9o0p1q2-r3s4-4t5u-6v7w-8x9y0z1a2b3c', 'kühler.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/kühler');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('c4d5e6f7-g8h9-4i0j-1k2l-3m4n5o6p7q8r', 'tropfenabsche.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/tropfenabsche');

INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('r9s0t1u2-v3w4-4x5y-6z7a-8b9c0d1e2f3g', 'ventilator.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/ventilator');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('g4h5i6j7-k8l9-4m0n-1o2p-3q4r5s6t7u8v', 'dampfbefeuch.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/dampfbefeuch');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('v9w0x1y2-z3a4-4b5c-6d7e-8f9g0h1i2j3k', 'befeuchter.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/befeuchter');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('k4l5m6n7-o8p9-4q0r-1s2t-3u4v5w6x7y8z', 'entfeuchter.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/entfeuchter');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('ffe6a479-e105-4042-9e9c-b13aedec817a', 'dummyelement.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/dummyelement');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('80b0e2fb-42b2-4fa6-ba10-8fdcf583e161', 'splitgerät.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/splitgerät');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('a5e6d2b0-9fe3-4c7d-ba2b-d83ff964b74c', 'abluftanglage.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftanglage');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('4035350a-09e7-4c12-8e6e-ab438663f443', 'abluftkanal.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftkanal');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('152fe28f-eb38-4ed3-8c3c-a8622329a6bd', 'behandlugszone.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/behandlugszone');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('eb56ee87-aabd-40c1-af5e-b90d739bd770', 'umluftkuhlgerat.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/umluftkuhlgerat');

INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('7fe63711-ff66-4be9-91f1-a226a9f8932c', 'füllkörper.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/füllkörper');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('ca337f08-ad67-4e3f-8f8d-470b77413653', 'berieselungd.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/berieselungd');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('acc3fec5-5faa-4c00-bbf5-6a8953bb2e6e', 'becken.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/becken');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('62b183cc-c12d-4e30-bb94-046230dbac1e', 'abluftgitterdig.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftgitterdig');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('3a25da68-592a-4da1-b598-07574f1fdf65', 'filterdigestori.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/filterdigestori');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('77167d57-c19b-4415-8456-c17d2a391567', 'abluftkanaldig.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftkanaldig');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('46b5c6d7-e8f9-4a0b-1c2d-3e4f5g6h7i8j', 'frontschieber-01.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/frontschieber-01');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('57c6d7e8-f9g0-4b1c-2d3e-4f5g6h7i8j9k', 'abstellplatz.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abstellplatz');
INSERT INTO ImageStorage(id, name, storagePathS3) VALUES ('68d7e8f9-g0h1-4c2d-3e4f-5g6h7i8j9k0l', 'gefahrstoffschrank.png', 'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/gefahrstoffschrank');


INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (1, '83782107-ae93-42bb-aa6e-b62cde126393');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (2, '45727ce1-f904-4bd8-a3d1-fba7cd51f40a');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (3, '2c3b1f4e-1e2e-4d0c-8f3a-5b6e1f9c8a7d');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (4, 'd4f5e6a7-b8c9-4d0e-9f1a-2b3c4d5e6f7g');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (5, 'e7f8g9h0-i1j2-4k3l-5m6n-7o8p9q0r1s2t');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (6, 'u3v4w5x6-y7z8-4a5b-6c7d-8e9f0g1h2i3j');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (7, 'j4k5l6m7-n8o9-4p0q-1r2s-3t4u5v6w7x8y');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (8, 'z9a0b1c2-d3e4-4f5g-6h7i-8j9k0l1m2n3o');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (9, 'o4p5q6r7-s8t9-4u0v-1w2x-3y4z5a6b7c8d');

INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (10, 'd9e0f1g2-h3i4-4j5k-6l7m-8n9o0p1q2r3s');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (11, 's4t5u6v7-w8x9-4y0z-1a2b-3c4d5e6f7g8h');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (12, 'h9i0j1k2-l3m4-4n5o-6p7q-8r9s0t1u2v3w');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (13, 'w4x5y6z7-a8b9-4c0d-1e2f-3g4h5i6j7k8l');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (14, 'l9m0n1o2-p3q4-4r5s-6t7u-8v9w0x1y2z3a');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (15, 'a4b5c6d7-e8f9-4g0h-1i2j-3k4l5m6n7o8p');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (16, 'p9q0r1s2-t3u4-4v5w-6x7y-8z9a0b1c2d3e');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (17, 'e4f5g6h7-i8j9-4k0l-1m2n-3o4p5q6r7s8t');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (18, 't9u0v1w2-x3y4-4z5a-6b7c-8d9e0f1g2h3i');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (19, 'i4j5k6l7-m8n9-4o0p-1q2r-3s4t5u6v7w8x');

INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (20, 'x9y0z1a2-b3c4-4d5e-6f7g-8h9i0j1k2l3m');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (21, 'm4n5o6p7-q8r9-4s0t-1u2v-3w4x5y6z7a8b');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (22, 'b9c0d1e2-f3g4-4h5i-6j7k-8l9m0n1o2p3q');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (23, 'q4r5s6t7-u8v9-4w0x-1y2z-3a4b5c6d7e8f');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (24, 'f9g0h1i2-j3k4-4l5m-6n7o-8p9q0r1s2t3u');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (25, 'u4v5w6x7-y8z9-4a0b-1c2d-3e4f5g6h7i8j');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (26, 'j9k0l1m2-n3o4-4p5q-6r7s-8t9u0v1w2x3y');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (27, 'y4z5a6b7-c8d9-4e0f-1g2h-3i4j5k6l7m8n');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (28, 'n9o0p1q2-r3s4-4t5u-6v7w-8x9y0z1a2b3c');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (29, 'c4d5e6f7-g8h9-4i0j-1k2l-3m4n5o6p7q8r');

INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (30, 'r9s0t1u2-v3w4-4x5y-6z7a-8b9c0d1e2f3g');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (31, 'g4h5i6j7-k8l9-4m0n-1o2p-3q4r5s6t7u8v');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (32, 'v9w0x1y2-z3a4-4b5c-6d7e-8f9g0h1i2j3k');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (33, 'k4l5m6n7-o8p9-4q0r-1s2t-3u4v5w6x7y8z');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (34, 'ffe6a479-e105-4042-9e9c-b13aedec817a');  
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (35, '80b0e2fb-42b2-4fa6-ba10-8fdcf583e161');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (36, 'a5e6d2b0-9fe3-4c7d-ba2b-d83ff964b74c');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (37, '4035350a-09e7-4c12-8e6e-ab438663f443');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (38, '152fe28f-eb38-4ed3-8c3c-a8622329a6bd');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (39, 'eb56ee87-aabd-40c1-af5e-b90d739bd770');

INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (40, '7fe63711-ff66-4be9-91f1-a226a9f8932c');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (41, 'ca337f08-ad67-4e3f-8f8d-470b77413653');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (42, 'acc3fec5-5faa-4c00-bbf5-6a8953bb2e6e');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (43, '62b183cc-c12d-4e30-bb94-046230dbac1e');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (44, '3a25da68-592a-4da1-b598-07574f1fdf65');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (45, '77167d57-c19b-4415-8456-c17d2a391567');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (46, '46b5c6d7-e8f9-4a0b-1c2d-3e4f5g6h7i8j');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (47, '57c6d7e8-f9g0-4b1c-2d3e-4f5g6h7i8j9k');
INSERT INTO DeviceElement_Image(deviceElementId, imageId) VALUES (48, '68d7e8f9-g0h1-4c2d-3e4f-5g6h7i8j9k0l');

