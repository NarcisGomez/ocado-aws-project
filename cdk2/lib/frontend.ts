import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { CloudFrontWebDistribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class OcadoFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const frontendBucket = new Bucket(this, "frontendBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: [HttpMethods.GET],
          allowedHeaders: ["*"],
        },
      ],
    })

    const oai = new OriginAccessIdentity(this, "FrontendOAI", {
      comment: `Frontend access origin identity`,
    })

    const distribution = new CloudFrontWebDistribution(this, "CloudFront", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: frontendBucket,
            originAccessIdentity: oai,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: "/index.html",
        },
        {
          errorCode: 400,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: "/index.html",
        },
      ],
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });

    new BucketDeployment(this, 'DeployFrontend', {
      sources: [Source.asset('../frontend/build')],
      destinationBucket: frontendBucket,
    })

    new CfnOutput(this, 'DistributionOutput', {
      exportName: 'DISTRIBUTION-ID',
      value: distribution.distributionId
    })

    frontendBucket.grantRead(oai)
  }
}
