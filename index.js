const fs = require('fs-extra')
const moment = require('moment');

const APPLICANT_TYPE_ID = 15

fs.readFile('OES Request_staffid.csv', function (err, data) {
    if (err) {
        console.log(err.stack);
        return;
    }

    ConvertToTable(data)
});

function ConvertToTable(data) {
    console.log("started to import");

    const filename = 'RP_StaffID_Import_' + moment().format('YYYYMMDDHHmmss')+'.sql'
    fs.ensureFileSync(filename)
    fs.appendFileSync(filename, "INSERT INTO rp_member_identity ( identity_code, applicant_type_id, created_at) VALUES\r\n")

    data = data.toString();
    var rows = new Array();
    rows = data.split("\r\n");
    var row = new Array();
    
    //INSERT INTO rp_member_identity ( identity_code, applicant_type_id, created_at) VALUES
    //('RP0001546', 16, NOW());
    for (var i = 0; i < rows.length; i++) {      
        row = rows[i].split(",")
        if (row.length >= 1 && row[0].trim() !== '') {
            console.log(row[0].trim())
            fs.ensureFileSync(filename)
            if ( i === rows.length - 1 ) {
                fs.appendFileSync(filename, "('"+row[0].trim()+"', "+APPLICANT_TYPE_ID+", NOW())\r\n")
            }
            else{
                fs.appendFileSync(filename, "('"+row[0].trim()+"', "+APPLICANT_TYPE_ID+", NOW()),\r\n")                
            }         
        }
    }

    fs.ensureFileSync(filename)
    fs.appendFileSync(filename, ";\r\n")

    console.log("ended to import");
}