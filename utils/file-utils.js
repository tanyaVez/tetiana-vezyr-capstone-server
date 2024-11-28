import path from 'path';
import fs from 'fs';

export const deleteFileIfExists = (filePath) => {
  try {
    if (!filePath) {
      return;
    }

    const fullPath = path.join(process.cwd(), filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Successfully deleted file: ${fullPath}`);
    } else {
      console.log(`File not found: ${fullPath}`);
    }
  } catch (err) {
    console.error(`Error deleting file: ${filePath}`, err);
  }
};
