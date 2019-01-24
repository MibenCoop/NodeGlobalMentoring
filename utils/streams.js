const program = require("commander");
const through = require('through2');
const fs = require('fs');
const CSV2JSON = require ("../handlers/utils");
const { Transform } = require('stream');
// const stream = through(write, end);
'use strict'
 
// // Main actions to be called
function reverse() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if ( chunk !== null ) {
            let res = [...chunk].reverse().join('');
            process.stdout.write(`data: ${res}`);
        }
    })
    process.stdin.on('end', () => {
        process.stdout.write('end');
    })

}
function transform() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if ( chunk !== null ) {
            let res = chunk.toUpperCase();
            process.stdout.write(`data: ${res}`);
        }
    })
    process.stdin.on('end', () => {
        process.stdout.write('end');
    })
}
function handleFile(file) {
    if (fs.existsSync(file) === false) {
        fs.writeFile(file, '', (err) => {
            if (err) throw err;
            console.log('The file has been saved');
        })
    }
}
function outputFile(pathFile) {
    let currentFile = `${__dirname}/${pathFile}`;
    handleFile(currentFile);
    const reader = fs.createReadStream(currentFile);
    reader.pipe(process.stdout);
}

const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
      this.push(CSV2JSON(chunk.toString()));
      callback();
    }
});
function convertFromFile(pathFile) {
    console.log('convertFromFile')
    let currentFile = `${__dirname}/${pathFile}`;
    const reader = fs.createReadStream(currentFile);
    reader.pipe(upperCaseTr)
          .pipe(process.stdout);
}
function convertToFile(pathFile) {
    console.log('convertToFile')
    let currentFile = `${__dirname}/${pathFile}`;
    let destinationFile = `${__dirname}/output.json`;
    const reader = fs.createReadStream(currentFile);
    reader.pipe(upperCaseTr)
          .pipe(fs.createWriteStream(destinationFile));
}

 
/* * * **** CODE WHICH IMPLEMENTS COMMAND LINE INTERACTION **** * */
program
    .option('-a, --action <required>', 'Pass action type' )
    .action(function(req) {
        switch(req.action) {
            case 'reverse':
                reverse(); 
                break;
            case 'transform':
                transform();
                break;
            case 'outputFile': 
                console.log('req.file', req.file);
                outputFile(req.file);
                break;
            case 'convertFromFile':
                convertFromFile(req.file);
                break;
            case 'convertToFile':
                convertToFile(req.file)
                break;
            default:
                console.log("Sorry, we haven't found matches")
        } 
    });
 
program
    .option('-f, --file [optional]', 'File name' )
    .action(() => {
        console.log('file');
    });

program
    .parse(process.argv);

// console.log('!!', program);