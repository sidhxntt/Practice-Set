import fs from 'fs';

function getFileContent() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile('CPU_data(async).json', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }, 3000);
  });
}

async function  processData() {
  try {
    const data= await getFileContent();
    const cpuInfo = JSON.parse(data);
    console.log(cpuInfo)
  } catch (error) {
    console.log(error)
  }
}
processData();