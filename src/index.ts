import 'dotenv/config';
import connection from './utils/connection';
import app from './app';

const port = process.env.PORT || 8080;

// Connect to postgres database
connection
    .create()
    .then(() => {
        console.log('Connected to Postgres');
    })
    .catch((error) =>
        console.error('Unable to Connect to Postgres \n' + error),
    );

//Start app
app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
});
