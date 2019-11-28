import pool from "./DBSettings.js"
export function getUserInfo(email, callback){
    pool.query("SELECT name FROM utenti WHERE email=$1", [email], (err, res)=>{
        if(err){
            callback(false);
            return 0;
        }
        let nome=res.rows[0].nome;
        pool.query("SELECT * FROM transazioni WHERE email=$1", [email], (err, res)=>{
            if(err){
                callback(false);
                return 0;
            }
            callback(nome, res.rows[0].saldo, res.rows[0].transazioni);
        });
    });
}