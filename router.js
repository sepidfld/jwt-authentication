const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const client = require('./connection');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const validator = require('validator');
const {LocalStorage}= require('node-localstorage');
localStorage = new LocalStorage('./scratch')
router.use(bodyparser.json());
// router.use(express.json());

router.get('/',(req,res)=>{
    res.render('index.ejs');
});
router.post('/login',async(req,res)=>{
  const body = req.body;
  console.log(body)
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).send('Both username and password are required.');
    }
    //find user
    try{
      //find the name
        const check= await auth.findOne({name});
        if(!check){
            return res.status(401).json({ message: 'Invalid name ' });
        }
        //find the password of this name
        const passwordMatch = await bcrypt.compare(password, check.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid  password' });
          }
      //  Generate a JWT token
    const token = jwt.sign({ userId: check._id }, 'your-secret-key', { expiresIn: '1h' });
    //save in localstorage
  

    // Respond with the token
        res.json({ message: 'Login successful',token:token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//handle register
router.post('/register',async(req,res)=>{
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).send('Both username and password are required.');
    }

    //check if user already exists
    const existingUser = await auth.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'name already exists' });
      
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  

   //new user
   const user = new auth({
    name : req.body.name,
    password : hashedPassword
   })


   //save user in database
 user
   .save(user)
   .then(data => {
    res.send(data)
    res.redirect('/register');
   })
    
});
router.get('/register', (req,res)=>{
    res.render('register.ejs');
})

module.exports = router;