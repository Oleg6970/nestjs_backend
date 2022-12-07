import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import configurations from '../../configurations';
import { User } from '../users/models/user.models';
import { TokenModule } from 'src/token/token.module';
import { AuthModule } from '../auth/auth.module';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[configurations]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'oracle',
      username: configService.get('db_user'),
      password: configService.get('db_password'),
      dialectOptions: {connectString: configService.get('db_host')},
      synchronize: true,
      autoLoadModels: true,
      models: [User, Watchlist]
    })
  }),
    UsersModule,
    AuthModule,
    TokenModule,
    WatchlistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
