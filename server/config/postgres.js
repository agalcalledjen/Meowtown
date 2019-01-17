const { Pool } = require('pg');

module.exports = app => {
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */

  app.get('PG_HOST');
  app.get('PG_USERNAME');
  app.get('PG_PASSWORD');
  app.get('PG_DB');

  return new Pool({
    /**
     *  @TODO: Supply the correct configuration values to connect to postgres
     */
    host: app.get('PG_HOST'),
    username: app.get('PG_USERNAME'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
