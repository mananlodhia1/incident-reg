import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3deployment from "aws-cdk-lib/aws-s3-deployment";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      env: {
        account: "676206936700",
        region: "ap-southeast-2",
      },
    });

      // Generate an SSH Key Pair
      const keyPair = new ec2.CfnKeyPair(this, 'keyPair', {
        keyName: 'my-ec2-keypair',
      });

    const vpc = ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true,
    });

    // Security Group for EC2 Instance
    const securityGroup = new ec2.SecurityGroup(this, "InstanceSG", {
      vpc,
      description: "Allow traffic to backend API",
      allowAllOutbound: true,
    });

    // Allow inbound SSH traffic on port 22
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH traffic from anywhere'
    );

  
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(5001),
      "Allow HTTP traffic on port 5001"
    );

    // Create a new EC2 instance with an Ubuntu machine image
    const ec2Instance = new ec2.Instance(this, "incident-eC2", {
      instanceType: new ec2.InstanceType("t2.micro"),
      machineImage: ec2.MachineImage.genericLinux({
        'ap-southeast-2': 'ami-0b5f6fff50005beae', 
      }),
      vpc: vpc,
      securityGroup: securityGroup,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, 
      },
      associatePublicIpAddress: true,  // Enable public IP assignment
      keyName: keyPair.keyName, 
      blockDevices: [
        {
          deviceName: '/dev/xvda',  // Default root device name
          volume: ec2.BlockDeviceVolume.ebs(30),  // Set the volume size to 30 GB
        },
      ],
    });

    // Create an S3 bucket for app deployment
    const s3Bucket = new s3.Bucket(this, "AppBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const backendZipPath = path.join(__dirname, '../backend.zip');

    // Deploy app files to the S3 bucket
    new s3deployment.BucketDeployment(this, "DeployApp", {
      sources: [
        s3deployment.Source.asset(
          backendZipPath
        ),
      ],
      destinationBucket: s3Bucket,
      prune: true,
    });

    // Grant EC2 permissions to read S3 bucket
    s3Bucket.grantRead(ec2Instance.role);

    // Attach IAM role to the EC2 instance to give it access to S3
    ec2Instance.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess")
    );
  }
}
