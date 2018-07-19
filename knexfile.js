// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/blogdb.sqlite3'
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
    seeds: { directory: './database/seeds' },
  },


  production: {
    client: 'mysql',
    connection: {
      host: 'localhost', //update this
      database: 'blogdb', // if you want to use a different database change this name
      user:     'leela', // update this with the user you use to connect to MySQL
      password: 'password' // update this with the password of the user you use to connect to MySQL
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './database/seeds' }, 
  },
};
