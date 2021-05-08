import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import { createConnection } from 'typeorm';
import { errorHandler, notFound } from './controller/ErrorController';
import AuthRoutes from './route/AuthRoutes';
import ImageRoutes from './route/ImageRoutes';

//Create Express Server
const app = express();

// Connect to postgres database
createConnection({
    type: 'postgres',
    database: 'image-shop',
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
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/auth', AuthRoutes);
app.use('/api/image', ImageRoutes);

//Error Handling
app.use(errorHandler);
app.use(notFound);

export default app;
