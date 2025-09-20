import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

const githubIssureUrl = "token.actions.githubusercontent.com";
const gitHubThumbprint = '74f3a68f16524f15424927704c9506f55a9316bd';


export interface SupportStackProps extends StackProps {
  readonly repositoryName: string;
  readonly domainName: string;
  readonly distributionId: string;
}

export class SupportStack extends Stack {
  constructor(scope: Construct, id: string, props: SupportStackProps) {
    super(scope, id, props);

    const gitHubOidcProvider = new cdk.aws_iam.OpenIdConnectProvider(this, 'GitHubOidcProvider', {
      url: `https://${githubIssureUrl}`,
      clientIds: ['sts.amazonaws.com'],
      thumbprints: [gitHubThumbprint],
    });

    const gitHubOidcRole = new cdk.aws_iam.Role(this, 'GitHubOidcRole', {
      roleName: 'GitHubOidcRole',
      assumedBy: new cdk.aws_iam.OpenIdConnectPrincipal(gitHubOidcProvider, {
        'ForAnyValue:StringLike': {
            [`${githubIssureUrl}:sub`]: `repo:${props.repositoryName}:*`
        },
        'StringEquals': { [`${githubIssureUrl}:aud`]: 'sts.amazonaws.com' },
      }),
    });

    const webAppDeployPolicy = new iam.Policy(this, 'WebAppDeployPolicy', {
        statements: [
            new iam.PolicyStatement({
                actions: ['s3:*'],
                resources: [`arn:aws:s3:::${props.domainName}`, `arn:aws:s3:::${props.domainName}/*`],
            }),
            new iam.PolicyStatement({
                actions: [
                    "cloudfront:CreateInvalidation",
                    "cloudfront:GetInvalidation",
                    "cloudfront:ListInvalidations"
                ],
                resources: [`arn:aws:cloudfront::${props.env?.account}:distribution/${props.distributionId}`],
            }),
        ],
    });

    gitHubOidcRole.attachInlinePolicy(webAppDeployPolicy);

    this.exportValue(gitHubOidcRole.roleArn, {
      name: 'GitHubOidcRoleArn',
    });

  }


  
}