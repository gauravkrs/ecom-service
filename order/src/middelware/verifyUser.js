const axios = require('axios');

const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({ message: 'Authorization token is missing' });
    }

    try {
        const response = await axios.post('http://localhost:3003/api/v1/user/verifyToken',{}, {
            headers: { Authorization: token }
        })
        if(response.data.valid){
            next()
        }else{
            return res.status(401).send({ message: 'Authorization token is invalid' });
        }
    } catch (error) {
        console.log('Token verification error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
}