import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import { createConnection } from 'typeorm';
import {
    errorHandler,
    notFound,
} from './controller/ErrorController/ErrorController';

//Create Express Server
const app = express();

//Connect to postgres database
createConnection({
    type: 'postgres',
    database: 'assembly-shop',
    url: process.env.DATABASE_URL,
    entities: [join(__dirname, '/entity/*')],
    migrations: [join(__dirname, '/migration/*')],
    synchronize: true,
    logging: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
})
    .then(() => {
        console.log('Connected to Postgres');
    })
    .catch((error) =>
        console.error('Unable to Connect to Postgres \n' + error),
    );

//middleware
app.use(morgan('dev'));

//Error Handling
app.use(errorHandler);
app.use(notFound);

export default app;
