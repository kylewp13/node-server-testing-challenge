const db = require('../data/dbConfig');

module.exports = {
  find,
  add,
  findById,
  remove
};

function find() {
    return db('users')
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ user_id: id })
    .first();
}

function remove(id) {
    return db('users')
        .where({ user_id: id })
        .del();
};