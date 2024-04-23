import path from 'path';

const Path = '/Users/siddhantgupta/Desktop/SID/Practice/JavaScript/NodeJS/Modules/JSON as modules/index.json';
const filename = path.basename(Path); // Output: index.json
console.log(filename);
console.log(path.dirname(Path) + '\n');
console.log(path.extname(filename) + '\n');
console.log(path.parse(Path)); //Path as Object
console.log(path.format(path.parse(Path))); //Return the formatted string (Reverse of Parse)
console.log(path.resolve(Path)); //Return the formatted string (Reverse of Parse)(absolute url)
