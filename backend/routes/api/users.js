require('dotenv').config();
const express = require('express');
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../../models/User');

router.get('/test', (req, res) => {
    res.json({msg: 'Users endpoint working peachily'})
})

router.post('/register', function(req,res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({email: 'Email already exists'})
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            // when app is assembled, delete this
                            .then(user => res.status(207).json(user))
                            .catch(err => console.error(err))
                    })
                })
            }
        })
})

module.exports = router