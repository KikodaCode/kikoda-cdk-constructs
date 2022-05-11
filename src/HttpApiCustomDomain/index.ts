import { DomainName } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayv2DomainProperties } from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

export interface HttpApiCustomDomainProps {
  /** The base domain name to host the site under ex. example.com; This should
   * be an existing Route 53 hosted zone.
   */
  readonly hostedZone: IHostedZone;

  /** Any subdomain to prepend to the base domain */
  readonly subDomain: string;
}

export class HttpApiCustomDomain extends Construct {
  /** Represents the underlying DomainName construct that is created */
  public domainName: DomainName;

  constructor(scope: Construct, id: string, props: HttpApiCustomDomainProps) {
    super(scope, id);

    const { hostedZone, subDomain } = props;
    const fqdn = `${subDomain}.${hostedZone.zoneName}`;

    this.domainName = new DomainName(this, 'Domain', {
      domainName: fqdn,
      certificate: new Certificate(this, 'ApiCert', {
        domainName: fqdn,
        validation: CertificateValidation.fromDns(hostedZone),
      }),
    });

    new ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      recordName: subDomain,
      target: RecordTarget.fromAlias(
        new ApiGatewayv2DomainProperties(
          this.domainName.regionalDomainName,
          this.domainName.regionalHostedZoneId,
        ),
      ),
    });
  }
}
