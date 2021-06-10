## KMS 是什么服务？能解决什么问题？
托管式服务，Secrets Manager 允许您将代码中的硬编码凭证（包括密码）替换为对 Secrets Manager 的 API 调用，以便以编程方式检索密钥
## 使用 KMS key 的方式有哪些？

## 可以对 KMS key 进行哪些操作？

***

## CLI 练习
### 1.创建对称加密的 KMS key
```
aws kms create-key --profile beach --region ap-southeast-2

```
**response:**

```
{
    "KeyMetadata": {
        "AWSAccountId": "160071257600",
        "KeyId": "ecf3f5c5-6644-4540-ad62-0a3aec511343",
        "Arn": "arn:aws:kms:ap-southeast-2:160071257600:key/ecf3f5c5-6644-4540-ad62-0a3aec511343",
        "CreationDate": "2021-06-10T19:11:49.932000+08:00",
        "Enabled": true,
        "Description": "",
        "KeyUsage": "ENCRYPT_DECRYPT",
        "KeyState": "Enabled",
        "Origin": "AWS_KMS",
        "KeyManager": "CUSTOMER",
        "CustomerMasterKeySpec": "SYMMETRIC_DEFAULT",
        "EncryptionAlgorithms": [
            "SYMMETRIC_DEFAULT"
        ]
    }
}
```

**create alias**

```
aws kms create-alias \
--alias-name alias/rabit-kms \
--target-key-id ecf3f5c5-6644-4540-ad62-0a3aec511343 \
--profile beach \
--region ap-southeast-2

```
### 2.加密一段字符串

```
aws kms encrypt \
--profile beach \
--region ap-southeast-2 \
--key-id arn:aws:kms:ap-southeast-2:160071257600:key/ecf3f5c5-6644-4540-ad62-0a3aec511343 \
--plaintext fileb://plaintext.txt \
--output text \
--query CiphertextBlob | base64 > EncryptedFile1
```


### 3.使用同一个 Key 重新加密同一段字符串，观察结果
```
aws kms encrypt \
--profile beach \
--region ap-southeast-2 \
--key-id arn:aws:kms:ap-southeast-2:160071257600:key/ecf3f5c5-6644-4540-ad62-0a3aec511343 \
--plaintext fileb://plaintext.txt \
--output text \
--query CiphertextBlob | base64 > EncryptedFile2
```

***结果：CiphertextBlob 结果不一致***

### 4. 将加密后的字符串进行解密

```
aws kms decrypt \
--profile beach \
--region ap-southeast-2 \
--ciphertext-blob $(cat EncryptedFile1 | base64 -d) \
--key-id arn:aws:kms:ap-southeast-2:160071257600:key/ecf3f5c5-6644-4540-ad62-0a3aec511343 \
--output text \
--query Plaintext | base64 \
--decode > decryptedFile1

```

***![Error:](https://github.com/CYchenyan/AWS-workshop/blob/main/kms/decryptError.png)***

___解决：base64加密后，在解密前应该先用base64解密___
