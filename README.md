# 使い方

```
# インストール
$ npm install

# デプロイ
$ npm run deploy

# 実行
$ npm run invoke price
$ npm run invoke fx
$ npm run invoke validate
```

# 環境設定

バケット名などの環境に依存するものは、  
`serverless.env.yml` というファイルを作成して設定します。

```
BUCKET_NAME: 'aws.noplan.cc'
SNS_PRICE_UPDATE_ARN: 'arn:aws:sns:hoge'
SLACK_WEBHOOK_URL: 'https://hooks.slack.com/hoge'
```
