const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
var jwt = require('jsonwebtoken');
var http = require('http');
const bcrypt = require('bcryptjs');
const pool = require("./DBSettings.js")
const websocket=require("./websocket");
const bank=require("./bank");
const user=require("./user");
const { createServer } = require('http');
const WebSocket = require('ws');



app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));

 
const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
  
    
    ws.send("hi mario");
  
  console.log('started client interval');

  ws.on('close', function() {
    console.log('stopping client interval');
   
  });

  ws.on('message', (message) => {
        handle(message, ws);
  });
});

server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});




app.post('/registrazione',  (req, res) => {
    
    let email = req.headers.email;
    let nome = req.headers.nome;
    let passwd = req.headers.passwd;

    pool.query('SELECT * FROM utenti WHERE email = $1', [email], (err, risultato) => {
        if (risultato.rows.length == 0)
        {
           bcrypt.genSalt(10, (err, salt) => {
               if (err)
               {
                   res.send({"errore": "generico1"});
                   return 0;
               }
               bcrypt.hash(passwd, salt, (err, hash) => {
                if (err)
                {
                    console.log(passwd);
                    res.send({"errore": "generico2"});
                    return 0;
                }
                    passwd = hash;
                    pool.query('INSERT INTO utenti (email, nome, passwd) VALUES ($1, $2, $3)', [email, nome, passwd], (err, risultato1) => {
                        if(err)
                        {
                            res.send({"errore": "generico3"});
                            return 0;
                        } else
                        {
                            try 
                            {
                                console.log("ciao");
                                let JWT = jwt.sign({ "email": email ,"Nome": nome }, "SendgramBankPassword");   
                                res.send({ "Successo": JWT });
                                return 0;
                            } catch
                            {
                                res.send({"errore": "generico4"});
                                return 0;
                            }
                           
                        }
                        
                    });
               });
           });
        }
        else
        {
            res.send({ "errore": "Utente già presente" });
            return 0;
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
});

app.post("/login", (req, res) => {
    let email = req.headers.email;
    let passwd = req.headers.passwd;
    
    
    
    pool.query('SELECT * FROM utenti WHERE email = $1', [email], (err, result) => {
    
        if(result.rows.length == 0)
        {
            res.send({ "errore": "wrong password" });
            return 0;
        }
        else
        {
            let hash =  result.rows[0].passwd;
            bcrypt.compare(passwd, hash, (err, risp) => {
                if(risp)
                {
                    let JWT = jwt.sign({ "email": email }, "SendgramBankPassword");
                    res.send({ "Successo": JWT });
                    return 0;
                }
                else
                {
                    res.send({ "errore": "wrong password" });
                    return 0;
                }
            });
            
        }
        
    });
});



app.post('/prove', (req, res) =>{
    /*
    let email = req.query.email;
    let nome = req.query.nome;
    let passwd = req.query.passwd;
    
    console.log(email);
    console.log(nome);
    console.log(passwd);
    
        pool.query('SELECT * FROM utenti WHERE email = $1', ["ale"], (err, res) => {
            console.log(err, res);
        });
         
    
    */

    res.send({ 'SanPaolo': "Ci metto la faccia" });
    
});

app.listen(3000, () => {

    console.log('API SENDGRAMBANK ONLINE');
});




function handle(msg, ws){
    //login message
    try {
        let json =JSON.parse(msg);
        console.log(msg);
        if(json.hasOwnProperty("login")){
            //aggiungo utente
            console.log("[+] arrivato nuovo jwt utenti validazione in corso");
            try {
                let decoded= jwt.verify(json.login, "SendgramBankPassword"); 
                websocket.newUser(decoded.email, ws);
                user.getUserInfo(decoded.email, (nome, saldo, transazioni)=>{
                    ws.send({"login":true, "nome":nome, "saldo":saldo, "transazioni":transazioni});
                });
            } catch (error) {
                console.log("error");
            }


        }else if(json.hasOwnProperty("logout")){
            let decoded= jwt.verify(json.logout, "SendgramBankPassword");
            if(websocket.disconnect(decoded.email)){}
        }
    } catch (error) {
        console.log("aaa");
        ws.send({"error":"Json"});
    }
}


