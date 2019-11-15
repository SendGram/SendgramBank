const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
var jwt = require('jsonwebtoken');
var http = require('http');
const bcrypt = require('bcryptjs');
const pool = require("./DBSettings.js")


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));



console.log(jwt.sign({"Nome": "Ale"}, "segreto"));



app.post('/registrazione',  (req, res) => {
    
    let email = req.query.email;
    let nome = req.query.nome;
    let passwd = req.query.passwd;
    
    pool.query('SELECT * FROM utenti WHERE email = $1', [email], (err, res) => {
        if (res.rows.length == 0)
        {
           bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(passwd, salt, (err, hash) => {
                    passwd = hash;
                    pool.query('INSERT INTO utenti (email, nome, passwd) VALUES ($1, $2, $3)', [email, nome, passwd], (err, res) => {
                        jwt.sign({ "email": email ,"Nome": nome }, "SendgramBankPassword");   
                    });
               });
           });
        }
        else
        {
            console.log("Esisto");
        }
       
    });
    
    /*
    try {
        jwt.verify(req.get('JWT'), 'segreto');
        console.log("ok");
    }
    catch
    {
        console.log("Volevi stronzo");
    }
    */
    res.end();
});

app.post("/login", (req, res) => {
    let email = req.query.email;
    let nome = req.query.nome;
    let passwd = req.query.passwd;

    
    
    pool.query('SELECT * FROM utenti WHERE email = $1', [email], (err, res) => {
    
        let hash =  res.rows[0].passwd;
        if(res.rows.length == 0)
        {
            console.log("Utente non presente");
        }
        else
        {
            
            bcrypt.compare(passwd, hash, (err, risp) => {
                if(risp)
                {
                    jwt.sign({ "email": email ,"Nome": nome }, "SendgramBankPassword");
                }
                else
                {
                    console.log("no")
                }
            });
            
        }
        
    });
    res.end();
});




app.post('/prove', (req, res) =>{
    let email = req.query.email;
    let nome = req.query.nome;
    let passwd = req.query.passwd;
    
    console.log(email);
    console.log(nome);
    console.log(passwd);
    
        pool.query('SELECT * FROM utenti WHERE email = $1', ["ale"], (err, res) => {
            console.log(err, res);
        });
         
    
    
    res.end();
});

app.listen(3000, () => {

    console.log('API SENDGRAMBANK ONLINE');
});