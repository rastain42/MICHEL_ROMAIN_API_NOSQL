const jwt = require('jsonwebtoken');

const checkJwt = function(req, res, next) {
    try {
        // on récupère le token envoyé par la requête dans le header 
        const token = req.headers['authorization'];
        // On teste si le token est valide 
        const payload = jwt.verify(token, process.env.SECRET, {algorithms: ['HS256']});
        if(!payload.user){
            return res.status(401).json("Vous n'êtes pas autorisé à accéder à cette ressource");
        }
        req.payload = payload.user;
        next()

    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = checkJwt;