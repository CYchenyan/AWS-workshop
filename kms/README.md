## KMS 是什么服务？能解决什么问题？
AWS KMS 是一项托管式服务，让您能够轻松地创建和控制用于加密操作的密钥。该服务为您提供可用性高的密钥生成、存储、管理和审计解决方案，让您可以在自己的应用程序内加密您的数据或以数字方式对数据签名，并在 AWS 服务之间对数据的加密进行控制。

## 使用 KMS key 的方式有哪些？
加密、解密
## 可以对 KMS key 进行哪些操作？
创建对称和非对称密钥，并且密钥材料只能在该服务内部使用。
创建对称密钥，并且密钥材料在您控制下的自定义密钥存储中生成和使用*
导入您自己的对称密钥材料以在该服务内部使用
创建对称和非对称数据密钥对以在应用程序本地使用
定义哪些 IAM 用户和角色可以管理密钥
定义哪些 IAM 用户和角色可以使用密钥加密和解密数据
选择每年自动轮换由该服务生成的密钥
临时禁用密钥，使其不能被任何人使用
重新启用已禁用的密钥
计划删除不再使用的密钥
通过检查 AWS CloudTrail 中的日志审计密钥的使用
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

**Errors:**

***![Error:](https://github.com/CYchenyan/AWS-workshop/blob/main/kms/decryptError.png)***

___解决：base64加密后，在解密前应该先用base64解密___
