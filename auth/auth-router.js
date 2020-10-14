const router = require('express').Router()
const knex = require("knex")
const config = require("../knexfile")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authenticate = require("../auth/auth-middleware")

const {add, getAllUsers, findBy} = require("./auth-model")

router.get("/users", async (req,res,next) => {
    getAllUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(401).json({message: "invalid credentials"})
        })
})

router.post("/register", async (req,res,next) => {

    try {
        if(req.body){
            const {first_name, last_name, email, password} = req.body
            const user = {
                first_name, last_name,
                email,
                password: await bcrypt.hash(password, 6)
      }
      await add(user)
      res.status(201).json({message: `${email} added`})
        }
    } catch(err) {
        next(err)
    }
})

router.post('/login', (req, res) => {
    //Login user
    let { email, password } = req.body;
        findBy( email ).first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                delete user.password
                res.status(200).json({
                    id: user.id,
                    message: `Welome ${user.email}`,
                    token,
                });
            } else {
                res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        })
        .catch(({ message }) => {
            res.status(500).json({
                message
            });
        })
});
function generateToken(user) {
    //Header payload and verify signature
    const payload = {
        email: user.email,
        password:user.password
    };
    //Token expiration
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;