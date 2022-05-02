const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const Users = (()=>{
  const checkRegister=async (req,res) =>{
    const { username,email,password } = req.body;
    try{
      let user = await User.findOne({ username });
      
      if (user) {
        return res.json({ userError: 'User already exist! Please try another.',emailError:'', passError:'' });
      }
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if ( !re.test(email) ) {
        return res.json({ userError: '',emailError:'Please enter email format!!', passError:'' });
      }
      if (password.length<6) {
        return res.json({ userError:'',emailError:'',passError: 'Please enter a password with 6 or more characters' });
      }
       return res.json({userError:'',emailError:'',passError: ''});
    }
    catch{
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    const { username, email, password } = req.body;
    const avatar_img="";
    try {
      let user = await User.findOne({ username });
  
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
  
      user = new User({
        username,
        email,
        password,
        avatar_img,
      });
  
      const salt = await bcrypt.genSalt(10);
  
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  return {
    Check: checkRegister,
    Register: registerUser
  }
})();
module.exports = Users;
