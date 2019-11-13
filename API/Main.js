const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
var jwt = require('jsonwebtoken');
var http = require('http');
const { Pool } = require('pg')


const pool = new Pool({
  user: 'root',
  host: '173.249.41.169',
  database: 'sandgramBank',
  password: 'WsH4BHA35nVc',
  port: 5432,
})

/*
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
*/
console.log(jwt.sign({"Nome": "Ale"}, "segreto"));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/registrazione',  (req, res) => {
    
    pool.query('SELECT * FROM user WHERE email = $1', ["ciao"], (err, res) => {
        
        if(res.rowCount == 0)
        {
            console.log("Non sono presente merde");
        }
        else
        {
            console.log("Sono presente, che bello");
        }
        
        
        console.log(err, res);
        pool.end()
    })

    
    
    
    
    
    try {
        jwt.verify(req.get('JWT'), 'segreto');
        console.log("ok");
    }
    catch
    {
        console.log("Volevi stronzo");
    }

    res.end();
});

app.get("/insert", (req, res) => {
    pool.query('INSERT INTO utenti (email, nome, passwd) VALUES ($1,$2,$3)', ["ale", "bose", "stocazzo"], (err, res) => {
   
        console.log(err, res);
        pool.end()
    });
    res.end();

})


app.listen(3000, () => {

    console.log('API SENDGRAMBANK ONLINE');
});