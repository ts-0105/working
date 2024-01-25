# アプリケーション名
working

# アプリケーション概要
人物を部屋に割り振り、その中で情報共有することができる
業務連絡アプリ

# URL
https://working-xqs3.onrender.com

# テスト用アカウント
・Basic認証パスワード 2222
・Basic認証ID admin


## 利用方法
# user作成
・ユーザー新規登録する
# ワークスペース作成
・ワークスペース作成ボタンを押すと現在登録している人物の名前が一覧表示されるのでチェックボックスで選び、作成ボタンを押す
# ワークスペース内
場所名が表示されていて、それがリンクとなっているのでクリックするとそのワークスペースに遷移する
その中ではメッセージや画像の送信をすることができる(業務連絡や報告など)

# アプリケーションを作成した背景
出勤時にどこに行き、何をすればいいかをその度に聞かなければいけなかったり、他者を会社内で探す時もどこにいて何をしているかがわからないことがどの会社でもあった。この問題は認知はされていたが、あまり解消しようとはされていなかったため、これを機に解消できればいいなと思い、開発した。

# 洗い出した要件
従業員登録機能(ユーザー)
ルーム機能
メッセージ機能


# 実装した機能についての画像やGIFおよび説明
・トップページ
https://gyazo.com/79e7c0a201043a47c103bf57abe35032

・ワークスペース選択→ワークスペースの内容
https://gyazo.com/202fbe53b4a4322f1ff7dca88b404b10

・ワークスペースにて文書投稿
https://gyazo.com/caaac2846a03325baa2a051d836b283c
# 実装予定の機能
表示をもう少し見やすく
投稿したものの編集機能

# データベース設計
# テーブル設計

## users テーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| name               | string | null: false |
| email              | string | null: false |
| encrypted_password | string | null: false |

### Association

- has_many :room_users
- has_many :rooms, through: :room_users
- has_many :messages


## rooms テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :room_users
- has_many :users, through: :room_users
- has_many :messages


## room_users テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| room   | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user


## messages テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| content | string     |                                |
| user    | references | null: false, foreign_key: true |
| room    | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user

# 開発環境
・フロントエンド
・バックエンド
・テキストエディタ

# 工夫したポイント
・どの年代の人にも使いやすくシンプルな機能を目指した
・学習の為に投稿機能をjavascriptを用いた非同期通信で実装した

