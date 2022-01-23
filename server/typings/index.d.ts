import 'egg';
import 'egg-redis'
declare module 'egg' {
    interface Application {
        mysql: {
            insert: any
            get: any
            select: any
            update: any
            delete: any
        }
    }
    interface Application {
        knex: any;
    }
}