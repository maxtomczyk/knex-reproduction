exports.up = function (knex) {
  return knex.schema.createTable('events_participants', function (t) {
    t.integer('users_id').references('users.id').onUpdate('cascade').onDelete('cascade').notNullable()
    t.integer('events_id').references('events.id').onUpdate('cascade').onDelete('cascade').notNullable()
    t.primary(['users_id', 'events_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('events_participants')
}
