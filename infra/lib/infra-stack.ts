/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib';
import { PortfolioWebsite } from './construct/static-site';
import { Construct } from 'constructs'
export interface PortfolioWebsiteStackProps extends cdk.StackProps {
  domainName: string;
  certificateArn: string;
}

export class PortfolioWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PortfolioWebsiteStackProps) {
    super(scope, id, props);

    const portfolioWebsite = new PortfolioWebsite(this, 'PortfolioWebsite', {
      domainName: props.domainName,
      certificateArn: props.certificateArn,
    });

    // Export the bucket name for use in other stacks or external systems
    this.exportValue(props.domainName, {
      name: 'PortfolioWebsiteBucketName',
    });
  }
}
