import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from './controller/ErrorController';
import AuthRoutes from './route/AuthRoutes';
import ImageRoutes from './route/ImageRoutes';

//Create Express Server
const app = express();

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
