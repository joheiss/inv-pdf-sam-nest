import {Context, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import { NestApp, bootstrap } from './app';
import { proxy } from 'aws-serverless-fastify';

let cachedNestApp: NestApp;

const binaryMimeTypes: string[] = [
    'application/json',
    'text/plain',
];

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<APIGatewayProxyResult> => {
    if (!cachedNestApp) {
        cachedNestApp = await bootstrap();
    }
    return await proxy(cachedNestApp.instance, event, context, binaryMimeTypes);
};
