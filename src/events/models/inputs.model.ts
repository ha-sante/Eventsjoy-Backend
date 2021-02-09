
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';




@InputType()
export class EventLocationAddressInput {
	@Field({ nullable: true })
	label: string;

	@Field({ nullable: true })
	countryCode: string;

	@Field({ nullable: true })
	countryName: string;

	@Field({ nullable: true })
	stateCode: string;

	@Field({ nullable: true })
	state: string;

	@Field({ nullable: true })
	county: string;

	@Field({ nullable: true })
	city: string;

	@Field({ nullable: true })
	district: string;

	@Field({ nullable: true })
	postalCode: string;
}

@InputType()
export class EventLocationAddressPositionInput {
	@Field()
	lat: number;

	@Field()
	lng: number;
}

@InputType()
export class EventLocationAddressMapCordsInput {
	@Field({ nullable: true })
	west: number;

	@Field({ nullable: true })
	south: number;

	@Field({ nullable: true })
	east: number;

	@Field({ nullable: true })
	north: number;
}



@InputType()
export class EventLocationVenueInput {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	id: string;

	@Field({ nullable: true })
	resultType: string;	

	@Field({ nullable: true })
	localityType: string;

	@Field({ nullable: true })
	address: EventLocationAddressInput;

	@Field({ nullable: true })
	position: EventLocationAddressPositionInput;

	@Field({ nullable: true })
	mapView: EventLocationAddressMapCordsInput;
}



@InputType()
export class EventDateInput {
	@Field({ nullable: true })
	start: string;

	@Field({ nullable: true })
	end: string;
}

@InputType()
export class EventTimingInput {
	@Field({ nullable: true })
	start: string;

	@Field({ nullable: true })
	end: string;
}

@InputType()
export class EventTimezoningInput {
	@Field({ nullable: true })
	zone: string;

	@Field({ nullable: true })
	label: string;
}





@InputType()
export class EventOrganizerInput {
	@Field()
	name: string;

	@Field({ nullable: true })
	image: string;
}

@InputType()
export class EventTypeInput {
	@Field({ nullable: true })
	name: string;
}

@InputType()
export class EventCategoryInput {
	@Field({ nullable: true })
	name: string;
}

@InputType()
export class EventTagInput {
	@Field({ nullable: true })
	name: string;
}

@InputType()
export class EventLocationInput {
	@Field({ nullable: true })
	venue: EventLocationVenueInput;

	@Field({ nullable: true })
	online: string;

	@Field({ nullable: true })
	toBeAnnounced: boolean;
}

@InputType()
export class EventDateAndTimingInput {
	@Field({ nullable: true })
	date: EventDateInput;

	@Field({ nullable: true })
	time: EventTimingInput;

	@Field({ nullable: true })
	timezone: EventTimezoningInput;
}

@InputType()
export class EventInput {
	@Field({ nullable: true })
	event_state: string;

	@Field({ nullable: true })
	event_title: string;

	@Field({ nullable: true })
	event_description: string;

	@Field({ nullable: true })
	event_organizer: EventOrganizerInput;

	@Field({ nullable: true })
	event_type: EventTypeInput;

	@Field({ nullable: true })
	event_category: EventCategoryInput;

	@Field((type) => [String], { nullable: true })
	event_tags: string[];

	@Field({ nullable: true })
	event_location: EventLocationInput;

	@Field({ nullable: true })
	event_schedule: EventDateAndTimingInput;
}
