import { Logger, Injectable } from '@nestjs/common';
import { Query, Mutation, Resolver, Args, Parent } from '@nestjs/graphql';

import { FaunadbService, query as q, Client, values } from 'nestjs-faunadb';
import { CollectionLabels } from '../integrations/database';

import {
	EventInput,
	EventOrganizerInput,
	EventTypeInput,
	EventCategoryInput,
	EventTagInput,
	EventLocationInput,
	EventDateAndTimingInput,
} from './models/inputs.model';



import {
	Event
} from './models/types.model';


@Resolver()
export class EventsResolver {
	private readonly logger = new Logger(EventsResolver.name);
	client: Client; // fauna db client

	constructor(private readonly faunadbService: FaunadbService) {
		this.client = faunadbService.getClient();
	}

	@Query(() => String)
	sayHello(): string {
		return 'Hello World!';
	}

	@Mutation((returns) => Event)
	async create_event(
		@Args('data') event_data: EventInput,
	) {
		try {
			const collection = q.Collection(CollectionLabels.eventsData);
			const data = {...event_data};

			this.logger.log(data)

			const query = q.Create(collection, { data });

			// run the query
			const result: any = await this.client.query(query);

			this.logger.log(result.data);

			return result.data;
		} catch (error) {
			return error;
		}
	}
}
