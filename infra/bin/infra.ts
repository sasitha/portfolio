#!/usr/bin/env node
/* eslint-disable no-new */
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PortfolioWebsitePipelineStack } from '../lib/pipeline-stack';
import { PortfolioWebsiteStack } from '../lib/infra-stack';

const env: cdk.Environment = { account: '806124867804', region: 'ap-southeast-1' };

const app = new cdk.App();
// new PortfolioWebsitePipelineStack(app, 'PortfolioWebsite', {
//   env,
//   repositoryName: 'portfolio-sasitha',
//   branchName: 'master',
//   domainName: 'sasitha.xyz',
// });


new PortfolioWebsiteStack(app, 'Portfolio', {
  env,
  domainName: 'sasitha.xyz'
})