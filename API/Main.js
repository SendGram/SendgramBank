const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
const fs= require("fs");
global.atob = require("atob");
var request = require('request');
var jwt = require('jsonwebtoken');
var http = require('http');
const bcrypt = require('bcryptjs');
const pool = require("./DBSettings.js")
const websocket=require("./websocket");
const { createServer } = require('http');
const WebSocket = require('ws');

const ipAdd="239.3.12.31"       //ip

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));
app.use('/', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use('/media', express.static(__dirname + '/media'));
app.use('/media-reg', express.static(__dirname + '/media-reg'));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

const wssFace = new WebSocket.Server({ port: 8081 });
 
wssFace.on('connection', function connection(ws) {
  ws.on('message', function incoming(msg) {
      console.log("ricevuto mex su Face Socket: "+msg);
    try{
        let json =JSON.parse(msg);
        if(json.hasOwnProperty("FaceLogin")){
            websocket.newUserFace(json.FaceLogin, ws);
            console.log("Aggiunto Face User")
        }

    }catch(error){
        console.error(error);
    }
  });
 
  
});


wss.on('connection', function(ws) {
  
    
    ws.send("hi mario");
  
  console.log('started client interval');

  ws.on('close', function() {
    console.log('stopping client interval');
   
  });

  ws.on('message', (msg)=>{
    handle(msg, ws)
  });
});

server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});


console.log(jwt.sign({"Nome": "Ale"}, "segreto"));


app.get('/', function (req, res) {
    let decoded= jwt.verify(req.query.jwt, "SendgramBankPassword"); 
    try {
      if (fs.existsSync("/Users/alessandrocaldonazzi/Downloads/Face-Detection-JavaScript-master/media-reg/"+decoded.email+".jpeg")) {
        res.sendFile(__dirname +'/public/cam.html');
      }else{
        res.sendFile(__dirname +'/public/set.html');
      }
    } catch(err) {
      res.sendFile(__dirname+'/public/set.html');
    }
    
  });
  app.get('/facelogin', function (req, res) {
     res.sendFile(__dirname +'/public/login.html')
  });

  app.post('/facelogin', function (req, res) {
    let uuid = req.body.uuid;
    let img = req.body.base64;
    img=atob(img);
    console.log(img)
    img=img.split(",")[1];
    let a=makeid(15);
    require("fs").writeFile(__dirname+"/media/"+a+".jpeg", img, 'base64', function(err) {
      
    });
    let faceId;
  let imageUrl="http://"+ipAdd+":3000/media/"+a+".jpeg";
  let path= __dirname+"/media/"+a+".jpeg";
      //let result=fs.readFileSync(path);
      //console.log(result)
      
    var options = {
      url: 'https://sendgrambank.cognitiveservices.azure.com/face/v1.0/detect',
      headers: {
        'Ocp-Apim-Subscription-Key': 'dc1b968da7974748a2ccd72755e62068',
        'Content-Type':"application/json"
      },
      params:{
        'returnFaceId':true
      },
      body:'{"url": ' + '"' + imageUrl + '"}'
    };
    
    request.post(options, (error, response, body)=>{
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        if(info.length==0){
          res.send("error");
          websocket.sendMexFace(uuid, JSON.stringify({"facelogin":"false"}));
          return 0;
        }
          
        faceId=info[0].faceId;

        fs.readdir(__dirname+"/media-reg/", (err, files) => {
          files.forEach(file => {
            console.log(file);
            let imageUrl="http://"+ipAdd+":3000/media-reg/"+file;
            let options = {
              url: 'https://sendgrambank.cognitiveservices.azure.com/face/v1.0/detect',
              headers: {
                'Ocp-Apim-Subscription-Key': 'dc1b968da7974748a2ccd72755e62068',
                'Content-Type':"application/json"
              },
              params:{
                'returnFaceId':true
              },
              body:'{"url": ' + '"' + imageUrl + '"}'
            };
            request.post(options, (error, response, body)=>{
              if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                if(info.length==0){
                  res.send("error");
                  websocket.sendMexFace(uuid, JSON.stringify({"facelogin":"false"}));
                  return 0;
                }
                let faceX=info[0].faceId;
                verify(faceId, faceX, (result)=>{
                  if(result==true||result=="true"){
                    let JWT = jwt.sign({ "email": file.split(".jp")[0] ,"Nome": "not Defined" }, "SendgramBankPassword");  
                    res.send("JWT");
                    websocket.sendMexFace(uuid, JSON.stringify({"facelogin":"true", "jwt": JWT}));
                    
                  }else{
                    res.send("utente non riconoscito")
                    websocket.sendMexFace(uuid, JSON.stringify({"facelogin":"false"}));
                    return 0;
                  }
                })
              }

            });

          });

        });

      }

    });


    
     
});


/*
app.get('/foto', function (req, res) {
  console.log("aaa")
  let a =req.query.key
  //let imgg=decodeURIComponent(req.query.base64)
  let path= "/Users/alessandrocaldonazzi/Downloads/Face-Detection-JavaScript-master/"+a+".txt";
  var content = fs.readFileSync(path);
  let imgg=decodeURIComponent(content)
  
  var img =Buffer.from(imgg,'base64');
  res.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': img.length 
  });
  res.end(img);
});
*/

function existPhoto(email){
    try {
      if (fs.existsSync(__dirname+"/media-reg/"+email+".jpeg")) {
        return true;
      }else{
        return false;
      }
    } catch(err) {
      return false;
    }
  }
  app.post('/cam', function (req, res) {
    let decoded= jwt.verify(req.body.jwt, "SendgramBankPassword"); 
    if(existPhoto(decoded.email)){
      let img = req.body.base64;
      img=atob(img);
      console.log(img)
      img=img.split(",")[1];
      let a=makeid(15);
      require("fs").writeFile(__dirname+"/media/"+a+".jpeg", img, 'base64', function(err) {
        
      });
  
    let imageUrl="http://"+ipAdd+":3000/media/"+a+".jpeg";
    let path= __dirname+"/media/"+a+".jpeg";
        //let result=fs.readFileSync(path);
        //sudo console.log(result)
        
      var options = {
        url: 'https://sendgrambank.cognitiveservices.azure.com/face/v1.0/detect',
        headers: {
          'Ocp-Apim-Subscription-Key': 'dc1b968da7974748a2ccd72755e62068',
          'Content-Type':"application/json"
        },
        params:{
          'returnFaceId':true
        },
        body:'{"url": ' + '"' + imageUrl + '"}'
      };
      
       
      
       
      
       request.post(options, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          if(info.length==0){
            res.send("error");
            return 0;
          }
          console.log(info[0].faceId)
          let faceId1=info[0].faceId;
          imageUrl="http://"+ipAdd+":3000/media-reg/"+decoded.email+".jpeg";
          console.log(imageUrl)
          options = {
            url: 'https://sendgrambank.cognitiveservices.azure.com/face/v1.0/detect',
            headers: {
              'Ocp-Apim-Subscription-Key': 'dc1b968da7974748a2ccd72755e62068',
              'Content-Type':"application/json"
            },
            params:{
              'returnFaceId':true
            },
            body:'{"url": ' + '"' + imageUrl + '"}'
          };
          request.post(options, (error, response, body)=>{
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              if(info.length==0){
                res.send("error");
                return 0;
              }
              let faceId2=info[0].faceId;
              console.log(faceId2)
              verify(faceId1, faceId2, (result)=>{
                res.send(result);
              })
  
            }
          })
        }
        
       });
     
    }else{
      let img = req.body.base64;
      img=atob(img);
      console.log(img)
      img=img.split(",")[1];
      require("fs").writeFile(__dirname+"/media-reg/"+decoded.email+".jpeg", img, 'base64', function(err) {
        console.log(err);
      });
    }
    
  });
  
  // '{"faceId1": ' + '"' + face1 + '"'+'"faceId1":'+ face1 + '"'+ '}'
  function verify(face1, face2, callback){
      let options = {
        url: 'https://sendgrambank.cognitiveservices.azure.com/face/v1.0/verify',
        headers: {
          'Ocp-Apim-Subscription-Key': 'dc1b968da7974748a2ccd72755e62068',
          'Content-Type':"application/json"
        },
        params:{
          'returnFaceId':true
        },
        body:JSON.stringify({"faceId1":face1, "faceId2": face2})
      };
      request.post(options,(error, res,body)=>{
        if(error){
            callback(false);
            return 0;
  
        }
        var info = JSON.parse(body);
        callback(info.isIdentical)
        
      });
  }
   
  
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  

app.post('/registrazione',  (req, res) => {
    
    let email = req.query.email;
    let nome = req.query.nome;
    let passwd = req.query.passwd;

    pool.query('SELECT * FROM utenti WHERE email = $1', [email], (err, res) => {
        if (res.rows.length == 0)
        {
           bcrypt.genSalt(10, (err, salt) => {
               if (err)
               {
                   res.send({"errore": "generico"});
                   return 0;
               }
               bcrypt.hash(passwd, salt, (err, hash) => {
                if (err)
                {
                    res.send({"errore": "generico"});
                    return 0;
                }
                    passwd = hash;
                    pool.query('INSERT INTO utenti (email, nome, passwd) VALUES ($1, $2, $3)', [email, nome, passwd], (err, res) => {
                        let JWT = jwt.sign({ "email": email ,"Nome": nome }, "SendgramBankPassword");   
                        res.send({ "Successo": JWT });
                    });
               });
           });
        }
        else
        {
            res.send({ "errore": "Utente già presente" });
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
    let passwd = req.query.passwd;
    
    
    
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


