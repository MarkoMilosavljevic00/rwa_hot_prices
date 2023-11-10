import { User } from "src/models/entities/user.entity";
import { ConnectionOptions } from "typeorm";

export const typeOrmConfig: ConnectionOptions = {
    type: 'postgres',
    host: '192.168.99.101',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'hot-prices-db',
    entities: [User],
    synchronize: true,
}