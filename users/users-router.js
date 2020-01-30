const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

router.get('/', (req, res) => {
    Users.find()
      .then(users => {
          res.status(200).json(users);
      })
      .catch(error => {
        res.status(500).json(error);
      })
})

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.delete('/:id/delete', (req, res) => {
    const id = req.params.id

    Users.remove(id)
      .then(deleted => {
        if (deleted) {
          res.json({ removed: deleted });
        } else {
          res.status(404).json({ message: 'Could not find scheme with given id' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      })
})

module.exports = router;