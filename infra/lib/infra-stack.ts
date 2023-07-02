/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib';
import { PortfolioWebsite } from './construct/static-site';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam';
export interface PortfolioWebsiteStackProps extends cdk.StackProps {
  domainName: string;
}

export class PortfolioWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PortfolioWebsiteStackProps) {
    super(scope, id, props);

    new PortfolioWebsite(this, 'PortfolioWebsite', {
      domainName: props.domainName,
    });

    const emailReceivingBucket = new Bucket(this, `mailBucket`, {
      bucketName: `mail.${props.domainName}`
    });

    emailReceivingBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:PutObject"],
        principals: [new iam.ServicePrincipal("ses.amazonaws.com")],
        resources: [`${emailReceivingBucket.bucketArn}/*`]
      })
    )
  }
}
