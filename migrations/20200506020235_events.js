exports.up = function (knex) {
  return knex.schema.createTable('events', function (t) {
    t.increments()
    t.uuid('uuid').notNullable().unique()
    t.string('title', 64).notNullable()
    t.string('description', 1000)
    t.text('photo_url')
    t.integer('visibility').notNullable()
    t.boolean('require_confirmation').defaultTo(true)
    t.integer('type').notNullable()
    t.integer('owner_id').references('users.id').onUpdate('cascade').onDelete('cascade').notNullable()
    t.timestamp('date').notNullable()
    t.specificType('location', 'earth').notNullable()
    t.specificType('age_restriction', 'int4range').defaultTo('(18,150)')
    t.unique('id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('events')
}
