const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const serveStatic = require('serve-static');
const Server = require('ws').Server;
const session = require('session-ws');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const port =  9030;
let ws = new Server({port: port});


app.use(bodyParser.urlencoded({
    extended: true
}));




let pool = mysql.createPool({
    connectionLimit: 10,
    host: '165.22.82.82',
    user: 'mytems',
    password: 'Password1.',
    database: 'mytems'
});

app.use(serveStatic(path.join(__dirname, '/public')));
app.use(serveStatic(path.join(__dirname, '/public/html'), { extensions: ['html', 'htm'] }));

app.get('/prova', function (req, res){
    res.send(session.getOne(req, "email"));
});

app.post('/logcont', (req, res) => {


  let email = req.body.email;
  let passwd = req.body.passwd;

  if(email == '' || passwd == '')
  {
    return res.redirect('/login?err=cv');
  }
  
 
    
  pool.getConnection((err, connection) => {

    if (err) {
      //redirect
      return res.redirect('/login?err=db');

    } // not connected!

    connection.query('SELECT * FROM user WHERE email = ?;', [email], (error, results) => {

      if (err) {
       //redirect
       res.redirect('/login?err=db');

        }

       if (results.length == 0) {
          
        console.log("Utente non presente");
        res.redirect("/login?err=user");
        
      } else {
        
        console.log("Utente riconosciuto");
        let hash = results[0].passwd;
        bcrypt.compare(passwd, hash, (err, risp) => {
          
          if(risp) {
              let id = session.new(res);
            let oggetto={
                "email":email
            }
            session.addJson(id,oggetto);
            res.redirect("/index");
          
          } else {
            res.redirect("/login?err=passwd");
          }
        });          
      }
    });



    });
});

app.post('/cont', (req, res) => {


    let email = req.body.email;
    let passwd = req.body.passwd;
    let repasswd = req.body.repasswd;

    if (passwd != repasswd) {
        //redirect
        res.redirect('/signup?err=pwd');
    }
    pool.getConnection((err, connection) => {

        if (err) {
            //redirect
            res.redirect('/signup?err=db');

        } // not connected!


        connection.query('SELECT * FROM user WHERE email = ?;', [email], (error, results) => {

            if (err) {
                //redirect
                res.redirect('/signup?err=db');

            }

            if (results.length == 0) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(passwd, salt, (err, hash) => {
                        passwd = hash;
                        connection.query('INSERT INTO user (email, passwd) VALUES (?,?); ', [email, passwd], (err, result) => {
                          if (err) {
                              //redirect
                              res.redirect('/signup?err=db');
      
                          } else {
                              //aggiunto redirect index logged
                              let id = session.new(res);
                              session.addOne(id, 'email', email);
                              res.redirect('/index');
      
                          }
                      });
                    });
                });

                
            } else {
                // utente gia presente con questa email / username
                console.log("utente gia presente");
                res.end();
            }



        });
    });
});
/*
obj={
    email="",
    articolo=""
}
 */

ws.on("connection", (w) => {
    w.send("connessione riuscita");

    w.on("message", (msg) => {
        let obj=JSON.parse(msg);
        if(obj.hasOwnProperty("msg") && obj.msg == "controllo") {
            if(!session.exist(obj.id)){
                w.send("non loggato");
            } else {
                w.send("loggato");

            }
        }

        pool.getConnection((err, connection) => {

            let email=session.getOne(obj.id, "email");
            connection.query("INSERT INTO carrello (email, articoli) VALUES (?, ?)", [email, obj.articoli], (error, result)=>{

           });

        });
    });

});

app.listen(3000, () => {

    console.log('Server start');
});