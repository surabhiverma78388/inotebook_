const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'surabhiissecretkey';
const fetchuser = require('../middleware/fetchuser');
//ROUTE1: create a user using post  "/api/auth/createuser".dosent require auth(no login required)
router.post('/createuser', [
    body('email', 'enter a valid email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'enter a valid password(atleast 5 characters)').isLength({ min: 5 })
], async (req, res) => {
      let success=false;
    //if errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if email aready exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry user with email already exists" })
        }
        //create new user
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email,
        })
        const data = {
            user:
            {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
       success=true
        res.json({ "success": success,"authtoken":authtoken});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 2: authenticate user using post  "/api/auth/login".dosent require auth(no login required)
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try
    {
        let user=await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare=await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            success=false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success,authtoken});
    }catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//route 3: authenticate user using  post "  /api/auth/getuser" .login required"
router.post('/getuser',fetchuser,async (req, res) => {

try {
    const userid=req.user.id;
    const user=await User.findById(userid).select("-password");
    res.send(user);
} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }})
module.exports = router;
