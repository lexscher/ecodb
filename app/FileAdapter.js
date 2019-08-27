//  Require fs to create files
const fs = require('fs');

// Create and export our file adapter class
module.exports = class FileAdapter {
  // Check all the files in our json folder
  static getFileCountInFolder = folderPath => {
    // initial file count
    let fileCount = 0;
    // read the number of files in the folder
    fs.readdir(folderPath, (err, files) => {
      // handle errors
      if (err) return console.error(err.stack);
      // count the number of files in the folder
      fileCount = files.length;
    });
    // return the file count
    return fileCount;
  };

  // Create a new file within a folder with the JSON data
  static createNewFileInFolder = (newFilePath, jsonObject) => {
    // weite the file
    fs.writeFile(newFilePath, jsonObject, error => {
      // If there's an error
      error
        ? // Tell the user
          console.error("Sorry, we couldn't write the file", error.stack)
        : // Let the user know it was written successfully
          console.log(`Data written in file ${newFilePath}`);
    });
  };
  
};
