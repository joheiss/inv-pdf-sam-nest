import { Injectable } from '@nestjs/common';
import { FormOptions, InvoiceForm, InvoiceFormDataMapper, InvoicePdfInputData } from 'jovisco-pdf';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createPdf(input: Partial<InvoicePdfInputData>): string {
    const { invoice, receiver } = input;
    const formData = new InvoiceFormDataMapper(invoice, receiver).map();
    const options: FormOptions = {
      headerImagePath: './assets/img/jovisco-letter-head.png',
      footerImagePath:  './assets/img/jovisco-letter-foot.png',
      addressLineImagePath: './assets/img/adresse_mini.jpg'
    };
    const invoiceForm = new InvoiceForm(options, formData);
    invoiceForm.print();
    console.log(`Invoice to be printed is ${invoice.id}`);
    return `Invoice to be printed is ${invoice.id}`;
  }
}
