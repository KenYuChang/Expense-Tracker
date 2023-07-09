# Expense-Tracker

## Screenshot
![screenshot](https://github.com/KenYuChang/Expense-Tracker/blob/master/public/image/%E6%88%AA%E5%9C%96%202023-06-15%20%E4%B8%8B%E5%8D%8812.44.05.png)


## Introduction
- Node.js, Express.js, Handlebars, MongoDB, Mongoose, CRUD, passport-local, passport-facebook, bcryptjs, chart.js, sweetAlert

## Features

1. 新增記帳功能
2. 編輯記帳功能
3. 刪除記帳功能
4. 新增註冊、登入功能
5. 本地登入和臉書登入
6. 年/月/種類篩選
7. 圓餅圖式分析


## Prerequisites
 
- Runtime: node @ 18.15.0
- Framework: express @ 4.18.2
- Template Engine: express-handlebars @ 7.0.7
- Database: MongoDB & mongoose @ 6.5.3
- Check package.json for other dependencies

## 測試帳號:
- account: user1@example.com, password: 12345678

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
