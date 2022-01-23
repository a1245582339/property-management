import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  knex: {
    enable: true,
    package: 'egg-knex',
  },
};


export default plugin;
