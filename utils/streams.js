let program = require("commander");
 
 
// // Main actions to be called
// function​​​ reverse​​(str) { ​/* ... */​ }
// function ​​​transform​​(str) { ​/* ... */​ }
// function​ ​​outputFile​​(filePath) { ​/* ... */​ }
// function​​ ​convertFromFile​​(filePath) { ​/* ... */​ }
// function​​​ convertToFile​​(filePath) { ​/* ... */​ }
 
 
/* * * **** CODE WHICH IMPLEMENTS COMMAND LINE INTERACTION **** * */
program
    .option('-a, --action <required>', 'Pass action type' )
    .action(() => console.log('action', program.action));
 
program
    .option('-f, --file [optional]', 'File name' )
    .action(() => {
        console.log('file', program.file);
        program.outputHelp();
    });
program
    .option('-h, --help', 'Help' )
    .action(() => console.log('file', program.file));
program
    .version("0.1.0")
    // .option('-a, --action <required>', 'Pass action type' )
    // .option('-f, --file [optional]', '' )
    .parse(process.argv);
// program
//  .action('program.file', program.file);
console.log("proccess args", 'after');