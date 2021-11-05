import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'                                   // permet d'ajouter des couleurs au textes de la console
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config();                                              // Active dotenv
connectDB()                                                   // fct qui nous connecte à la DB avec mongoose

const app = express();                                        // initialise express


//--------------
// Routes
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => { 
  res.json(products)
})

app.get('/api/products/:id', (req, res) => { 
  const product = products.find(p => p._id == req.params.id)
  res.json(product)
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))