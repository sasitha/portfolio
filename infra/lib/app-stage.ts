import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs'
import { PortfolioWebsiteStack } from './infra-stack';

export interface PortfolioWebsiteAppStageProps extends StageProps {
  domainName: string;
}
export class PortfolioWebsiteAppStage extends Stage {
  constructor(scope: Construct, id: string, props: PortfolioWebsiteAppStageProps) {
    super(scope, id, props);

    // eslint-disable-next-line no-new
    new PortfolioWebsiteStack(this, `PortfolioWebsiteStack`, {
      domainName: props.domainName,
      env: props.env,
    });
  }
}
