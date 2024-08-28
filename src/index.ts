import app from './app';
import 'reflect-metadata';
import { AppDataSource } from './config/dataSource';

AppDataSource.initialize()
  .then(async () => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running port ${PORT}`);
    });
  })
  .catch((error) => console.log('Error initializing DataSource:', error));
