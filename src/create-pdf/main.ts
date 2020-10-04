import { config } from 'dotenv';
config();

import { bootstrap } from './app';

const port = process.env.LISTEN_PORT || 8081;

async function startLocal() {
  const nestApp = await bootstrap();
  nestApp.app.enableCors();
  await nestApp.instance.listen(+port);
}

startLocal();
