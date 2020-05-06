module.exports = {
  client: 'pg',
  pool: { min: 0, max: 1 },
  connection: process.env.DATABASE_URL || {
    host: 'localhost',
    user: 'postgres',
    database: 'knex_reproduction',
    password: 'toor'
  },
  migrations: {
    directory: ['./migrations']
  }
}
