const pool = require("./DBSettings.js")
const websocket=require("./websocket");

exports.getSaldo=(email)=>{
    addTrans("ale", 1000, "aaa", (a)=>{
        console.log(a);
    });
    pool.query("SELECT * FROM transazioni WHERE email = $1",[email], (err, res)=>{
        if(err||res.rows.length<1){
            return false;
        }
        console.log(res.rows[0].saldo);
        return res.rows[0].saldo;
    });

}
async function isUser(email, callback){
    
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
                    callback(false);
                }else{
                    console.log(res);
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
            ris.push([d, importo.toString(), email, dest]);
            console.log(ris);
            pool.query("UPDATE transazioni SET transazioni= $1 WHERE email=$2", [ris, email], (err, res)=>{
                if(err){
                    console.log(err);
                    callback(false);
                }else{
                    
                    callback(true);
                }
            });
        }
    });
    
}



