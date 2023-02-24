const { gql } = require("apollo-server-lambda")

const typeDefs = gql`
type Query {
    getProduct(name: String!) : Product
}

type Product {
    name: String!
    price: String!
}
`

module.exports = { typeDefs }