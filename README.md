# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# ChatSpace DB設計
## usersテーブル
|Columns|Type|Options|
|-------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string||
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|---------|-----|----|
|groupname|string|null: false, unique: true|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user