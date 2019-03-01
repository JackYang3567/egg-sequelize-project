'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,TINYINT } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    email: {
      type: STRING(40),
      unique: true
    },
    password: STRING,
    username: STRING(40),
    name: STRING(30),
    age: INTEGER,
    weibo: STRING(40),
    weixin: STRING(40),
    team_id: INTEGER,
    receive_remote: TINYINT(1),
    email_verifyed: TINYINT(1),
    avatar: STRING(40),
    last_sign_in_at: DATE,
    created_at: {
      allowNull: false,
      type: DATE
    },
    updated_at: {
      allowNull: false,
      type: DATE
    },
  });

  return User;
};