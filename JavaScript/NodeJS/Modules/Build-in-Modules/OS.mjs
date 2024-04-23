import os from 'os';

console.log(os.arch());
console.log(os.hostname());
console.log(os.freemem());
console.log(os.homedir());
console.log(os.machine());
console.log(os.version());

const JSON_DATA_1 = JSON.stringify(os.cpus());
const JSON_DATA_2 = JSON.stringify(os.networkInterfaces());
export { JSON_DATA_1, JSON_DATA_2 };
