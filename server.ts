import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes";
import modulesRoutes from './routes/modules.routes';
import { setupSwagger } from './docs/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', usersRoutes);
app.use('/api', modulesRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        status: statusCode,
    });
});

setupSwagger(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
