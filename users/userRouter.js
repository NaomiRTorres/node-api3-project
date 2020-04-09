const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user'
    });
  });
});

router.post('/:id/posts', (req, res) => {
  //do your magic!
  Posts.insert({...req.body, user_id: req.params.id})
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post'
    });
  });
});

router.get('/', validateUser, (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(users => {
    
    res.status(200).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users'
    });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user'
    });
  });
});

router.get('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error getting the posts for the user'
    });
  });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The user has been nuked successfully' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user'
    });
  });
});

router.put('/:id', (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    };
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user'
    });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return (
    Users.getById(req.params.id)
    .then(user => {
      if(user) {
        next();
      } else {
        res.status(404).json({ message: 'Can not validate user id' });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error validating the user id'
      });
    }));     
};

function validateUser(req, res, next) {
  // do your magic!
  return (
    Users.get(req.params)
    .then(user => {
      if(user) {
        next();
      } else {
        res.status(404).json({ message: 'Can not validate user' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error validating the user'
      });
    }));
};

function validatePost(req, res, next) {
  // do your magic!
  return (
    Users.get(req.params.id)
    .then(post => {
      if(post) {
        next();
      } else {
        res.status(404).json({ message: 'Can not validate post' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error validating the post'
      });
    }));
};

module.exports = router;
