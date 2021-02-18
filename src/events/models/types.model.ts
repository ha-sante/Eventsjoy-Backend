import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

// SUB TYPES -------------------------------------------------------------------------
@ObjectType()
export class EventLocationAddress {
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

@ObjectType()
export class EventLocationAddressPosition {
	@Field({ nullable: true })
	lat: number;

	@Field({ nullable: true })
	lng: number;
}

@ObjectType()
export class EventLocationAddressMapCords {
	@Field({ nullable: true })
	west: number;

	@Field({ nullable: true })
	south: number;

	@Field({ nullable: true })
	east: number;

	@Field({ nullable: true })
	north: number;
}

// SUB PARENT
@ObjectType()
export class EventLocationVenue {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	id: string;

	@Field({ nullable: true })
	address: EventLocationAddress;

	@Field({ nullable: true })
	position: EventLocationAddressPosition;

	@Field({ nullable: true })
	mapView: EventLocationAddressMapCords;
}

@ObjectType()
export class EventDate {
	@Field({ nullable: true })
	start: string;

	@Field({ nullable: true })
	end: string;
}

@ObjectType()
export class EventTiming {
	@Field({ nullable: true })
	start: string;

	@Field({ nullable: true })
	end: string;
}

@ObjectType()
export class EventTimezoning {
	@Field({ nullable: true })
	zone: string;

	@Field({ nullable: true })
	label: string;
}

// PARENT TYPES -------------------------------------------------------------------------

@ObjectType()
export class EventOrganizer {
	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	image: string;
}

@ObjectType()
export class EventType {
	@Field({ nullable: true })
	name: string;
}

@ObjectType()
export class EventCategory {
	@Field({ nullable: true })
	name: string;
}

@ObjectType()
export class EventTag {
	@Field({ nullable: true })
	name: string;
}

@ObjectType()
export class EventLocation {
	@Field({ nullable: true })
	venue: EventLocationVenue;

	@Field({ nullable: true })
	online: string;

	@Field({ nullable: true })
	toBeAnnounced: boolean;
}

@ObjectType()
export class EventDateAndTiming {
	@Field({ nullable: true })
	date: EventDate;

	@Field({ nullable: true })
	time: EventTiming;

	@Field({ nullable: true })
	timezone: EventTimezoning;
}

@ObjectType()
export class EventImage {
	@Field({ nullable: true })
	url: string;
}

@ObjectType()
export class EventDescription {
	@Field({ nullable: true })
	summary: string;

	@Field({ nullable: true })
	content: string;
}

// COMPLETE TYPES -------------------------------------------------------------------------

@ObjectType()
export class Event {
	
	@Field({ nullable: true })
	id: string;

	@Field({ nullable: true })
	event_owner_id: string;

	@Field({ nullable: true })
	event_state: string;

	@Field({ nullable: true })
	event_title: string;

	@Field({ nullable: true })
	event_description: EventDescription;

	@Field({ nullable: true })
	event_organizer: EventOrganizer;

	@Field({ nullable: true })
	event_type: EventType;

	@Field({ nullable: true })
	event_category: EventCategory;

	@Field((type) => [String], { nullable: true })
	event_tags: string[];

	@Field({ nullable: true })
	event_location: EventLocation;

	@Field({ nullable: true })
	event_schedule: EventDateAndTiming;

	@Field({ nullable: true })
	event_image: EventImage;

}

















