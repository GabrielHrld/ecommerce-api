import { Module, Global, HttpModule, HttpService } from '@nestjs/common';
import { MongoClient } from "mongodb";

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        const client = new MongoClient(URI, {useUnifiedTopology: true, useNewUrlParser: true});
        await client.connect();
        const database = client.db('ecommerce');
        return database;
      },
    }
  ],
  exports: [ 'MONGO'],
})
export class DatabaseModule {}
