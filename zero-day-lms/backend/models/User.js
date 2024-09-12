import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Change this if you are using a different database
  logging: false,
});

const User = sequelize.define('UsersDB', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({ force: true });
  console.log('Database synchronized.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export { User };
