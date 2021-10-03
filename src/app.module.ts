import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EventsModule } from './events/events.module';
import { FaunadbModule, FaunadbModuleOptions } from 'nestjs-faunadb';


const FaunaConfig: FaunadbModuleOptions = {
  secret: ''
}

@Module({
  imports: [
      GraphQLModule.forRoot({
      	 // typePaths: ['./**/graphql/*.graphql'],
      	 // resolverValidationOptions: {
      	 // 	requireResolversForResolveType: false,
      	 // },
         autoSchemaFile: true,
         cors: {
            origin: 'http://localhost:3000',
            credentials: true,
          }
      }),
      EventsModule,
      FaunadbModule.forRoot(FaunaConfig)
  ]
})


export class AppModule {}
