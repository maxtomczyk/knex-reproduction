exports.up = function (knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments()
    t.string('uuid').notNullable().unique()
    t.unique('id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
