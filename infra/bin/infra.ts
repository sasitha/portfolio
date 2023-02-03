#!/usr/bin/env node
/* eslint-disable no-new */
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PortfolioWebsitePipelineStack } from '../lib/pipeline-stack';

const env: cdk.Environment = { account: '806124867804', region: 'ap-southeast-1' };

const app = new cdk.App();
new PortfolioWebsitePipelineStack(app, 'PortfolioWebsite', {
  env,
  repositoryName: 'portfolio-sasitha',
  branchName: 'master',
  domainName: 'sasitha.me',
});
