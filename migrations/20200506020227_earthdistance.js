exports.up = function (knex) {
  return knex.raw('CREATE EXTENSION cube; CREATE EXTENSION earthdistance;')
}

exports.down = function (knex) {
  return knex.raw('DROP EXTENSION earthdistance; DROP EXTENSION cube;')
}
