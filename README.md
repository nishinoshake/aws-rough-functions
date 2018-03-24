# 使い方

```
# インストール
$ npm install

# デプロイ
$ npm run deploy

# 実行
$ npm run invoke price
$ npm run invoke fx
```

# バケットの設定

serverless.yml を直接編集するか、serverless.env.yml というファイルを作成して、下記のようにバケット名を設定してください。

```
BUCKET_NAME: 'aws.noplan.cc'
```
