-- update_v4.sql





INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (12, 'Schmutz', 1, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (13, 'Korrosion', 1, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (14, 'Blätter', 1, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (15, 'Beschädigung', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (16, 'Nicht einsehbar', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (17, 'Schutzgitter nicht vorhanden', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (18, 'Abstand AL-Öffnung zu Aufbau nicht ausreichend', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (19, 'Abstand AL-Öffnung zu Boden nicht ausreichend', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (20, 'Abstand AL-Öffnung zu FL-AL nicht ausreichend', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (21, 'Schraubenspitzen ragen in Kanal/Gehäuse', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (22, 'Beschädigungen', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (23, 'Klebeetiketten', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (24, 'Mechanische Schäden', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (25, 'Lamellen beschädigt', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (26, 'Lamellen nicht herausziehbar', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (27, 'Siphon Wasservorlage nicht prüfbar', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (28, 'Siphon fehlt', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (29, 'Kondensatablauf direkt am Abwassernetz', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (30, 'Filtertaschen liegen auf', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (31, 'Filtertaschen stossen an', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (32, 'Filterrahmen falsch montiert', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (33, 'Falsche Filterklasse (da einstufig)', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (34, 'Filter fehlt', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (35, 'Filter defekt', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (36, 'Filter durchfeuchtet', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (37, 'Filterstandzeit überschritten', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (38, 'Mischbestückung', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (39, 'Falsche Filterklasse', 2, 2);
INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (40, 'Falsche Filterklasse da nur eine Filterstufe', 2, 2);


-- ä => Ä
-- ö => Ö
-- ü => Ü
-- ß => SS


--Außenluftansaugung [1]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (12, 12, 3, 1, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (13, 13, 3, 1, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (14, 14, 3, 1, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (15, 15, 3, 1, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (16, 16, 3, 1, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (17, 17, 3, 1, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (18, 18, 3, 1, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (19, 19, 3, 1, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (20, 20, 3, 1, 9, true);

--Außenluftkanal [2]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (21, 12, 3, 2, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (22, 13, 3, 2, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (23, 16, 3, 2, 3, true);

--Schalldämpfer [3]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (24, 12, 5, 3, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (25, 13, 5, 3, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (26, 15, 5, 3, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (27, 16, 5, 3, 4, true);

--Zuluftkanal in Technikzentrale [4]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (28, 12, 3, 4, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (29, 13, 3, 4, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (30, 22, 3, 4, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (31, 21, 3, 4, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (32, 23, 3, 4, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (33, 16, 3, 4, 6, true);

--Zuluftkanal [5]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (34, 12, 3, 5, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (35, 13, 3, 5, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (36, 22, 3, 5, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (37, 21, 3, 5, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (38, 23, 3, 5, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (39, 16, 3, 5, 6, true);

--Luftauslass [6]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (40, 12, 3, 6, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (41, 13, 3, 6, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (42, 22, 3, 6, 3, true);

--Umluftansaugung [7]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (43, 12, 3, 7, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (44, 13, 3, 7, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (45, 15, 3, 7, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (46, 16, 3, 7, 3, true);

--Edverlegter Kanal [8]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (47, 12, 3, 8, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (48, 13, 3, 8, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (49, 22, 3, 8, 3, true);

--Jalousieklappe [9]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (50, 12, 6, 9, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (51, 13, 6, 9, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (52, 12, 7, 9, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (53, 13, 7, 9, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (54, 24, 6, 9, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (55, 24, 7, 9, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (56, 16, 7, 9, 6, true);

--Mischluftklappe [10]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (57, 12, 3, 10, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (58, 13, 3, 10, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (59, 24, 3, 10, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (60, 16, 3, 10, 4, true);

--Bypass [11]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (61, 12, 6, 11, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (62, 13, 6, 11, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (63, 24, 6, 11, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (64, 16, 6, 11, 4, true);

--Kreislaufverbudsystem [12]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (65, 12, 3, 12, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (66, 13, 3, 12, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (67, 25, 3, 12, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (68, 26, 3, 12, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (69, 16, 3, 12, 5, true);

--Rotationswärmetauscher [13]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (70, 12, 3, 13, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (71, 13, 3, 13, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (72, 15, 3, 13, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (73, 16, 3, 13, 4, true);


--Kreuzwermetauscher [14]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (74, 12, 3, 14, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (75, 13, 3, 14, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (76, 12, 8, 14, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (77, 13, 8, 14, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (78, 15, 3, 14, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (79, 16, 3, 14, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (80, 27, 8, 14, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (81, 28, 8, 14, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (82, 29, 8, 14, 9, true);

--Filter M5 [15]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (83, 12, 9, 15, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (84, 13, 9, 15, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (85, 12, 10, 15, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (86, 16, 9, 15, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (87, 30, 10, 15, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (88, 31, 10, 15, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (89, 32, 10, 15, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (90, 33, 10, 15, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (91, 34, 10, 15, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (92, 35, 10, 15, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (93, 36, 10, 15, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (94, 37, 10, 15, 12, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (95, 38, 10, 15, 13, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (96, 39, 10, 15, 14, true);

--Filter F7 [16]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (97, 12, 9, 16, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (98, 13, 9, 16, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (99, 12, 10, 16, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (100, 16, 9, 16, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (101, 30, 10, 16, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (102, 31, 10, 16, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (103, 32, 10, 16, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (104, 34, 10, 16, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (105, 35, 10, 16, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (106, 36, 10, 16, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (107, 37, 10, 16, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (108, 38, 10, 16, 12, true);

--Filter <= G4 [17]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (109, 12, 9, 17, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (110, 13, 9, 17, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (111, 16, 9, 17, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (112, 40, 10, 17, 4, true);

--Filter F9 [18]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (113, 12, 9, 18, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (114, 13, 9, 18, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (115, 12, 10, 18, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (116, 16, 9, 18, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (117, 30, 10, 18, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (118, 31, 10, 18, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (119, 32, 10, 18, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (120, 34, 10, 18, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (121, 35, 10, 18, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (122, 36, 10, 18, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (123, 37, 10, 18, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (124, 38, 10, 18, 12, true);

--Filter ePM1 >= 50% [19]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (125, 12, 9, 19, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (126, 13, 9, 19, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (127, 12, 10, 19, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (128, 16, 9, 19, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (129, 30, 10, 19, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (130, 31, 10, 19, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (131, 32, 10, 19, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (132, 34, 10, 19, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (133, 35, 10, 19, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (134, 36, 10, 19, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (135, 37, 10, 19, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (136, 38, 10, 19, 12, true);

--Filter ePM2,5 >= 50% [20]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (137, 12, 9, 20, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (138, 13, 9, 20, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (139, 12, 10, 20, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (140, 16, 9, 20, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (141, 30, 10, 20, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (142, 31, 10, 20, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (143, 32, 10, 20, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (144, 34, 10, 20, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (145, 35, 10, 20, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (146, 36, 10, 20, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (147, 37, 10, 20, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (148, 38, 10, 20, 12, true);

--Filter H13 [21]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (149, 12, 9, 21, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (150, 13, 9, 21, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (151, 12, 10, 21, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (152, 16, 9, 21, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (153, 30, 10, 21, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (154, 31, 10, 21, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (155, 32, 10, 21, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (156, 34, 10, 21, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (157, 35, 10, 21, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (158, 36, 10, 21, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (159, 37, 10, 21, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (160, 38, 10, 21, 12, true);

--Filter ePM10 > 50% [22]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (161, 12, 9, 22, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (162, 13, 9, 22, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (163, 12, 10, 22, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (164, 16, 9, 22, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (165, 30, 10, 22, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (166, 31, 10, 22, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (167, 32, 10, 22, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (168, 34, 10, 22, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (169, 35, 10, 22, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (170, 36, 10, 22, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (171, 37, 10, 22, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (172, 38, 10, 22, 12, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (173, 39, 10, 22, 13, true);

--Filter ePM1 > 80% [23]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (174, 12, 9, 23, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (175, 13, 9, 23, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (176, 12, 10, 23, 3, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (177, 16, 9, 23, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (178, 30, 10, 23, 5, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (179, 31, 10, 23, 6, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (180, 32, 10, 23, 7, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (181, 34, 10, 23, 8, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (182, 35, 10, 23, 9, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (183, 36, 10, 23, 10, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (184, 37, 10, 23, 11, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (185, 38, 10, 23, 12, true);

--Filer Coarse [24]
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (186, 12, 9, 24, 1, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (187, 13, 9, 24, 2, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (188, 16, 9, 24, 4, true);
INSERT INTO Component_Element_Title (id, deviceStateComponentId, titleComponentId, deviceElementId, displayOrder, isUsingNote) VALUES (189, 40, 10, 24, 5, true);

-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (12, 'Schmutz', 1, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (13, 'Korrosion', 1, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (14, 'Blätter', 1, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (15, 'Beschädigung', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (16, 'Nicht einsehbar', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (17, 'Schutzgitter nicht vorhanden', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (18, 'Abstand AL-Öffnung zu Aufbau nicht ausreichend', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (19, 'Abstand AL-Öffnung zu Boden nicht ausreichend', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (20, 'Abstand AL-Öffnung zu FL-AL nicht ausreichend', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (21, 'Schraubenspitzen ragen in Kanal/Gehäuse', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (22, 'Beschädigungen', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (23, 'Klebeetiketten', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (24, 'Mechanische Schäden', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (25, 'Lamellen beschädigt', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (26, 'Lamellen nicht herausziehbar', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (27, 'Siphon Wasservorlage nicht prüfbar', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (28, 'Siphon fehlt', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (29, 'Kondensatablauf direkt am Abwassernetz', 2, 2)

-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (30, 'Filtertaschen liegen auf', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (31, 'Filtertaschen stossen an', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (32, 'Filterrahmen falsch montiert', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (33, 'Falsche Filterklasse (da einstufig)', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (34, 'Filter fehlt', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (35, 'Filter defekt', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (36, 'Filter durchfeuchtet', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (37, 'Filterstandzeit überschritten', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (38, 'Mischbestückung', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (39, 'Falsche Filterklasse', 2, 2)
-- INSERT INTO DeviceStateComponent (id, name, groupTypeId, stateTypeId) VALUES (40, 'Falsche Filterklasse da nur eine Filterstufe', 2, 2)

-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (1, 'ANLAGE', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (2, 'ANLAGE', false)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (3, 'GESAMT', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (4, 'AUSSEN', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (5, 'DÄMPFELEMENT', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (6, 'LAMELLEN', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (7, 'RAHMEN, GESAMT', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (8, 'KONDENSATWANNE', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (9, 'GEHÄUSE', true)
-- INSERT INTO TitleComponent (id, name, isUsingImage) VALUES (10, 'FILTER', true)

-- INSERT INTO GroupType (name) VALUES ('PHYSIKALISCH')
-- INSERT INTO GroupType (name) VALUES ('KONSTRUKTIV')
-- INSERT INTO GroupType (name) VALUES ('MIKROBIOLOGISCH')
-- INSERT INTO GroupType (name) VALUES ('LUFTKEIMZAHLMESSUNG')
-- INSERT INTO StateType (id, name) VALUES (1, 'State of whole device')
-- INSERT INTO StateType (id, name) VALUES (2, 'State of device element')

--Außenluftansaugung [1]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (12, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (12, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (13, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (13, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (14, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (14, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (15, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (15, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (15, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (15, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (16, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (16, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (17, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (17, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (18, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (18, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (19, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (19, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (20, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (20, 2);

--Außenluftkanal [2]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (21, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (21, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (21, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (22, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (22, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (22, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (23, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (23, 3);

--Schalldämpfer [3]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (24, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (24, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (24, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (25, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (25, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (25, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (26, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (26, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (26, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (27, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (27, 3);

--Zuluftkanal in Technikzentrale [4]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (28, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (28, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (28, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (29, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (29, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (29, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (30, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (30, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (31, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (31, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (32, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (32, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (33, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (33, 3);

--Zuluftkanal [5]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (34, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (34, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (34, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (35, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (35, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (35, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (36, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (36, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (37, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (37, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (38, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (38, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (39, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (39, 3);

--Luftauslass [6]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (40, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (40, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (40, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (41, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (41, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (41, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (42, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (42, 2);

--Umluftansaugung [7]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (43, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (43, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (44, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (44, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (45, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (45, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (45, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (46, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (46, 3);

--Edverlegter Kanal [8]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (47, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (47, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (47, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (48, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (48, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (48, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (49, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (49, 2);

--Jalousieklappe [9]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (50, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (50, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (50, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (51, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (51, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (51, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (52, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (52, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (52, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (53, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (53, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (53, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (54, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (54, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (54, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (55, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (55, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (55, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (56, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (56, 3);

--Mischluftklappe [10]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (54, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (54, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (54, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (55, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (55, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (55, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (56, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (56, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (56, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (57, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (57, 3);

--Bypass [11]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (61, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (61, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (61, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (62, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (62, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (62, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (63, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (63, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (63, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (64, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (64, 3);


--Kreislaufverbudsystem [12]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (65, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (65, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (65, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (66, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (66, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (66, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (67, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (67, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (68, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (69, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (69, 3);

--Rotationswärmetauscher [13]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (69, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (69, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (69, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (70, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (70, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (70, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (71, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (71, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (71, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (72, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (72, 3);

--Kreuzwermetauscher [14]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (73, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (73, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (73, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (74, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (74, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (74, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (75, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (75, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (75, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (76, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (76, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (76, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (77, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (77, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (77, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (78, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (78, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (79, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (79, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (80, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (80, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (81, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (81, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (82, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (82, 2);

--Filter M5 [15]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (83, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (83, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (83, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (84, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (84, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (84, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (85, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (85, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (85, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (86, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (86, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (87, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (87, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (88, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (88, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (89, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (89, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (90, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (90, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (91, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (91, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (92, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (92, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (93, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (93, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (94, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (94, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (95, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (95, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (96, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (96, 3);

--Filter F7 [16]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (97, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (97, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (97, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (98, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (98, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (98, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (99, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (99, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (99, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (100, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (100, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (101, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (101, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (102, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (102, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (103, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (103, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (104, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (104, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (105, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (105, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (106, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (106, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (107, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (107, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (108, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (108, 2);

--Filter <= G4 [17]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (109, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (109, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (109, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (110, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (110, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (110, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (111, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (111, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (112, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (112, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (112, 4);

--Filter F9 [18]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (113, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (113, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (113, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (114, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (114, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (114, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (115, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (115, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (115, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (116, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (116, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (117, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (117, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (118, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (118, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (119, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (119, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (120, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (120, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (121, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (121, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (122, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (122, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (123, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (123, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (124, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (124, 2);

--Filter ePM1 >= 50% [19]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (125, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (125, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (125, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (126, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (126, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (126, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (127, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (127, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (127, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (128, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (128, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (129, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (129, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (130, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (130, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (131, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (131, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (132, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (132, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (133, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (133, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (134, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (134, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (135, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (135, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (136, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (136, 2);

--Filter ePM2,5 >= 50% [20]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (137, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (137, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (137, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (138, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (138, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (138, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (139, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (139, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (139, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (140, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (140, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (141, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (141, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (142, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (142, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (143, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (143, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (144, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (144, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (145, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (145, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (146, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (146, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (147, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (147, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (148, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (148, 2);

--Filter H13 [21]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (149, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (149, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (149, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (150, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (150, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (150, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (151, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (151, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (151, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (152, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (152, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (153, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (153, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (153, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (154, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (154, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (155, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (155, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (156, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (156, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (157, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (157, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (158, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (158, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (159, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (159, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (160, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (160, 2);

--Filter ePM10 > 50% [22]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (161, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (161, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (161, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (162, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (162, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (162, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (163, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (163, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (163, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (164, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (164, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (165, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (165, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (166, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (166, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (167, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (167, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (168, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (168, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (169, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (169, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (170, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (170, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (171, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (171, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (172, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (172, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (173, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (173, 3);

--Filter ePM1 > 80% [23]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (174, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (174, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (174, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (175, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (175, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (175, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (176, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (176, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (176, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (177, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (177, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (178, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (178, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (179, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (179, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (180, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (180, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (181, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (181, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (182, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (182, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (183, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (183, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (184, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (184, 2);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (185, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (185, 2);

--Filer Coarse [24]
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (186, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (186, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (186, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (187, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (187, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (187, 4);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (188, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (188, 3);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (189, 1);
INSERT INTO Device_StateValue (componentElementTitleId, stateValueId) VALUES (189, 4);
