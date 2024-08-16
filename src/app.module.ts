import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnicianModule } from './technician/technician.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'monorail.proxy.rlwy.net',
      port: 39973,
      username: 'root',
      password: 'gQIpWHwoChEHhqPjhqzZzxBUdrRUZfyC',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TechnicianModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
