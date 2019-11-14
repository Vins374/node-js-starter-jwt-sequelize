var jwt = require('jsonwebtoken');

exports.validate = function(req, res, next) {
    try{
    	let token = req.header('token');
        var verifiedJwt = jwt.verify(token,"mysql_app_secret");
        console.log(verifiedJwt);
        if(verifiedJwt) {
        	req.authUser = verifiedJwt;
	        console.log(token);
	        next();	
        }
        else {
    		return res.status(901).send({status: false, message : "Invalid token 2"});     	
        }
        
    }
    catch(err) {
        return res.status(901).send({status: false, message : "Invalid token 1"}); 
    }
}