const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  enum Role {
    VIEWER
  }

  directive @auth(requires: Role = VIEWER) on OBJECT | FIELD_DEFINITION

  type Item @auth(requires: VIEWER) {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: Date
    borrower: User
  }

  type User @auth(requires: VIEWER) {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File @auth(requires: VIEWER) {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
  }

  input SignupInput {
    fullname: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(
      item: NewItemInput! # image: Upload!
    ): Item
    signup(user: SignupInput!): ID!
    login(user: LoginInput!): ID!
    logout: Boolean!
  }
`;
