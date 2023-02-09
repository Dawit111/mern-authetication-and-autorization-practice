const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/ userModel')

//@desc Register new user
//@route POST/api/users/
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error(' Please dont leave fields empty')
    }

    //check if the user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash or encrypting the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create the User
    const userCreated = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(userCreated) {
        res.status(200).json({
            _id: userCreated.id,
            name: userCreated.name,
            email: userCreated.email,
            token: generateToken(userCreated._id)
        })
    } else {
        res.status(400)
        throw new Error('User not created')
    }
})

//@desc Authenticate a user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //Checking the user email
    const userToLogin = await User.findOne({email})
    
    if(userToLogin && (await bcrypt.compare(password, userToLogin.password))) {
        res.status(200).json({
            _id: userToLogin.id,
            name: userToLogin.name,
            email: userToLogin.email,
            token: generateToken(userToLogin._id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get user data
//@route GET/api/users/me
//@access private(protected route)
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//Generate JWT tokens
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',
        

    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}