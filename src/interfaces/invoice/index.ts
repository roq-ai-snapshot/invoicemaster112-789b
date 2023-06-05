import { PaymentInterface } from 'interfaces/payment';
import { OrganisationInterface } from 'interfaces/organisation';

export interface InvoiceInterface {
  id?: string;
  invoice_number: string;
  amount: number;
  status: string;
  organisation_id: string;
  payment?: PaymentInterface[];
  organisation?: OrganisationInterface;
  _count?: {
    payment?: number;
  };
}
