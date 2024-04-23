import { readFileSync } from 'fs';

const data = readFileSync('CPU_data.json');
const cpuData = JSON.parse(data);
const filteredTimes = [];
for (let i = 0; i < cpuData.length; i++) {
  filteredTimes.push(cpuData[i].times);
}

console.log(filteredTimes);
