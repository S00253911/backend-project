import express, {Application, Request, Response} from 'express' ;
import patientRoutes from './routes/patients' ;
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';


export const app: Application = express();
app.use(express.json());

// the ping route (To display my name)
app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
        message: "Hello from Ryan"
    });
});

// Tells the App to LOG traffic on the RESTApi
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`); 
    next();
});

// Tells the app to use the patient route
app.use('/api/patient', patientRoutes);  // Added authentication on the routes directly
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger documentation route