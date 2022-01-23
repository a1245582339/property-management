import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    mysql: {
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '0000',
        // 数据库名
        database: 'property-management',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '0000',
        db: 0,
      },
    },
    knex: {
      // database configuration
      client: {
        // database dialect
        dialect: 'mysql',
        connection: {
          // host
          host: 'localhost',
          // port
          port: 3306,
          // username
          user: 'root',
          // password
          password: '0000',
          // database
          database: 'property-management',
        },
        // connection pool
        pool: { min: 0, max: 5 },
        // acquire connection timeout, millisecond
        acquireConnectionTimeout: 30000,
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642913538610_576';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
