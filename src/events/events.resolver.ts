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

import { Event } from './models/types.model';

@Resolver()
export class EventsResolver {
	private readonly logger = new Logger(EventsResolver.name);
	client: Client; // fauna db client

	constructor(private readonly faunadbService: FaunadbService) {
		this.client = faunadbService.getClient();
	}

	@Query((returns) => Event)
	async get_event() {
		// take the event id
		// query the database
		// return the event
		return 'Hello World!';
	}

	@Mutation((returns) => Event)
	async create_event(@Args('data') event_data: EventInput) {
		try {
			const collection = q.Collection(CollectionLabels.eventsData);
			const data = { ...event_data };

			// run the query
			const query = q.Create(collection, { data });
			const result: any = await this.client.query(query);

			// add the id to the data object
			let response = result.data;
			response.id = result.ref.id;

			return response;
		} catch (error) {
			return error;
		}
	}


	@Mutation((returns) => Event)
	async update_event(@Args('data') event_data: EventInput) {
		try {
			const collection = q.Collection(CollectionLabels.eventsData);
			const data = { ...event_data };

			// run the query
			const query = q.Create(collection, { data });
			const result: any = await this.client.query(query);

			// add the id to the data object
			let response = result.data;
			response.id = result.ref.id;

			return response;
		} catch (error) {
			return error;
		}
	}


}
