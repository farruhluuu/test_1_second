import express from 'express';
import bodyParser from 'body-parser';
import productActionsRoutes from './routes/productActions';
import sequelize from './db';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('/product-actions', productActionsRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Product action service is running on port ${PORT}`);
  });
});
