import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class OcadoBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const productsTable = new Table(this, 'ProductsTable', {
      partitionKey: {
        name: 'name',
        type: AttributeType.STRING
      }
    })

    const graphqlLambda = new Function(this, 'graphqlLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.graphqlHandler',
      code: Code.fromAsset('../backend'),
      environment: {
        PRODUCTS_TABLE: productsTable.tableName
      }
    })
    const lambdaUrl = graphqlLambda.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })

    new CfnOutput(this, 'FunctionUrl ', { value: lambdaUrl.url });

    productsTable.grantReadData(graphqlLambda)
  }
}
