const express = require("express");
const mysql = require("mysql");

const app = express();

const connectionConfig = {
    host: "mysql",
    user: "root",
    password: "newpass",
    database: "node",
};

let $allpeople = [];

const connection = mysql.createConnection(connectionConfig);

connection.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

(() => {
    try {
        const peopleTable =
            "CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id))";

        connection.query(peopleTable, (error) => {
            if (error) throw error;

            const newPerson =
                'INSERT INTO people (name) VALUES ("Jefferson Mendes"),("Petter Silva"),("Patrick Pimenta")';

            connection.query(newPerson, error, (error) => {
                if (error) throw error;
            });
        });
    } catch (error) {
        console.log(error);
    }
})();

app.get("/", (req, res) => {
    connection.query('select * from people order by name asc', (error, results, fields) => {
        if(results){
            res.send(
                `<h1>Full Cycle Rocks!</h1>
                <ul>
                    ${
                        results.map((r) => `<li>${r.name}</li>`).join("")
                    }
                </ul>`
            );
        } else{
            res.send(`<h1>Full Cycle Rocks!</h1>`);  
        }
        
    });
    connection.end()   
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App running at: " + port);
});