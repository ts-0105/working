# アプリケーション名
working

# アプリケーション概要
人物を部屋に割り振り、その中で情報を共有することができる

# URL


# テスト用アカウント
・Basic認証パスワード
・Basic認証ID
・メールアドレス
・パスワード

## 利用方法
# user作成
・ユーザー新規登録する
# ワークスペース作成
・ワークスペース作成ボタンを押すと現在登録している人物をチェックボックスで選び、作成ボタンを押す
# ワークスペース内
ワークスペース作成後、場所名をクリックするとそのワークスペース内にリンクで遷移する
その中ではメッセージや画像の送信をすることができる

# アプリケーションを作成した背景
出勤時にどこに行き、何をすればいいかを毎回聞かなければいけなかったり、他者を会社内で探す時もどこにいて何をしているかがわからないことがどの会社でもあった。この問題は認知はされていたが、あまり解消しようとはされていなかったため、これを機に解消できればいいなと思い、開発した。

# 洗い出した要件
# 実装した機能についての画像やGIFおよび説明
# 実装予定の機能

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

# 画面遷移図

# 開発環境

# ローカルでの動作方法

# 工夫したポイント

