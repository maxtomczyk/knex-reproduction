# Installation
1. Create test database and configure knexfile to allow knex to connect to your database
2. Run following commands
```
npm i
npx knex migrate:latest
npx knex seed:run
```

# Run
Just run
```
node index.js
```