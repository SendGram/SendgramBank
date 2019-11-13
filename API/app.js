const serveStatic = require('serve-static');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const url = 'mongodb://localhost:27017';
const dbName = 'PublicSendgram';
var https = require('https');
const fs=  require('fs');
 
let user=[];
app.use(bodyParser.urlencoded({ extended: false }))

const WebSocket = require('ws');
let Gruppi={};
const server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/public.sendgram.tech/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/public.sendgram.tech/privkey.pem')
  });
  
  const wss = new WebSocket.Server({ server });
  
  server.listen(3980);
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
      
    let obj = JSON.parse(message);
    console.log(obj);
    
    try {
        var decoded = jwt.verify(obj.jwt, 'shhhhh');
        
      } catch(err) {
        ws.send("error_verify");
        return 0;
      }
 
    if(obj.hasOwnProperty("login")){
        
        if(obj.login=="true"){
            console.log("si");
            getUserGroup(decoded.name,(res)=>{
                
                console.log(decoded.name);
                console.log(res);

                if(!res){
                    ws.send(JSON.stringify({"error":"error"}));
                }else{
                    let obb={
                        "userGroup":true,
                        "gruppi":res
                    }
                    res.forEach((element)=>{
                        
                        if(Gruppi.hasOwnProperty(element)){
                            Gruppi[element].push(decoded.name);
                            
                        }else{
                            console.log(element);

                            Gruppi[element]=[];
                            Gruppi[element].push(decoded.name);
                            
                        }
                        
                        console.log("gruppi");
                        console.log(Gruppi);
                    })
                    let a=[decoded.name, ws];
                    let c=0;
                    for(let i=0; i<user.length; i++){
                        
                        if(user[i][0]==decoded.name){
                            
                            c=1;
                        }
                    }
                    if(c==0){
                        user.push(a);
                    }
                    
                    
                    ws.send(JSON.stringify(obb));
                }
            });
           
        }
    }else if(obj.hasOwnProperty("n_gruppo_e")){

        console.log("si");
        addGroupUser(decoded.name, obj.n_gruppo_e, (res)=>{
            let resObj={
                "n_gruppo_e":true,
                "res":res
            }
            ws.send(JSON.stringify(resObj));
            
        });
    }else if(obj.hasOwnProperty("get_online")){

        let objj={
            "get_online":true,
            "res":Gruppi[obj.group]
        }
        ws.send(JSON.stringify(objj));
    }else if(obj.hasOwnProperty("chiudo")){
        console.log("ok");
        getUserGroup(decoded.name,(res)=>{
                
            console.log(decoded.name);
            console.log(res);

            
                let obb={
                    "userGroup":true,
                    "gruppi":res
                }
                res.forEach((element)=>{
                    Gruppi[element] = Gruppi[element].filter(item => item !== decoded.name);
                    
                    console.log("gruppi");
                    console.log(Gruppi);
                })
                for(let i=0; i<user.length; i++){
                    console.log("ue");
                    console.log(user[i][0]);
                    if(user[i][0]==decoded.name){
                        
                        delete user[i];
                        user = user.filter(Boolean);
                        console.log("user chiudo");
                        console.log(user);
                    }
                }
                    
                    
                
               
            
        });
        
    }else if(obj.hasOwnProperty("send-message")){
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; 
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let newdate = year + "/" + month + "/" + day;
       
        let vett=[decoded.name, obj.mex, newdate];
        let gruppo= obj.group;
        getMessageGroup(gruppo, (res)=>{
            console.log("qui");
            if(res!=false){
                console.log("res");
                console.log(res);
                res.push(vett);
                console.log("res af");
                console.log(res);
                MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {


                    const db1 = client.db(dbName);
                    
                    db1.collection("Gruppi").updateOne({"name":gruppo}, {$set: {"msg": res}},(err, result) =>{
                        if (err) ws.send(JSON.stringify({"send-message":true, "res":"error"}));          //4 == error in update
                        
                        ws.send(JSON.stringify({"send-message":true, "res":"ok", "group": gruppo, "msg":obj.mex}))
                        console.log("gruppo");
                        let invio = Gruppi[gruppo].filter(item => item !== decoded.name);
                        invio.forEach((element)=>{
                            console.log("elemento");
                            console.log(element);
                            for(let i=0; i<user.length; i++){
                                console.log("ue");
                                console.log(user[i][0]);
                                if(user[i][0]==element){
                                    
                                    user[i][1].send(JSON.stringify({"new-message": true, "msg":obj.mex, "sender":decoded.name, "ora":vett[2], "group": gruppo}));
                                    console.log("inviato a tutti");
                                }
                            }
                        })
                        
                        
                      });
                      
                      client.close();
                      
                });
            }else{
                ws.send(JSON.stringify({"send-message":true, "res":"error"}));
            }
            
        });
        

        
    }else if(obj.hasOwnProperty("get-message")){

        getMessage(decoded.name, (res)=>{
            if(typeof res=="object"){
                let obj={
                    "get-message": true,
                    "res": res
                }
                ws.send(JSON.stringify(obj));
            }
        })
    }else if(obj.hasOwnProperty("n_gruppo_n")){

        groupExist(obj.n_gruppo_n, (res)=>{

            if(res){
                //gruppo esiste già
                let resObj1={
                    "n_gruppo_n":true,
                    "res":7
                }
                ws.send(JSON.stringify(resObj1));
            }else{
                newGroup(obj.n_gruppo_n, (res1)=>{
                    if(!res1){
                        //errore
                        let resObj2={
                            "n_gruppo_n":true,
                            "res":6
                        }
                        ws.send(JSON.stringify(resObj2));
                    }else{
                        console.log("impossibile");
                        addNewGroupUser(decoded.name, obj.n_gruppo_n, (res2)=>{
                            let resObj={
                                "n_gruppo_n":true,
                                "res":res2
                            }
                            ws.send(JSON.stringify(resObj));
                            
                        });
                    }
                });
            }
        });
        
    }
  });
 

});


app.use(serveStatic(path.join(__dirname, '/'), { extensions: ['html', 'htm'] }));

app.post("/login", (req, res) =>{
    let response;
    console.log(req.body.name);
    if(req.body.name==undefined){
        let token= getJWT(req);
        console.log(token);
        try {
            var decoded = jwt.verify(token, 'shhhhh');
            
            res.send("logged");
            
          } catch(err) {
            res.send("error_verify");
          }
        
        
    }else{
        freeUser(req.body.name, (a)=>{
            if(a){
                newUser(req.body.name, (b)=>{
                    if(b){
                        response= "creato";
                        console.log(response);
                        let token = jwt.sign({ name: req.body.name }, 'shhhhh');
                        res.cookie('jwt', token, {secure: false});
                        res.send(token);
                        return 0;
                    }else{
                        response="fallito";
                        console.log(response);
                        res.send(response);
                        return 0;
                    }
                });
            }else{
                response="esiste";
                console.log(response);
                res.send(response);
                
            }
        });
    }
    
    
});

app.get("/", (req, res) => {

    let re= "ciao";
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send(re);
    res.end();
     
});


app.listen(3004, () => {
  console.log('Sito partito');
});

function getMessageGroup(group, callback){
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {
        let result;

        const db1 = client.db(dbName);
        
        db1.collection("Gruppi").findOne({name:group}, function(err, result) {
           
            if (err) callback(false);
            callback(result.msg);
              
            
                
          
                

          });
          client.close();

    });
}
function getMessage(user, callback){
    getUserGroup(user, (res)=>{
        if(res==false){
            callback(0);
            return 0;
        }else{
            let response={};
            let i=0;
            res.forEach((element)=>{
                MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {
                    let result;
            
                    const db1 = client.db(dbName);
                    let obj={
                        "name":user
                    }
                    db1.collection("Gruppi").findOne({name:element}, function(err, result) {
                       
                        if (err) console.log(err);
                        response[element]=result.msg;
                        i++;
                        if(i==res.length){
                            callback(response);
                        }
                          
                        
                            
                      
                            

                      });
                      client.close();
            
                });

            });
            
        }
    });
}

function getUserGroup(user, callback){
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {
        let result;

        const db1 = client.db(dbName);
        let obj={
            "name":user
        }
        db1.collection("Utenti").find({name:obj.name}).toArray( function(err, result) {
           
            if (err) callback(false) ;
            if(result.length>0){
              
                console.log(result);
                return callback(result[0].gruppi);
            }
          });
          client.close();

    });
}

function freeUser(user, callback){
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {
        let result;

        const db1 = client.db(dbName);
        let obj={
            "name":user
        }
        db1.collection("Utenti").find({name:obj.name}).toArray( function(err, result) {
            if (err) throw err;
            if(result.length>0){
               
                result=false;
            }else{
                
              
                result=true;
                
                
            }
            
            if(result){
                callback(true);

            }else{
                callback(false);
            }
          });
          client.close();

    });
    
}
function addGroupUser(user, group, callback){
    groupExist(group, (res)=>{
        if(!res){
            callback(1);    //1== gruppo non esiste
            return 0;
        }else{
            getUserGroup(user, (res1)=>{        //res1 è un vettore
                if(typeof res1 == "boolean"&& res1==false){
                    
                    callback(2);        //2 == errore getting group
                    return 0;

                }else{
                    if(res1.includes(group)){
                        callback(3);        //3 == l'utente è già nel gruppo
                        return 0;

                    }else{
                    
                        let newobj= [];
                        if(res1.length>0){
                            
                            res1.forEach((element) =>{
                                newobj.push(element);
                              });
                        }
                        newobj.push(group);
                        
                        res1.push(group);
                        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {


                            const db1 = client.db(dbName);
                            
                            db1.collection("Utenti").updateOne({"name":user}, {$set: {"gruppi": newobj}},(err, result) =>{
                                if (err) callback(4);           //4 == error in update
                                
                                callback(5);            //1== tutto ok, aggiunto gruppo
                                
                                
                                
                              });
                              
                              client.close();
                              
                        });

                    }
                }
            });
        }
    });
}

function addNewGroupUser(user, group, callback){
    
            getUserGroup(user, (res1)=>{        //res1 è un vettore
                if(typeof res1 == "boolean"&& res1==false){
                    
                    callback(2);        //2 == errore getting group
                    return 0;

                }else{
                    if(res1.includes(group)){
                        callback(3);        //3 == l'utente è già nel gruppo
                        return 0;

                    }else{
                    
                        let newobj= [];
                        if(res1.length>0){
                            
                            res1.forEach((element) =>{
                                newobj.push(element);
                              });
                        }
                        newobj.push(group);
                        
                        res1.push(group);
                        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {


                            const db1 = client.db(dbName);
                            
                            db1.collection("Utenti").updateOne({"name":user}, {$set: {"gruppi": newobj}},(err, result) =>{
                                if (err) callback(4);           //4 == error in update
                                
                                callback(5);            //1== tutto ok, aggiunto gruppo
                                
                                
                                
                              });
                              
                              client.close();
                              
                        });

                    }
                }
            });
        
    
}
function groupExist(group, callback){
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {


        const db1 = client.db(dbName);
        
        db1.collection("Gruppi").find({"name":group}).toArray( (err, result) =>{
            console.log(result);
            if (err) callback(false);
            if(result.length>0){
                callback(true);
            }else{
                callback(false);
            }
            
            
          });
          
          client.close();
          
    });
}
function newGroup(group, callback){
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {


        const db1 = client.db(dbName);
        let obj={
            "name":group,
            "msg":[
                ["Sendgram", "Gruppo creato con successo, invita i tuoi amici", "ora"]
            ]
        }
        db1.collection("Gruppi").insertOne(obj, (err, resInsert) =>{
            if (err) callback(false);
            callback(true);
            
          });
          
          client.close();
          
    });
}
function newUser(user, callback){
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  function(err, client) {


        const db1 = client.db(dbName);
        let obj={
            "name":user,
            "gruppi":[

            ]
        }
        db1.collection("Utenti").insertOne(obj, (err, resInsert) =>{
            if (err) callback(false);
            callback(true);
            
          });
          
          client.close();
          
    });
}

function getJWT(req){
    try {
        if(req.cookie!=undefined){
            if(req.cookie['JWT']!=undefined){
                return req.cookie['jwt'];
            }
        }else{
            if(req.body.jwt!=undefined){
                return req.body.jwt;
            }
        }
    } catch (error) {
        return false;
    }
    
}