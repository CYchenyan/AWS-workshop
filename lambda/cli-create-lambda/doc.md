## command steps

### Creat role
```
aws iam create-role --role-name rabit-role \
--assume-role-policy-document file://trust-policy.json \
--profile beach
```

### 1. Create a deployment package

 ```
 zip function.zip index.js
 ```

### 2. Create a Lambda function with the create-function command

#### create
```
aws lambda create-function --function-name rabit-cli-function \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs14.x \
--role arn:aws:iam::160071257600:role/rabit-role
```
#### update
```
aws lambda update-function-code \
--function-name rabit-cli-function \
--zip-file fileb://function.zip \
--profile beach \
--region ap-southeast-2
```