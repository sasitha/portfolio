/* eslint-disable no-new */
import { RemovalPolicy } from 'aws-cdk-lib';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Certificate, DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs'
export interface PortfolioWebsiteProps {
  domainName: string;
}

export class PortfolioWebsite extends Construct {
  constructor(parent: Construct, name: string, props: PortfolioWebsiteProps) {
    super(parent, name);

    const siteDomain = `${props.domainName}`;
    const hostedZone = HostedZone.fromLookup(this, 'PortfolioWebsiteHostedZone', {
      domainName: props.domainName,
    });
    // const certificate = new DnsValidatedCertificate(this, 'PortfolioWebsiteCertificate', {
    //   hostedZone,
    //   domainName: siteDomain,
    //   region: 'us-east-1', // Cloudfront only checks this region for certificates.
    // });
    const certificate = Certificate.fromCertificateArn(this, "PortfolioWebsiteCertificate", "arn:aws:acm:us-east-1:806124867804:certificate/506a28c7-47ea-4c08-96b2-4f2cbf34d003")
    const siteBucket = new Bucket(this, 'PortfolioWebsiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'Identity', {
      comment: 'PortfolioWebsiteOriginAccessIdentity',
    });

    const distribution = new CloudFrontWebDistribution(this, 'PortfolioWebsiteDistribution', {
      viewerCertificate: {
        aliases: [siteDomain],
        props: {
          acmCertificateArn: certificate.certificateArn,
          sslSupportMethod: 'sni-only',
        },
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket,
            originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 400,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new ARecord(this, `PortfolioWebsiteARecord`, {
      zone: hostedZone,
      recordName: siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset('../out')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
