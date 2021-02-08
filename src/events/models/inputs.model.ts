
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';




@InputType()
export class EventLocationAddressInput {
	@Field()
	label: string;

	@Field()
	countryCode: string;

	@Field()
	countryName: string;

	@Field()
	stateCode: string;

	@Field()
	state: string;

	@Field()
	county: string;

	@Field()
	city: string;

	@Field()
	district: string;

	@Field()
	postalCode: string;
}

@InputType()
export class EventLocationAddressPositionInput {
	@Field((type) => Int)
	lat: number;

	@Field((type) => Int)
	lng: number;
}

@InputType()
export class EventLocationAddressMapCordsInput {
	@Field((type) => Int)
	west: number;

	@Field((type) => Int)
	south: number;

	@Field((type) => Int)
	east: number;

	@Field((type) => Int)
	north: number;
}



@InputType()
export class EventLocationVenueInput {
	@Field()
	title: string;

	@Field()
	id: string;

	@Field()
	address: EventLocationAddressInput;

	@Field()
	position: EventLocationAddressPositionInput;

	@Field()
	mapView: EventLocationAddressMapCordsInput;
}



@InputType()
export class EventDateInput {
	@Field()
	start: string;

	@Field()
	end: string;
}

@InputType()
export class EventTimingInput {
	@Field()
	start: string;

	@Field()
	end: string;
}

@InputType()
export class EventTimezoningInput {
	@Field()
	zone: string;

	@Field()
	label: string;
}





@InputType()
export class EventOrganizerInput {
	@Field()
	name: string;

	@Field()
	image: string;
}

@InputType()
export class EventTypeInput {
	@Field()
	name: string;
}

@InputType()
export class EventCategoryInput {
	@Field()
	name: string;
}

@InputType()
export class EventTagInput {
	@Field()
	name: string;
}

@InputType()
export class EventLocationInput {
	@Field()
	venue: EventLocationVenueInput;

	@Field()
	online: string;

	@Field()
	toBeAnnounced: boolean;
}

@InputType()
export class EventDateAndTimingInput {
	@Field()
	date: EventDateInput;

	@Field()
	time: EventTimingInput;

	@Field()
	timezone: EventTimezoningInput;
}

@InputType()
export class EventInput {
	@Field()
	event_state: string;

	@Field()
	event_title: string;

	@Field()
	event_description: string;

	@Field()
	event_organizer: EventOrganizerInput;

	@Field({ nullable: true })
	event_type: EventTypeInput;

	@Field({ nullable: true })
	event_category: EventCategoryInput;

	@Field((type) => [EventTagInput], { nullable: true })
	event_tags: EventTagInput[];

	@Field({ nullable: true })
	event_location: EventLocationInput;

	@Field({ nullable: true })
	event_schedule: EventDateAndTimingInput;
}
