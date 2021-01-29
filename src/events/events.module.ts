import { Module } from '@nestjs/common';
import { EventsResolver } from './events.resolver';

@Module({
	providers: [EventsResolver],
	exports: [EventsResolver]
})
export class EventsModule {}
