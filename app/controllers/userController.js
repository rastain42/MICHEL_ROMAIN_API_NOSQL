const userModel = require('../models/userModel');
const { hashPassword, comparePassword} = require('../../services/auth');
const jwt = require('jsonwebtoken');


// Incription 
async function signin (req, res) {
    try {
        const {email, password} = req.body;

        let userExist = await userModel.findOne({email : email});
        if(userExist) return res.status(400).json("user already exist");

        const hashedPassword = await hashPassword(password);

        const newUser = new userModel({
            email, 
            password: hashedPassword
        });

        await newUser.save();
        const user = newUser.toObject();
        delete user.password;
        res.json(user)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Login 

async function login (req, res) {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json("wrond email");

        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).json("wrond password");

        // Création du token 
        const token = jwt.sign({user}, process.env.SECRET, {
            expiresIn : '3600s',
            algorithm: 'HS256'
        });

        res.setHeader('Authorization', token )

        const userToreturn = user.toObject();
        delete userToreturn.password;

        res.json(userToreturn);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Signout 
async function signout (req, res) {
    try {
        req.payload.exp = Math.floor(Date.now() / 1000 ) -(60*60);

        const token = jwt.sign (req.payload, process.env.SECRET, {algorithm: 'HS256'});

        res.setHeader('Authorization', token );

        req.payload = undefined;

        res.json({message : 'signout succes'})


        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    signin,
    login,
    signout
}