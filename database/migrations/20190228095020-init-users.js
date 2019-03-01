'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
   // const { INTEGER, DATE, STRING  } = Sequelize;
    const { INTEGER, DATE, STRING ,TINYINT } = Sequelize;
    await queryInterface.createTable('users', {
     /* id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });*/
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
    }
  })
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};