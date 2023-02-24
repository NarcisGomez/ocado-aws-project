import { gql } from '@apollo/client'

export const getProductQuery = gql`
query GetProduct($name: String!){
  getProduct(name: $name) {
    name
    price
  }
}
`