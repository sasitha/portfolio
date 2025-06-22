#!/usr/bin/env node
/* eslint-disable no-new */
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PortfolioWebsiteStack } from '../lib/infra-stack';
import { SupportStack } from '../lib/support-stack';

const env: cdk.Environment = { account: '806124867804', region: 'ap-southeast-2' };

const app = new cdk.App();

// Get configuration from environment variables with fallbacks
const domainName = process.env.DOMAIN_NAME || 'sasitha.me';
const certificateArn = process.env.CERTIFICATE_ARN || 'arn:aws:acm:us-east-1:806124867804:certificate/17137d52-99d2-436b-b3e5-d37b44237932';
const repositoryName = process.env.REPOSITORY_NAME || 'sasitha/portfolio';
const distributionId = process.env.DISTRIBUTION_ID || 'E25DX41A0N7AAY';

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
