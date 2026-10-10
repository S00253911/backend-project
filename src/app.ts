import express, {Application, Request, Response} from 'express' ;
import patientRoutes from './routes/patients' ;
import medicalrecordRoutes from './routes/medicalrecords';
import doctorRoutes from './routes/doctors';
import appointmentRoutes from './routes/appointments';
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

// Added authentication on the routes directly
// Tells the app to use the patient route
app.use('/api/patient', patientRoutes);  
// Use the MedicalRecord Route
app.use('/api/medicalrecords', medicalrecordRoutes);
// Use the Doctor Route
app.use('/api/doctors',doctorRoutes)
// Use the Appointment Route
app.use('/api/appointments', appointmentRoutes);
// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 