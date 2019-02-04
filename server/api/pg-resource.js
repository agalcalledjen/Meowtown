const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;

  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name AS fullname, bio, email',
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_name_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text:
          'SELECT id, name AS fullname, password, email, bio FROM users WHERE email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text:
          'SELECT id, email, name AS fullname, bio FROM users WHERE id = $1',
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        if (e.statusCode === 500) throw 'User was not found.';
      }
    },
    async getItems(idToOmit) {
      const items = await postgres.query({
        text: `SELECT * FROM items ${idToOmit ? 'WHERE ownerid != $1' : ''}`,

        values: idToOmit ? [idToOmit] : []
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE ownerid = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE borrowerid = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      const tags = await postgres.query({
        text: 'SELECT id, name AS title FROM tags'
      });
      return tags.rows;
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT id, name AS title FROM tags WHERE id IN (SELECT tagid FROM itemtags WHERE itemid = $1) `,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },

    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', async err => {
              // Convert image (file stream) to Base64
              /* const imageStream = image.stream.pipe(strs('base64'));

              let base64Str = '';
              imageStream.on('data', data => {
                base64Str += data;
              });

              imageStream.on('end', async () => { */
              // Image has been converted, begin saving things
              const { title, description, tags } = item;

              // Generate new Item query
              // @TODO
              const newItemQuery = {
                text:
                  'INSERT INTO items(title, description, ownerid) VALUES($1, $2, $3) RETURNING *',

                values: [title, description, user.id]
              };

              // Insert new Item
              const insertNewItem = await postgres.query(newItemQuery);

              /* const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    // itemid,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                }; */

              // Upload image
              /*  const uploadedImage = await client.query(imageUploadQuery);
                const imageid = uploadedImage.rows[0].id; */

              // Generate image relation query
              // @TODO
              /* const imageRelationQuery = {
                  text:
                    'INSERT INTO items(title, description, tags) VALUES($1, $2, $3)',
                  values: [title, description, tags]
                }; */
              // -------------------------------

              // Insert image
              // @TODO
              /* const insertImage = await postgres.query(
                  imageRelationshipsQuery
                ); */
              // -------------------------------

              // Generate tag relationships query
              const tagRelationshipsQuery = {
                text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString(
                  [...tags],
                  insertNewItem.rows[0].id,
                  ''
                )}`,

                values: tags.map(tag => parseInt(tag.id))
              };

              // Insert tags
              const insertTags = await postgres.query(tagRelationshipsQuery);

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();

                resolve(insertNewItem.rows[0]);
              });
            });
            // });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
