
const express = require("express");
const app = express();
app.use(express.static('fixture'))

const fs = require('fs');
const path = require('path');

let FOLDER_NAME = 'fixtures'
let directoryPath = path.join(__dirname, FOLDER_NAME);
async function processFileData() {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log('Unable to scan directory: ' + err)
        }
        let filesContentArray = [];
        files.forEach(async function (fileName) {

            let ext = path.extname(fileName);
            if (ext.toLowerCase() === '.txt') {
                let filedir = path.join(directoryPath, fileName);

                let fileContents = fs.readFileSync(filedir, 'utf8');

                var arrayofFixtures = fileContents.toString().split("\n");

                let i = 0;
                for (let row of arrayofFixtures) {
                    if (i > 0) {
                        if (fileName == 'people_by_dollar.txt') {
                            //  console.log(row.toString())
                            let valueSplit = row.toString().split(' $ ');
                            if (valueSplit[1] != undefined) {
                                filesContentArray.push({
                                    first_name: valueSplit[3],
                                    city: valueSplit[0],
                                    birthdate: dateStringDollar(valueSplit[1]),
                                });
                            }
                        } else {
                            let valueSplit = row.toString().split(' % ');
                            filesContentArray.push({
                                first_name: valueSplit[0],
                                city: valueSplit[1],
                                birthdate: dateStringPercent(valueSplit[2]),
                            });
                        }

                    }
                    i++
                }

            }

        });
        filesContentArray = filesContentArray.filter(p => p.first_name !== '' && p.first_name !== undefined);
        filesContentArray.sort((a, b) => a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1);
        let finalArray = [];
        for (let data of filesContentArray) {
            if (data.city == 'LA') {
                data.city = 'Los Angeles'
            }
            if (data.city == 'NYC') {
                data.city = 'New York City'
            }
            let stringValue = data.first_name + ',' + data.city + ',' + data.birthdate;
            finalArray.push(stringValue);
        }
        console.log(finalArray)
    })

}

function dateStringDollar(date) {
    //  if(date == undefined)return;
    let dateValue = '';
    dateValue = date;
    dateValue = dateValue.split('-');
    return dateValue[1] + '/' + dateValue[0] + '/' + dateValue[2];
}
function dateStringPercent(date) {
    let dateValue = new Date(date);
    //console.log(dateValue)
    let month = dateValue.getMonth() + 1;
    let day = dateValue.getDate();
    let year = dateValue.getFullYear();
    return month + '/' + day + '/' + year;
}


processFileData();
exports.processFileData = processFileData;