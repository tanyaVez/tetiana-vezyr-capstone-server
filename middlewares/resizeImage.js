import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const { filename } = req.file;

  const filePath = path.join("public/images", filename);

  if (!fs.existsSync(filePath)) {
    return next(new Error(`Input file is missing: ${filePath}`));
  }
  
  sharp(filePath)
    .resize(400, 400, { fit: 'cover' }) 
    .toBuffer((err, buffer) => {
      if (err) {
        return next(err);
      }
      
      fs.writeFile(filePath, buffer, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }
        next();
      });
    });
};

export default resizeImage;
