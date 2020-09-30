const Posts = require('../posts/postDb')

function validatePost(req,res,next){
   if(!req.body){
       res.status(400).json({ message: "missing user data" })
   }
   else if (!req.body.text){
       res.status(400).json({ message: "missing required text field" })
   }
   else{
       next()
   }
}

module.exports = validatePost