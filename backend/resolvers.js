const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { GetCommand } = require('@aws-sdk/lib-dynamodb')

const resolvers = {
    Query: {
        getProduct: (_, args) => getProduct(args.name)
    }
}

const getProduct = async (name) => {
    try {
        const dynamoClient = new DynamoDBClient()
        const params = {
            Key: { id: name },
            TableName: process.env.PRODUCTS_TABLE
        }
        const response = await dynamoClient.send(new GetCommand(params))
        return response.Item
    }
    catch (error) {
        console.error('GET PRODUCT ERROR:', error.message)
    }
}

module.exports = { resolvers }