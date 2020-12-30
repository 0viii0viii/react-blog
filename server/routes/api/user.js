import express, { response } from 'express';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import config from "../../config/index";
const { JWT_SECRET } = config;

//Model
import User from '../../models/user'

const router = express.Router();

// @routes GET api/user
// @desc get all user
// @access public

router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        if(!users) throw Error("No users found")
        res.status(200).json(users)
    }catch(e){
        console.log(e);
        res.status(400).json({msg: e.message});
    }
});


// @routes POST api/user
// @desc register user
// @access public
router.post('/', async(req, res)=> {
    console.log(req);
    const { name, email, password } = req.body

    // Simple validation
    if(!name || !email|| !password) {
        return res.status(400).json({msg: "All field must be filled."})
    }

    // Check for existence
    User.findOne({email}).then((user)=>{
        if(user) return res.status(400).json({ msg: "The email is already in use."});
        const newUser = new User({
            name, email, password
        })
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user)=> {
                    jwt.sign(
                        {id: user.id},
                        JWT_SECRET,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
            })
        } )
    });
})

export default router;