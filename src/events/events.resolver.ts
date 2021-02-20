import { Logger, Injectable } from '@nestjs/common';
import { Query, Mutation, Resolver, Args, Parent } from '@nestjs/graphql';

import { FaunadbService, query as q, Client, values } from 'nestjs-faunadb';
import {
	CollectionLabels,
	CollectionSearchIndexes,
} from '../integrations/database';

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

	@Query((returns) => [Event])
	async get_events_by_owner_id(@Args('id') event_owner_id: string) {
		try {
			// query in  fauna for all documents with that
			const queryIndexMatching = q.Match(
				q.Index(CollectionSearchIndexes.events_by_owner_id),
				event_owner_id,
			);

			// run the query
			const query = q.Map(
				q.Paginate(queryIndexMatching),
				q.Lambda('ref', q.Get(q.Var('ref'))),
			);

			// for each document, get the data params
			const readyQuery = q.Map(
				query,
				q.Lambda('data_obj',  q.Select(['ref', "id"], q.Var('data_obj')) ),
			);

			// first query gets the element refrences
			const resultOne: any = await this.client.query(readyQuery);
			const responseOne = resultOne.data;

			// second goes over it and gets the elements by refrence
			// and gets the data section
			const readyQueryTwo = q.Map(
				query,
				q.Lambda('data_obj',  q.Select('data', q.Var('data_obj')) ),
			);

			// we then have two arrays we refs and bodies
			// we go over datas and append the refs as id 
			const resultTwo: any = await this.client.query(readyQueryTwo);
			const responseTwo = resultTwo.data;


			const finalResponse = []
			responseTwo.map( (singleEventData, index) =>{
				let readyObj = {...singleEventData};
				readyObj.id = responseOne[index];
				finalResponse.push(readyObj) 
			})

			this.logger.log(event_owner_id, `Collected Events of ${finalResponse.length}`);

			return finalResponse;
		} catch (error) {
			this.logger.log(error);
			return error;
		}
	}

	@Query((returns) => Event)
	async get_event(@Args('id') event_id: string) {
		try {
			// query fauna for the document
			const query = q.Get(
				q.Ref(q.Collection(CollectionLabels.eventsData), event_id),
			);
			const result: any = await this.client.query(query);
			const response = result.data;

			this.logger.log(event_id, `Collected Event`);

			return response;
		} catch (error) {
			this.logger.log(error);
			return error;
		}
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

			this.logger.log(response.id, 'Created Event');

			return response;
		} catch (error) {
			return error;
		}
	}

	@Mutation((returns) => Event)
	async update_event(
		@Args('id') event_id: string,
		@Args('data') event_data: EventInput,
	) {
		try {
			const collection = q.Collection(CollectionLabels.eventsData);
			const data = { ...event_data };

			// run the query
			const query = q.Update(q.Ref(collection, event_id), { data });
			const result: any = await this.client.query(query);
			const response = result.data;

			this.logger.log(event_id, 'Updated Event');

			return response;
		} catch (error) {
			return error;
		}
	}
}
