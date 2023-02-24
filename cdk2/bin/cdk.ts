#!/usr/bin/env node
import 'source-map-support/register';
import { OcadoBackendStack } from '../lib/backend';
import { App } from 'aws-cdk-lib';
import { OcadoFrontendStack } from '../lib/frontend';

const app = new App();
new OcadoBackendStack(app, 'OcadoBackendStack', {});
new OcadoFrontendStack(app, 'OcadoFrontendStack', {})