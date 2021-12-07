import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { Confession } from './confession/confession.entity';
import { ConfessionModule } from './confession/confession.module';
import { Post } from './post/post.entity';
import { Role } from './role/role.entity';
import { Setting } from './setting/setting.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nsc',
      entities: [User, Role, Confession, Post, Setting],
      migrationsRun: true,
      timezone: '+07:00',
      synchronize: true,
    }),
    AuthenticationModule,
    UserModule,
    ConfessionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
