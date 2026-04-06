-- update_v6.sql

ALTER TABLE ImageStorage ADD COLUMN isDeleted INTEGER DEFAULT 0;
ALTER TABLE ImageStorage ADD COLUMN isDeletedS3 INTEGER DEFAULT 0;

-- Change airVolume from NUMERIC to TEXT
ALTER TABLE Inspection ADD COLUMN airVolume_new TEXT;
UPDATE Inspection SET airVolume_new = CAST(airVolume AS TEXT);
ALTER TABLE Inspection DROP COLUMN airVolume;
ALTER TABLE Inspection ADD COLUMN airVolume TEXT;
UPDATE Inspection SET airVolume = airVolume_new;
ALTER TABLE Inspection DROP COLUMN airVolume_new;

-- Change constructionYear from INTEGER to TEXT
ALTER TABLE Inspection ADD COLUMN constructionYear_new TEXT;
UPDATE Inspection SET constructionYear_new = CAST(constructionYear AS TEXT);
ALTER TABLE Inspection DROP COLUMN constructionYear;
ALTER TABLE Inspection ADD COLUMN constructionYear TEXT;
UPDATE Inspection SET constructionYear = constructionYear_new;
ALTER TABLE Inspection DROP COLUMN constructionYear_new;

-- Change lastMaintenance from DATE to TEXT
ALTER TABLE Inspection ADD COLUMN lastMaintenance_new TEXT;
UPDATE Inspection SET lastMaintenance_new = CAST(lastMaintenance AS TEXT);
ALTER TABLE Inspection DROP COLUMN lastMaintenance;
ALTER TABLE Inspection ADD COLUMN lastMaintenance TEXT;
UPDATE Inspection SET lastMaintenance = lastMaintenance_new;
ALTER TABLE Inspection DROP COLUMN lastMaintenance_new;
