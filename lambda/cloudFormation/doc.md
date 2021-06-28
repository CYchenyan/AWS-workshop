### deployment command

```
aws cloudformation create-stack \
--stack-name rabit-lambda-deploy \
--template-body file://config.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--profile beach \
--region ap-southeast-2

```