# sequelize-project


## QuickStart


1. 用egg-init 初始化项目:
```
egg-init --type=simple --dir=sequelize-project
cd sequelize-project
yarn
```
2. 安装依赖
```
yarn add egg-sequelize mysql2 sequelize-cli ramda
```

3. 项目配置
> 1). 在 config/plugin.js 中引入 egg-sequelize 插件
>```
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
>```
> 2). 在 config/config.default.js 中编写 sequelize 配置
>```
config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'egg-sequelize',
  };
>```

4. 初始化数据库和 Migrations
> 1).用mysql 命令 创建 两个 database：
>```
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg-sequelize`;'
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg-sequelize-unittest`;'
>```
> 2). 设计 users 表
>```
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `weibo` varchar(40) DEFAULT NULL,
  `weixin` varchar(40) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `receive_remote` tinyint(1) DEFAULT NULL,
  `email_verifyed` tinyint(1) DEFAULT NULL,
  `avatar` varchar(40) DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
>```

> 3). 在项目根目录下新建一个 .sequelizerc 配置文件：
> ```
>  'use strict';
>
>  const path = require('path');
>
>  module.exports = {
    config: path.join(__dirname, 'database/config.json'),
    'migrations-path': path.join(__dirname, 'database/migrations'),
    'seeders-path': path.join(__dirname, 'database/seeders'),
    'models-path': path.join(__dirname, 'app/model'),
  };
>```

> 4). 使用npx命令和sequelize-cli脚手架命令，初始化 Migrations 配置文件和目录
> ```
npx sequelize init:config
npx sequelize init:migrations
>```
> 执行完后会生成 database/config.json 文件和 database/migrations 目录.

>5). 修改  database/config.json 中的内容：
>```
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "egg-sequelize",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "egg-sequelize-unittest",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

>```

> 6).生成 Migration 文件
>```
npx sequelize migration:generate --name=init-users
>```

> 7).编辑 Migration 文件内容如下：
>```
>'use strict';
>
>module.exports = {
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
>```

> 8).执行 migrate 进行数据库变更
>```
>#升级数据库
  npx sequelize db:migrate
>#如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>#npx sequelize db:migrate:undo
>#可以通过 `db:migrate:undo:all` 回退到初始状态
>#npx sequelize db:migrate:undo:all 
>```

5. 开始编码开发
> 1).在 app/model/ 目录下编写 user.js 这个 Model：
> ```
>'use strict';
>
>module.exports = app => {
>  const { STRING, INTEGER, DATE,TINYINT } = app.Sequelize;
>
>  const User = app.model.define('user', {
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
>
>  return User;
>};
> ```

> 2).编写 app/controller/users.js：
>```
>// app/controller/users.js
>const Controller = require('egg').Controller;
>
>function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
>
>class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.model.User.findAll(query) ;
    ctx.body = JSON.stringify({data:result});
  }
>
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findById(toInt(ctx.params.id));
    //ctx.body = `id: ${ctx.params.id}`;
  }
>
  async create() {
    const ctx = this.ctx;
   // const { name, age } = ctx.request.body;
   // const user = await ctx.model.User.create({ name, age });
    const modelObject = ctx.request.body;
    const user = await ctx.model.User.create(modelObject);
    ctx.status = 201;
    ctx.body = user;
  }
>
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
>
    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }
>
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
>
    await user.destroy();
    ctx.status = 200;
  }
}
>
module.exports = UserController;
>```

> 3). 将这个user.js controller 挂载到路由上：
>```
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources('users', '/users', controller.users);
};
>```

6. 运行项目
>```
yarn run dev
>```
> open http://127.0.0.1:7001/users/

7. 用postman测试API
>打开postman的Interceptor开关，设置post请求的头部：
X-CSRF-TOKEN ： Cookies的csrfToken的值 

 ### Development
```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org