# Expense-Tracker

## Screenshot
![screenshot](https://github.com/KenYuChang/Expense-Tracker/blob/master/public/image/%E6%88%AA%E5%9C%96%202023-05-05%20%E4%B8%8B%E5%8D%882.10.53.png)
![screenshot](https://github.com/KenYuChang/Expense-Tracker/blob/master/public/image/%E6%88%AA%E5%9C%96%202023-05-05%20%E4%B8%8B%E5%8D%882.02.37.png)

## Introduction
Node.js, Express, handlebars, mongoDB, mongoose, CRUD, passport-local, passport-facebook, bcryptjs

## Features

1. 新增記帳功能
2. 編輯記帳功能
3. 刪除記帳功能
4. 新增註冊、登入功能
5. 本地登入和臉書登入


## Prerequisites
 
- Runtime: node @ 14.16.0
- Framework: express @ 4.16.4
- Template Engine: express-handlebars @ 3.1.0
- Database: MongoDB & mongoose @ 5.9.7
- Check package.json for other dependencies

## 測試帳號:
- 請到種子資料查詢

## Installation and execution

1. Clone the project

```
git clone https://github.com/KenYuChang/Expense-Tracker.git
```

2. Install the required dependencies

```
npm install
```

3. Install nodemon

```
npm i nodemon
```

4. Run seeder

```
npm run seed
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

> MongpDB is connect!
>
> Done

5. Start the server

```
npm run dev
```
6. Execute successfully if seeing following message

```
Express is listening on localhost:3000
MongpDB is connect!
```
