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
import { SettingModule } from './setting/setting.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'admin',
      database: process.env.DATABASE_NAME || 'nsc',
      entities: [User, Role, Confession, Post, Setting],
      timezone: '+07:00',
      synchronize: true,
    }),
    AuthenticationModule,
    UserModule,
    ConfessionModule,
    RoleModule,
    SettingModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
