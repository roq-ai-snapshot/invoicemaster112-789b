import { ApiUsageInterface } from 'interfaces/api-usage';
import { ContractInterface } from 'interfaces/contract';
import { InvoiceInterface } from 'interfaces/invoice';
import { ReportInterface } from 'interfaces/report';
import { UserOrganisationInterface } from 'interfaces/user-organisation';
import { UserInterface } from 'interfaces/user';

export interface OrganisationInterface {
  id?: string;
  name: string;
  user_id: string;
  api_usage?: ApiUsageInterface[];
  contract?: ContractInterface[];
  invoice?: InvoiceInterface[];
  report?: ReportInterface[];
  user_organisation?: UserOrganisationInterface[];
  user?: UserInterface;
  _count?: {
    api_usage?: number;
    contract?: number;
    invoice?: number;
    report?: number;
    user_organisation?: number;
  };
}
