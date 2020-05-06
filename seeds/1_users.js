const SequentialUUID = require('sequential-uuid')
const uuid = new SequentialUUID()

const usersTable = []

for (let i = 0; i < 25000; i++) {
  const user = {
    uuid: uuid.generate()
  }
  usersTable.push(user)
}

exports.seed = function (knex) {
  return knex.raw('TRUNCATE TABLE users CASCADE').then(() => {
    return knex.batchInsert('users', usersTable, 2000)
  })
}
