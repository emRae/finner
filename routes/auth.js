const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
   else
     return res.json({ })
}

router.post('/signup', (req, res) => {
  let { email, password } = req.body;
  User.register(new User({username: email}), password, (err, user) => {
    if (err)
      return res.status(500).json(err);
    // get values from req.body
    // user.thing = req.body.thing
    user.weight = req.body.weight,
    user.age = req.body.age,
    user.height = req.body.height,
    user.sex = req.body.sex
    user.bmr = req.body.bmr
    user.save( (err, user) => {
      if (err)
        return res.status(500).json(err);
      return res.json(user)
    });
  });
});

// udate the user with info and goals in the server database
router.put('/about-diet', (req, res) => {
  console.log("got to the about diet route");
  console.log(req.body.userId);
  let { goals, restrictions, activityLevel, bmr, userId } = req.body;
  User.findByIdAndUpdate(
    userId,
    { $set: { goals, restrictions, activityLevel, bmr} },
    { new: true },
    (err, user) => {
      res.json(user);
  });
});

router.post('/signin', (req, res) => {
 let { email, password } = req.body
 User.findOne({ username: req.body.email}, (err, user) => {
   if (!user)
     return res.status(500).json({ message: 'Invalid Username Or Password' });
   user.authenticate(req.body.password, (err, user, passwordErr) => {
     if (err)
       return res.status(500).json({ message: 'Invalid Username Or Password' });
     if (passwordErr)
       return res.status(500).json({ message: 'Invalid Username Or Password' });

     req.logIn(user, (err) => {
       return res.json(user);
     })
   });
  });
});

router.get('/user', isAuthenticated, (req,res) => {
  return res.json(req.user)
});

router.delete('/sign_out', (req, res) => {
  req.logout();
  res.status(200).json({});
});


module.exports = router;
