/**
 * Author: Amnah Asad 040910916
 * Date: January 29, 2021
 * Description: This program will print the first 5 row records from the file covid19-download.csv 
 * for the specific columns: pruid, prname, prnameFR, date, numconf, numprob, numdeaths, numtotal, numtoday, ratetotal.
 * The records will then be stored in a records array. 
 */



 /**
  * This is the csv-parser being exported to this class. This is needed to parse the csv file into my 
  * node.js program. I installed it using my terminal by using the command npm i -s csv-parser.
  */
const csv = require('csv-parser');
/**
 * This is the fs file system api library. Fs is being added(exported) as 'required' by this program 
 * inorder to use fs to read in the csv file.
 */
const fs = require('fs');



/**
 * This is the record array object that uses the column names from the dataset.
 */
var databaseResults = [];

/**
 * This record array will store the record objects. 
 */
var records = [];

/**
 * This variable count is the counter for the amount of record rows to be printed out from the csv file.
 */
var count = 0;


console.log('Program by Amnah Asad'); //This is the begining of the program. This is my name, it will be printed at the begining of the program everytime the programs runs.

openFile(); //The openFile function is being calles.

/**
 * This function calls the openFile function and will load the row records from the table. 
 * In this function, there is a for loop to print out the specific columns initialised. 
 * When the row count increments and reaches 5, then the for loop will stop printing out more rows from 
 * the table, since I only need to print out a few rows records for the purpose of this program. 
 * The toString function is then called, which will print out the data for the specified columns. 
 * These records are then pushed and stored into the records array.
 * @param {*} databaseResults This array is the record object that uses the column names as a dataset.
 */
function loadList(databaseResults) {
    openFile();
    for(var key in databaseResults) {
        row = databaseResults[key];
        if(count == 5) {
            break;
        }
        const pruid = row.pruid;
        const prname = row.prname;
        const prnameFR = row.prnameFR;
        const date = row.date;
        const numconf = row.numconf;
        const numprob = row.numprob;
        const numdeaths = row.numdeaths;
        const numtotal = row.numtotal;
        const numtoday = row.numtoday;
        const ratetotal = row.ratetotal;
        count++;

        toString(pruid, prname, prnameFR, date, numconf, numprob, numdeaths, numtotal, numtoday, ratetotal);
    
        records.push(row);
    }
}


/**
 * This function creates a reading stream for the data inside the csv file. 
 * This function also makes sure that the csv file name is valid, if the csv file doesn't 
 * not exist or has a spelling error in it, it sends an error message to the user letting 
 * them know. This function then calls the pipe function to be able to read and write to the csv file.
 * The data results then get pushed and close at the very end after getting read. At the end of this 
 * function, it continues the program by calling the last three functions of the program.
 */
function openFile() {

    var dataFile = fs.createReadStream('covid19-download.csv')
        .on('error', () => {
            console.log('Error! The file is missing or not available.');
        })
        .pipe(csv({}))
        .on('data', (data) => databaseResults.push(data))
        .on('end', () => {
            loadList(databaseResults); 
            console.log('This is the end of the data records.'); 
            closeFile();
        });
}

/**
 * This function takes in the database columns and prints the specific data 
 * records for the specific columns from the databaseResults.
 * @param  {...any} databaseResults This function takes in all the items from the 
 *                                  array databaseResults to be printed out in the console.
 */
function toString(...databaseResults) {
    console.log(databaseResults.toString());
}

/**
 * This function exits the program and uses a try catch to catch any errors that can 
 * occur while trying to close the program and shows an error message if an error is to occur..
 */
function closeFile() {
    try {
        process.exit(); 
    } catch(err) {
        console.error('The file failed to close', err); 
    } 
}