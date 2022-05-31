
const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding:'utf8'});  //second argument is optional
const writeStream = fs.createWriteStream('./docs/blog4.txt');
// readStream.on('data',(chunk)=>{
//     console.log('-------New Chunk--------');
//     console.log(chunk.toString());
//     writeStream.write('\nNew Chunk\n');
//     writeStream.write(chunk);
// })   //listening to data event (event listener)

//piping
readStream.pipe(writeStream);