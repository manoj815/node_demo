let mysql = require('mysql');
let config = require('./config.js');
//let connection = mysql.createConnection(config);
let connection = mysql.createPool(config);

function createAndInsert() {
    //create todos tables

    let todosTbl = `CREATE TABLE IF NOT EXISTS todos (
                id int(11) primary key auto_increment,
                title varchar(255) NOT NULL,
                completed tinyint(1) NOT NULL default 0

)`;

    //execute Query
    connection.query(todosTbl, function (err) {
        if (err) {
            return console.log('asdfg' + err.message);
        }
        console.log(`table created successfully`);
    });

    let tblData = `INSERT INTO todos(title,completed) values(
                'antlabs IG4 gateway',1
)`;

    connection.query(tblData, function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`data inserted successfully`);
    });

    //insert another records
    let stmt = `INSERT INTO todos(title,completed) values(?,?)`;
    let todo = ['adding one more task', false];
    connection.query(stmt, todo, function (err, result, fields) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`inserted id is ${result.insertId}`)
    });

    let insertQry = `INSERT into ?? (??,??) values(?,?)`;
    let values = [`todos`, [`task1`, false],
        [`task2`, false]
    ];
    let query = mysql.format(insertQry, values);
    /*connection.query(query, (err,results,fields) => {
        if(err){
            return console.log(err.message);
        }
        console.log(`inserted id ${results.insertId}`);
    })*/
    //connection.end();
}

setTimeout(() => {
    createAndInsert()
},5000);