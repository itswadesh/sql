// src/instances/sequelize.ts

import Sequelize from 'sequelize'

const host = 'remotemysql.com'
const db = '80kCWhB79o'
const username = '80kCWhB79o'
const password = 'HuDkHazlKT'

// @ts-ignore
export const sequelize = new Sequelize(db, username, password, {
  host,
  dialect: "mysql",
  port: 3306,
});

sequelize.authenticate()