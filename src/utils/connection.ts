import { join } from 'path';
import { createConnection, getConnection } from 'typeorm';

const connection = {
    async create() {
        await createConnection({
            type: 'postgres',
            database: 'image-shop',
            url: process.env.DATABASE_URL,
            entities: [join(__dirname, '../entity/*')],
            migrations: [join(__dirname, '../migration/*')],
            synchronize: true,
            logging: false,
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
        });
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        await Promise.all(
            entities.map(async (entity) => {
                const repository = connection.getRepository(entity.name);
                await repository.query(
                    `DELETE FROM public.${entity.tableName};`,
                );
            }),
        );
    },
};

export default connection;
