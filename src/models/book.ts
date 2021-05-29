// src/models/user.ts

import Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'

export const Book = sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    author: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    price: Sequelize.FLOAT,
    category: Sequelize.STRING,
    image: Sequelize.STRING,
    isbn: Sequelize.STRING,
    weight: Sequelize.STRING,
    releaseDate: Sequelize.STRING,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

