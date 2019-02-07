#!/usr/bin/env node
const program = require("commander");
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
}

function outputFile(pathFile) {
    let currentFile = `${__dirname}/${pathFile}`;
    handleFile(currentFile);
    const reader = fs.createReadStream(currentFile);
    reader.pipe(process.stdout);
}

function convertFromFile(pathFile) {
    console.log('convertFromFile')
    let currentFile = `${__dirname}/${pathFile}`;
    const reader = fs.createReadStream(currentFile);
    reader.pipe(getJsonFromCSV)
    .pipe(process.stdout);
}
function convertToFile(pathFile) {
    console.log('convertToFile')
    let currentFile = `${__dirname}/${pathFile}`;
    let destinationFile = `${__dirname}/output.json`;
    const reader = fs.createReadStream(currentFile);
    reader.pipe(getJsonFromCSV)
    .pipe(fs.createWriteStream(destinationFile));
}
const getJsonFromCSV = new Transform({
    transform(chunk, encoding, callback) {
        this.push(CSV2JSON(chunk.toString()));
        callback();
    }
});

function handleFile(file) {
    if (fs.existsSync(file) === false) {
        fs.writeFile(file, '', (err) => {
            if (err) throw err;
            console.log('The file has been saved');
        })
    }
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
                if (req.file === undefined || req.file === true) {
                    console.log("For this operation you need to pass file name")
                } else {
                    outputFile(req.file);
                }
                break;
            case 'convertFromFile':
                if (req.file === undefined || req.file === true) {
                    console.log("For this operation you need to pass file name")
                } else {
                    convertFromFile(req.file);
                }
                break;
            case 'convertToFile':
                if (req.file === undefined || req.file === true) {
                    console.log("For this operation you need to pass file name")
                } else {
                    convertToFile(req.file)
                }
                break;
            default:
                program.outputHelp();
                throw new Error("Matches didn't found");
        } 
    });

program
    .option('-f, --file [optional]', 'File name' )
program
    .parse(process.argv);
