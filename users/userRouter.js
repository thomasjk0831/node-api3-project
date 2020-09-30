const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const validateUserId  = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(resource=>{
    res.status(201).json(resource)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({
      message : "Error adding"
    })
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
  req.body["user_id"] = req.params.id
  console.log(req.params.id)
  Posts.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({
      message : "Error adding"
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
   .then(users => {
     res.status(200).json(users)
   })
   .catch(error=> {
     console.log(error)
     res.status(500).json({message: "error retrieving users"})
   })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Posts.getById(req.user.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message: "error retrieving post"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.user.id)
  .then(count => {
      res.status(200).json({message: "Successfully removed"})
  })
  .catch(error=>{
    res.status(500).json({message: "Server Error in removing"})
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.user.id, req.body)
  .then(count=>{
    if(count === 1){
      res.status(200).json({message: "User was updated"})
    }
    else{
      res.status(404).json({message: "User was not updated"})
    }
  })
  .catch(error=>{
    res.status(500).json({message: "Server Error in updating"})
  })
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
