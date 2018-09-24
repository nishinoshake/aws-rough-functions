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
CF_DIST_ID: 'HOGE'
SNS_PRICE_UPDATE_ARN: 'arn:aws:sns:hoge'
SNS_PRICE_VALIDATION_ARN: 'arn:aws:sns:fuga'
SLACK_WEBHOOK_URL: 'https://hooks.slack.com/hoge'
PRODUCTION_VALIDATE_ORIGIN: 'https://aws.noplan.cc'
LOCAL_PRICE_PATH: '/path/to/local/price.json'
LOCAL_FX_PATH: '/path/to/local/fx.json'
LOCAL_VALIDATE_ORIGIN: 'http://aws.noplan.test'
LOCAL_CHROME_PATH: '/path/to/chrome'
```
