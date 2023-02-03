import { Stack, StackProps, } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { CdkPipeline, SimpleSynthAction } from 'aws-cdk-lib/pipelines';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodeCommitSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';

import { PortfolioWebsiteAppStage } from './app-stage';

export interface PortfolioWebsitePipelineStackProps extends StackProps {
  repositoryName: string;
  branchName: string;
  domainName: string;
}

export class PortfolioWebsitePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PortfolioWebsitePipelineStackProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();

    const repository = Repository.fromRepositoryName(
      this,
      'PortfolioWebsiteRepository',
      props.repositoryName
    );

    const pipeline = new CdkPipeline(this, `PortfolioWebsitePipeline`, {
      pipelineName: `PortfolioWebsitePipeline`,
      cloudAssemblyArtifact,
      sourceAction: new CodeCommitSourceAction({
        actionName: 'CodeCommit',
        branch: props.branchName,
        repository,
        output: sourceArtifact,
      }),
      synthAction: new SimpleSynthAction({
        sourceArtifact,
        cloudAssemblyArtifact,
        subdirectory: 'infra',
        synthCommand: 'cd infra && npx cdk synth',
        installCommands: ['cd ..', 'npm install', 'npm install --prefix infra'],
        buildCommands: [`npm run build`],
        environment: {
          privileged: true,
        },
      }),
    });

    pipeline.addApplicationStage(
      new PortfolioWebsiteAppStage(this, `PortfolioWebsiteApp`, {
        env: props.env,
        domainName: props.domainName,
      })
    );
  }
}
