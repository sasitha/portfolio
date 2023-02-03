import { Stack, StackProps, } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from "aws-cdk-lib/pipelines";

import { PortfolioWebsiteAppStage } from './app-stage';

export interface PortfolioWebsitePipelineStackProps extends StackProps {
  repositoryName: string;
  branchName: string;
  domainName: string;
}

export class PortfolioWebsitePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PortfolioWebsitePipelineStackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, "PortfolioWebsitePipeline", {
      pipelineName: "PortfolioWebsitePipeline",
      selfMutation: true,
      dockerEnabledForSynth: true,
      dockerEnabledForSelfMutation: true,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection("sasitha/portfolio", 'master', {
          connectionArn: "arn:aws:codestar-connections:ap-southeast-1:806124867804:connection/aa3548ab-ef5c-4911-9c31-5ba81b8613d5"
        }),
        commands: [
          "yarn",
          "cd infra",
          "yarn ",
          "cd ..",
          "yarn build",
          "cd infra",
          "npx cdk synth"
        ],
        primaryOutputDirectory: "infra/cdk.out"
      })
    })

    // const pipeline = new CdkPipeline(this, `PortfolioWebsitePipeline`, {
    //   pipelineName: `PortfolioWebsitePipeline`,
    //   cloudAssemblyArtifact,
    //   sourceAction: new CodeCommitSourceAction({
    //     actionName: 'CodeCommit',
    //     branch: props.branchName,
    //     repository,
    //     output: sourceArtifact,
    //   }),
    //   synthAction: new SimpleSynthAction({
    //     sourceArtifact,
    //     cloudAssemblyArtifact,
    //     subdirectory: 'infra',
    //     synthCommand: 'cd infra && npx cdk synth',
    //     installCommands: ['cd ..', 'npm install', 'npm install --prefix infra'],
    //     buildCommands: [`npm run build`],
    //     environment: {
    //       privileged: true,
    //     },
    //   }),
    // });

    pipeline.addStage(
      new PortfolioWebsiteAppStage(this, `PortfolioWebsiteApp`, {
        env: props.env,
        domainName: props.domainName,
      })
    );
  }
}
