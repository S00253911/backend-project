import express, {Application, Request, Response} from 'express' ;
import carRoutes from './routes/cars' ;
import { env } from "./config/env" ;
import { connectDB } from './config/database';
import {authenticateKey} from './middleware/auth.middleware';

//import { apps } from './middleware/simplelogging';
// ** Updated  the app.use function to the imported function 'apps'. Routes now use apps.get instead of app.get ** 
// Allows the .ENV folder to read in the port value privately
const PORT = env.port;
export const app: Application = express();
//app.use(authenticateKey);
app.use(express.json()); // Weirdly enough when i use the apps import function for Application Express. The server does not receive a request or give a response to the client.


// the ping route (To display my name)
app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
        message: "Hello from Ryan"
    });
});
// The bananas route
app.get('/bananas', async (_req : Request, res: Response) => {
    
    res.json({
        message: "this is bananas"
        
    });
});

// The apples route
app.get('/apples', async (_req : Request, res: Response) => {
    res.json({
        message: "this is apples"
    });
});
// The oranges route
app.get('/oranges', async (_req : Request, res: Response) => {
    res.json({
        message: "this is oranges"
    });
    
});

// Starting the server and connecting to the database
const startServer = async () => {
    await connectDB(); // Connect to the database before starting the server

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer(); // Start the server

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Telling the application to use the router
app.use('/api/v1/cars',authenticateKey, carRoutes);  // added the authentication to the router directly
