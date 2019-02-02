/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Upload: UploadScalar,
    Date: DateScalar,

    Query: {
      viewer(parent, args, { token }) {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        // const user = jwt.decode(token);
        // console.log(jwt.decode(token, app.get('JWT_SECRET')));
        if (token) {
          return jwt.decode(token, app.get('JWT_SECRET'));
        } else {
          return null;
        }
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
        // query {
        //   user (id: 1){
        //     fullname
        //     email
        //     bio
        //   }
        // }
      },
      async items(parent, { filter }, { pgResource }, info) {
        // second parameter is id since we need it for the filter
        // @TODO: Replace this mock return statement with the correct items from Postgres
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
      },
      async tags(parent, args, { pgResource }, info) {
        // @TODO: Replace this mock return statement with the correct tags from Postgres
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
      }
    },

    User: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The User GraphQL type has two fields that are not present in the
       *  user table in Postgres: items and borrowed.
       *
       *  According to our GraphQL schema, these fields should return a list of
       *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
       *
       */
      // @TODO: Uncomment these lines after you define the User type with these fields

      // args can be replaced with _ (underscore)
      // user parameter is the same as parent, aka User: {},
      async items(user, args, { pgResource }) {
        //   // @TODO: Replace this mock return statement with the correct items from Postgres
        try {
          const userItems = await pgResource.getItemsForUser(user.id);
          return userItems;
        } catch (e) {
          throw new ApolloError(e);
        }
        //   // -------------------------------
      },
      async borrowed(user, args, { pgResource }) {
        //   // @TODO: Replace this mock return statement with the correct items from Postgres
        try {
          const borrowedItems = await pgResource.getBorrowedItemsForUser(
            user.id
          );
          return borrowedItems;
        } catch (e) {
          throw new ApolloError(e);
        }
        //   // -------------------------------
      }
      // -------------------------------
    },

    Item: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The Item GraphQL type has two fields that are not present in the
       *  Items table in Postgres: itemowner, tags and borrower.
       *
       * According to our GraphQL schema, the itemowner and borrower should return
       * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
       *
       */
      // @TODO: Uncomment these lines after you define the Item type with these fields
      async itemowner(item, args, { pgResource }) {
        // @TODO: Replace this mock return statement with the correct user from Postgres

        // console.log(items);
        // the console.log will appear in the terminal
        // -------------------------
        // query {
        //   items{
        //     itemowner{
        //       fullname
        //     }
        //   }
        // }
        try {
          const itemOwner = await pgResource.getUserById(item.ownerid);
          return itemOwner;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(item, args, { pgResource }) {
        // @TODO: Replace this mock return statement with the correct tags for the queried Item from Postgres
        // return []
        // -------------------------------
        try {
          const itemTags = await pgResource.getTagsForItem(item.id);
          return itemTags;
        } catch (e) {
          throw new ApolloError(e);
        }
        /* If there are no errors and a value is NULL and there are values in the db, double check the names of the columns. 
        - If the names of the columns do not match, check the pg-resource and the queries. Will have to use AS to make it match. */

        // query {
        //   items {
        //     tags {
        //       id
        //       title
        //     }
        //   }
        // }
      },
      async borrower(item, args, { pgResource }) {
        //   /**
        //    * @TODO: Replace this mock return statement with the correct user from Postgres
        //    * or null in the case where the item has not been borrowed.
        //    */
        try {
          const itemBorrower = await pgResource.getUserById(item.borrowerid);
          return itemBorrower;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
        // query {
        //   items{
        //     borrower{
        //       fullname
        //     }
        //   }
        // }
        // ------ null is alright for the borrowerid since it is already in there
      }
      /* async imageurl({ imageurl, imageid, mimetype, data }) {
        if (imageurl) return imageurl;
        if (imageid) {
          return `data:${mimetype};base64, ${data}`;
        }
      } */
      // -------------------------------
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      ...authMutations(app),
      // -------------------------------

      async addItem(parent, args, { pgResource, token }, info) {
        // token is part of authentication
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        // const image = await image;
        const user = await jwt.decode(token, app.get('JWT_SECRET'));

        // const user = { id: 5 };
        const newItem = await pgResource.saveNewItem({
          item: args.item,
          // image: args.image,
          user
        });
        return newItem;
      }
    }
  };
};
