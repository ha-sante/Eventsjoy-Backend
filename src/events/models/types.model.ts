import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

// SUB TYPES -------------------------------------------------------------------------
@ObjectType()
export class EventLocationAddress {
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

@ObjectType()
export class EventLocationAddressPosition {
	@Field((type) => Int)
	lat: number;

	@Field((type) => Int)
	lng: number;
}

@ObjectType()
export class EventLocationAddressMapCords {
	@Field((type) => Int)
	west: number;

	@Field((type) => Int)
	south: number;

	@Field((type) => Int)
	east: number;

	@Field((type) => Int)
	north: number;
}

// SUB PARENT
@ObjectType()
export class EventLocationVenue {
	@Field()
	title: string;

	@Field()
	id: string;

	@Field()
	address: EventLocationAddress;

	@Field()
	position: EventLocationAddressPosition;

	@Field()
	mapView: EventLocationAddressMapCords;
}

@ObjectType()
export class EventDate {
	@Field()
	start: string;

	@Field()
	end: string;
}

@ObjectType()
export class EventTiming {
	@Field()
	start: string;

	@Field()
	end: string;
}

@ObjectType()
export class EventTimezoning {
	@Field()
	zone: string;

	@Field()
	label: string;
}

// PARENT TYPES -------------------------------------------------------------------------

@ObjectType()
export class EventOrganizer {
	@Field()
	name: string;

	@Field()
	image: string;
}

@ObjectType()
export class EventType {
	@Field()
	name: string;
}

@ObjectType()
export class EventCategory {
	@Field()
	name: string;
}

@ObjectType()
export class EventTag {
	@Field()
	name: string;
}

@ObjectType()
export class EventLocation {
	@Field()
	venue: EventLocationVenue;

	@Field()
	online: string;

	@Field()
	toBeAnnounced: boolean;
}

@ObjectType()
export class EventDateAndTiming {
	@Field()
	date: EventDate;

	@Field()
	time: EventTiming;

	@Field()
	timezone: EventTimezoning;
}

// COMPLETE TYPES -------------------------------------------------------------------------

@ObjectType()
export class Event {
	@Field((type) => Int)
	id: number;

	@Field({ nullable: true })
	event_state?: string;

	@Field({ nullable: true })
	event_title?: string;

	@Field({ nullable: true })
	event_description?: string;

	@Field({ nullable: true })
	event_organizer?: EventOrganizer;

	@Field({ nullable: true })
	event_type?: EventType;

	@Field({ nullable: true })
	event_category?: EventCategory;

	@Field((type) => [EventTag], { nullable: true })
	event_tags?: EventTag[];

	@Field({ nullable: true })
	event_location?: EventLocation;

	@Field({ nullable: true })
	event_schedule?: EventDateAndTiming;
}

















