import { InvoiceInterface } from 'interfaces/invoice';

export interface PaymentInterface {
  id?: string;
  amount: number;
  status: string;
  invoice_id: string;

  invoice?: InvoiceInterface;
  _count?: {};
}
