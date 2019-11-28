const pool = require("./DBSettings.js")
const websocket=require("./websocket");

exports.getSaldo=(email, callback)=>{
    
    pool.query("SELECT * FROM transazioni WHERE email = $1",[email], (err, res)=>{
        if(err||res.rows.length<1){
            callback(false);
        }
        console.log("get saldo "+ email + " " + res.rows[0].saldo);
        callback( res.rows[0].saldo);
    });

}
function getSaldo(email, callback){
    
    pool.query("SELECT * FROM transazioni WHERE email = $1",[email], (err, res)=>{
        if(err||res.rows.length<1){
            
            callback(false);
        }
        console.log("get saldo "+ email + " " + res.rows[0].saldo);
        if(typeof res.rows[0].saldo =="string"){
            callback( parseInt(res.rows[0].saldo));

        }else{
            callback( res.rows[0].saldo);

        }
    });

}
 function isUser(email, callback){
    
    pool.query("SELECT email FROM transazioni WHERE email= $1", [email], (err, res) => {
        if (err || res.rows.length < 1) {
            
            callback(false);
        }
        else
            
            callback(true);
    });
}

 function setSaldo(email, saldo, callback){
    let is=  isUser(email, (res)=>{
        if(!res){

            callback(false);
        }else{
            pool.query("UPDATE transazioni SET saldo= $1 WHERE email=$2", [saldo, email], (err, res)=>{
                if(err){
                    console.log("set saldo "+ email+ " torno false ", err);

                    callback(false);
                }else{
                    console.log("set saldo "+ email+ " torno true");
                    callback(true);
                }
            });
        }
    });
    
    
}
function getTrans(email, callback){
    pool.query("SELECT transazioni FROM transazioni WHERE email=$1", [email], (err, res)=>{
        if(err||res.rows.length<1){
            callback(false);
        }else{
            callback(res.rows[0].transazioni);
        }
    });
}
function addTrans(email, importo, dest, callback){
    getTrans(email, (ris)=>{
        if(typeof ris == "boolean"){
            callback(false);
        }else{
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let d= year + "-" + month + "-" + date;
            
            if(typeof ris !="object" || ris== null ||ris.length<1){
                ris=[];

            }
            getSaldo(email, (a)=>{
                if(a!=false){
                    if(a>=importo){
                        a=a-importo;
                        setSaldo(email, a, (q)=>{
                            if(q==false){
                                callback(false);
                                return 0;
                            }
                            getSaldo(dest, (aa)=>{
                                
                                if(aa!=false){
                                    
                                        aa=aa+importo;
                                        setSaldo(dest, aa, (qq)=>{
                                            if(!qq){
                                                callback(false);
                                                return 0;
                                            }
                                            
                                        });
                                    
                                }
                            });
                        });
                    }else{
                        callback(false);
                        return 0;
                    }
                }
            });
            if(typeof importo !="string"){
                ris.push([d, "- "+importo.toString(), email, dest]);

            }else{
                ris.push([d, "- "+importo, email, dest]);
            }
            
            console.log(ris);
            pool.query("UPDATE transazioni SET transazioni= $1 WHERE email=$2", [ris, email], (err, res)=>{
                if(err){
                    console.log(err);
                    callback(false);
                    return 0;
                }else{
                    getTrans(dest, (riss)=>{
                        if(typeof riss !="object" || riss== null ||riss.length<1){
                            riss=[];
            
                        }
                        
                        if(typeof importo !="string"){
                            riss.push([d, "+ "+importo.toString(), email, dest]);
                        }else{
                            riss.push([d, "+ "+importo, email, dest]);
                        }
                        
                        
                        pool.query("UPDATE transazioni SET transazioni= $1 WHERE email=$2", [riss, dest], (err, res)=>{
                            if(err){
                                console.log(err);
                                callback(false);
                            }else{
                                
                                callback(true);
                            }
                        });
                    });
                    
                }
            });
        }
    });
    
}

function notifyUser(mitt, dest, importo){
    websocket.sendMex(mitt, JSON.stringify({"confirm-trans": true, "importo": importo, "dest": dest}));
    websocket.sendMex(dest,  JSON.stringify({"new-trans": true, "importo": importo, "mitt": mitt}));

    getSaldo(mitt,(a)=>{
        if(a!=false){
            websocket.sendMex(mitt, {"saldo": a});
            getTrans(mitt, (tran)=>{
                websocket.sendMex(mitt, {"transazioni": tran});
            });

        }
    });
    getSaldo(dest,(a)=>{
        if(a!=false){
            websocket.sendMex(dest, {"saldo": a});
            getTrans(dest, (tran)=>{
                websocket.sendMex(dest, {"transazioni": tran});
            });

        }
    });
}

exports.newTransation=(mitt, dest, importo, callback)=>{
    addTrans(mitt, importo, dest, (a)=>{
        console.log(a);
        if(a){
            notifyUser(mitt, dest, importo);
            callback(true);
            return 0;
        }
    });
    
    return 0;
}