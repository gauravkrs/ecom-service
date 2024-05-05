const { ResponseMessage } = require("../constants");
const { verifyToken } = require("../utils/jwtToken");

const verifiedToken = async(req, res) => {
    const token =  req.header('Authorization'); 
    if(!token) {
        return res.status(400).send({ message: ResponseMessage.TOKEN_IS_MISSING });
    }
    const tokenWithoutBearer = token.split(' ')[1];
    try {
        const decodeToken = await verifyToken(tokenWithoutBearer)
        if(decodeToken){
            res.status(200).send({ message: ResponseMessage.SUCCESS, valid: true, user: decodeToken });
        }else{
            res.status(401).send({ message: ResponseMessage.UNAUTHORIZED, valid: false });
        }
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).send({ message: ResponseMessage.UNAUTHORIZED, valid: false });
    }
}

module.exports = {verifiedToken}