import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import mongoose from "mongoose";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT|| 5000;
    const app = await NestFactory.create(AppModule);  
    setupSwagger(app)  
    await app.listen(PORT,() =>console.log(`Server started on port ${PORT}`))
}
async function setupSwagger(app:INestApplication) {
    const config = new DocumentBuilder()
    .setTitle('Тестовое задание от "Креативного агентства Background"')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('FranckLua')
    .build()
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/docs', app, document)
}
start()