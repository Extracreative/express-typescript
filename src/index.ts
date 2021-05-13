import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './api/routes';
import logger from './api/middlewares/logger.middleware';
import { generateToken } from './api/utils/jwt.utils';

const app = express();
const port = 3000;

// Only generate a token for lower level environments
if (process.env.NODE_ENV !== 'production') {
  console.log('JWT', generateToken());
}

// compresses all the responses
app.use(compression());

// adding set of security middlewares
app.use(helmet());

// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable all CORS request 
app.use(cors());

// add logger middleware
app.use(logger);

app.use('/api/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});