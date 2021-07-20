#!/bin/bash

aws cloudformation create-stack \
--stack-name cy-deploy \
--template-body file://cloudformation.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--profile beach \
--region ap-southeast-2