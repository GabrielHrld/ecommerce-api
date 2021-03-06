import { Module, Global, HttpModule, HttpService } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    //variables de entorno
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'prod'
          ? `${process.env.NODE_ENV}.env`
          : '.env',
    }),
    //conexión a la base de datos
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.s5abe.mongodb.net:27017,cluster0-shard-00-01.s5abe.mongodb.net:27017,cluster0-shard-00-02.s5abe.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-uqwsdg-shard-0&authSource=admin&retryWrites=true&w=majority`,
      {
        user: `${process.env.DB_USER}`,
        pass: `${process.env.DB_PASSWORD}`,
        dbName: `${process.env.DB_NAME}`,
      },
    ),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        const client = new MongoClient(URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
        await client.connect();
        const database = client.db('ecommerce');
        return database;
      },
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
