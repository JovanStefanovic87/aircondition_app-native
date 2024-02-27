-- update_v3.sql

CREATE TABLE IF NOT EXISTS Inspection_Image (
  id TEXT PRIMARY KEY,
  inspectionId TEXT,
  imageId TEXT,
  FOREIGN KEY (inspectionId) REFERENCES Inspection(id),
  FOREIGN KEY (imageId) REFERENCES ImageStorage(id)
);




