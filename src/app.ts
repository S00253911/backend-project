import express, {Application, Request, Response} from 'express' ;
import carRoutes from './routes/cars' ;

const PORT = process.env.PORT || 3425;

const app: Application = express();
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

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Telling the application to use the router
app.use('/api/v1/cars', carRoutes); 
app.use(express.json()); // Middleware to parse JSON request bodies
