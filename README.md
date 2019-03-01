# sequelize-project

```
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg-sequelize`;'
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg-sequelize-unittest`;'

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(30) DEFAULT NULL COMMENT 'user name',
  `age` int(11) DEFAULT NULL COMMENT 'user age',
  `created_at` datetime DEFAULT NULL COMMENT 'created time',
  `updated_at` datetime DEFAULT NULL COMMENT 'updated time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='user';


```
打开postman的Interceptor开关，设置post请求的头部：
X-CSRF-TOKEN ： Cookies的csrfToken的值 

## QuickStart

<!-- add docs here for user -->
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
```

```
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