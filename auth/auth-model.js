const db = require("../database/db-config")

module.exports = {
    add,
    getAllUsers,
    findBy
}

function add(user) {
    return db('users').insert(user)
}

function getAllUsers(){
    return db("users")
}

function findBy(filter) {
	return db("users")
		.select("id", "email", "password")
		.where(filter)
}