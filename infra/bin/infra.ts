#!/usr/bin/env node
/* eslint-disable no-new */
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PortfolioWebsiteStack } from '../lib/infra-stack';
import { SupportStack } from '../lib/support-stack';

const env: cdk.Environment = { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION };

const app = new cdk.App();

// Get configuration from environment variables with fallbacks
const domainName = process.env.DOMAIN_NAME ;
const certificateArn = process.env.CERTIFICATE_ARN;
const repositoryName = process.env.REPOSITORY_NAME;
const distributionId = process.env.DISTRIBUTION_ID;

new PortfolioWebsiteStack(app, 'PortfolioWebsite', {
  stackName: 'PortfolioWebsite',
  env,
  domainName,
  certificateArn,
});

new SupportStack(app, 'SupportStack', {
  stackName: 'SupportStack',
  env,
  repositoryName,
  domainName,
  distributionId,
});
