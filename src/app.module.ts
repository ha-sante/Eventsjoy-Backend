import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EventsModule } from './events/events.module';
import { FaunadbModule, FaunadbModuleOptions } from 'nestjs-faunadb';


const FaunaConfig: FaunadbModuleOptions = {
  secret: 'fnAEAgzlL_ACDFOIr7b9NUfLSCgiZhL-0_IrPvYK'
}

@Module({
  imports: [
      GraphQLModule.forRoot({
      	 typePaths: ['./**/graphql/*.graphql'],
      	 resolverValidationOptions: {
      	 	requireResolversForResolveType: false,
      	 }
      }),
      EventsModule,
      FaunadbModule.forRoot(FaunaConfig)
  ]
})


export class AppModule {}
