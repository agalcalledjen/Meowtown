const { Pool } = require('pg');

module.exports = app => {
  app.get('PG_HOST');
  app.get('PG_USERNAME');
  app.get('PG_PASSWORD');
  app.get('PG_DB');

  return new Pool({
    host: app.get('PG_HOST'),
    username: app.get('PG_USERNAME'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
