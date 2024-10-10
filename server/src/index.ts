import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config, mongo } from './config/mongodb.config.ts';
import { connect } from './config/connection/mongodb.connect.ts';
import { Expression } from 'mongoose';
import { corsOptions } from './config/auth/cors.auth.ts';
import { userrouter } from './routes/use.router.ts';
import session from 'express-session';


// Create an Express application instance
export const app = express();

// Define a basic GET route for the root URL
app.get('/', (_req: Request, res: Response): Expression => {
    return res.send('Hello Node TS API');
})

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with your secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 3600000 // 1 hour
    }
}));

// Add Helmet Security Headers

app.use(helmet());

// Use CORS with specific options defined in corsOptions to restrict/allow certain domains
app.use(cors(corsOptions));

// Parse incoming JSON requests, this is middleware to handle JSON data in requests
app.use(express.json());

// Mount the router
app.use('/', userrouter)

// Start the server and listen on the port specified in the config
const listener = app.listen(config.port, (): void => {
    return console.log(`Server started on port ${config.port}`);
})

// Establish a connection to MongoDB (either online or offline) using the connect function
connect(mongo, listener)
