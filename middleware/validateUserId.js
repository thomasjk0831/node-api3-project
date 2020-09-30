const Users = require('../users/userDb')

module.exports = function (req,res,next){
    Users.getById(req.params.id)
    .then(user => {
        if(user) {
            req.user = user
            next()
        }
        else {
            res.status(404).json({message: "User not found"})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Error retrieving the user"
        })
    })
}

// module.exports = validateUserId 