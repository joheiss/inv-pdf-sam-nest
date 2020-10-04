import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InvoicePdfInputData } from 'jovisco-pdf';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createPdf(@Body() input: Partial<InvoicePdfInputData>): string {
    return this.appService.createPdf(input);
  }
}
