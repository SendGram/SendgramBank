let utenti={};

exports.newUser=(email, ws)=>{
    
    utenti[email]=ws;
    
}
exports.sendMex=(email, mex)=>{
    if(!UserExist(email)){
        return false;
    }
    try {
        if(typeof mex =="object"){
            mex=JSON.stringify(mex);
        }
        utenti[email].send(mex);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}
exports.disconnect=(email)=>{
    try {
        delete utenti[email];
        return true;
    } catch (error) {
        return false;
    }
}
function UserExist(email){
    return utenti.hasOwnProperty(email);
}
exports.isOnline=(email)=>{
    return utenti.hasOwnProperty(email);
}

