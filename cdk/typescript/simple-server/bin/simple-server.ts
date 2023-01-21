#!/usr/bin/env node
import { App, Stack } from "aws-cdk-lib";
import { Instance, InstanceClass, InstanceSize, InstanceType, MachineImage, Vpc } from "aws-cdk-lib/aws-ec2";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";

const id = 'simple-server'

const app = new App();
const stack = new Stack(app, id, {
  env:  {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const role = new Role(stack, id + "-role", {
  assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
  managedPolicies: [ ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore') ],
})

const vpc = Vpc.fromLookup(stack, id + "-vpc", {
  isDefault: true,
});

const instance = new Instance(stack, id, {
  instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
  machineImage: MachineImage.latestAmazonLinux(),
  role,
  vpc,
});