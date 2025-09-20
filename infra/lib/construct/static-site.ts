/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cm from 'aws-cdk-lib/aws-certificatemanager';
import * as r53 from 'aws-cdk-lib/aws-route53';
import * as cfnt from 'aws-cdk-lib/aws-route53-targets';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

import {Construct} from 'constructs'

export interface PortfolioWebsiteProps {
    domainName: string;
    certificateArn: string;
}

export class PortfolioWebsite extends Construct {
    constructor(parent: Construct, name: string, props: PortfolioWebsiteProps) {
        super(parent, name);

        const siteDomain = `${props.domainName}`;
        const hostedZone = r53.HostedZone.fromLookup(this, 'PortfolioWebsiteHostedZone', {
            domainName: props.domainName,
        });

        const certificate = cm.Certificate.fromCertificateArn(this, "PortfolioWebsiteCertificate", props.certificateArn)
        const siteBucket = new s3.Bucket(this, 'PortfolioWebsiteBucket', {
            bucketName: siteDomain,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        const staticAssetsCachePolicy = new cloudfront.CachePolicy(this, 'StaticAssetsCachePolicy', {
            cachePolicyName: 'StaticAssetsPolicy',
            comment: 'Cache policy for static assets (JS, CSS, fonts)',
            defaultTtl: cdk.Duration.days(365),
            maxTtl: cdk.Duration.days(365),
            minTtl: cdk.Duration.days(365),
            headerBehavior: cloudfront.CacheHeaderBehavior.none(),
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
            cookieBehavior: cloudfront.CacheCookieBehavior.none(),
        });

        const htmlCachePolicy = new cloudfront.CachePolicy(this, 'HtmlCachePolicy', {
            cachePolicyName: 'HtmlPolicy',
            comment: 'Cache policy for HTML files',
            defaultTtl: cdk.Duration.hours(1),
            maxTtl: cdk.Duration.days(1),
            minTtl: cdk.Duration.seconds(0),
            headerBehavior: cloudfront.CacheHeaderBehavior.none(),
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
            cookieBehavior: cloudfront.CacheCookieBehavior.none(),
        });

        const distribution = new cloudfront.Distribution(this, 'PortfolioWebsiteDistribution', {
            defaultBehavior: {
                origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
                cachePolicy: htmlCachePolicy,
                compress: true,
            },
            additionalBehaviors: {
                '/_astro/*': {
                    origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
                    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    cachePolicy: staticAssetsCachePolicy
                }
            },
            domainNames: [siteDomain],
            certificate: certificate,
            errorResponses: [
                {
                    httpStatus: 400,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: cdk.Duration.seconds(0),
                },
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: cdk.Duration.seconds(0),
                },
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                    ttl: cdk.Duration.seconds(0),
                }
            ]
        })

        new r53.ARecord(this, `PortfolioWebsiteARecord`, {
            zone: hostedZone,
            recordName: siteDomain,
            target: r53.RecordTarget.fromAlias(new cfnt.CloudFrontTarget(distribution)),
        });
    }
}
