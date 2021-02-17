import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';


async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	await app.listen(4200);

	let readyAudio = join(__dirname, '../src/', "ready.mp3");
	const sound = require("sound-play");
	sound.play(readyAudio);
}

bootstrap();
