import { Logger, Injectable } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';

import { FaunadbService, query as q, Client, values } from 'nestjs-faunadb';
import { CollectionLabels } from '../integrations/database';

@Resolver()
export class EventsResolver {
	private readonly logger = new Logger(EventsResolver.name);

	client: Client; // fauna db client

	constructor(private readonly faunadbService: FaunadbService) {
		this.client = faunadbService.getClient();
	}

	demoEvent = [
		{
			id: 0,
			event_title: 'Hello World',
		},
	];

	@Query('get_event')
	get_event() {
		return this.demoEvent;
	}

	@Mutation('create_event')
	async create_event(
		@Args('event_title') event_title: string,
		@Args('event_description') event_description: string,
		@Args('event_organizer') event_organizer: string,
		@Args('event_type') event_type: string,
		@Args('event_category') event_category: string,
		@Args('event_tags') event_tags: string,
		@Args('event_location') event_location: string,
	){
		try {
			const collection = q.Collection(CollectionLabels.eventsData);
			const data = { 
				event_title, 
				event_description, 
				event_organizer, 
				event_type,
				event_category,
				event_tags,
				event_location
			};

			const query = q.Create(collection, { data });

			// run the query
			const result: any = await this.client.query(query);

			this.logger.log(result.data);

			return result.data;
		} catch(error){
			return error;
		}
	}
}
