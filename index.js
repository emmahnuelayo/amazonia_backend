import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((error) => console.log(error));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send(`Server is ready and running on port: ${port}`);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
