import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();                                              // Active dotenv

connectDB()                                                   // fct qui nous connecte à la DB mongoose
const app = express();                                        // initialise express

// Middleware
app.use(express.json())                                       // accepte JSON dans le body

//--------------
// Routes
app.get('/', (req, res) => { res.send('API is running...') })
app.use('/api/products', productRoutes)                       // Redirige 'api/products/' et 'api/products/:id' à "/routes/productRoutes.js"
app.use('/api/users', userRoutes)

// Keep this as a last routes
app.use(notFound)                                           // middleware gestion des 404 
app.use(errorHandler)                                       // middleware gestion des erreurs générées par MongoDB et contenant du HTML



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))