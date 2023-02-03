/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib';
import { PortfolioWebsite } from './construct/static-site';
import { Construct } from 'constructs'
export interface PortfolioWebsiteStackProps extends cdk.StackProps {
  domainName: string;
}

export class PortfolioWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PortfolioWebsiteStackProps) {
    super(scope, id, props);

    new PortfolioWebsite(this, 'PortfolioWebsite', {
      domainName: props.domainName,
    });
  }
}
