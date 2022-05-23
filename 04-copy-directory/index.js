const fs = require('fs');
const path = require('path');
const copiedPath = path.join(__dirname, 'files-copy');
const filesPath= path.join(__dirname,'files');

fs.access(copiedPath, fs.constants.F_OK, (error) => {
  if (error) {
    fs.mkdir(copiedPath, { recursive: true }, err => {
      if (err) throw err;
    })
  }
})
async function DelDir() {
  await fs.promises.rm(copiedPath, { force: true, recursive: true });
  await fs.promises.mkdir(copiedPath, { recursive: true });
}


function copyDir(filesPath, copiedPath) {
  fs.readdir(filesPath, { withFileTypes: true }, (err,files)=> {
    if (err) {
      throw err;
    }
    else {
      files.forEach(file=> {
        if (file.isFile()) {
          fs.copyFile(path.join(filesPath, file.name), path.join(copiedPath, file.name), err => {
            if (err) throw err;
          }); 
        }
        else if (file.isDirectory()) {
          fs.mkdir(copiedPath+'\\'+file.name,{recursive:true}, err => {
            if (err) throw err;
          });
          copyDir(path.join(filesPath, file.name),path.join(copiedPath, file.name));
        }
      });
    } 
  });
}
(async function () {
  await DelDir();
  copyDir(filesPath, copiedPath);
})();