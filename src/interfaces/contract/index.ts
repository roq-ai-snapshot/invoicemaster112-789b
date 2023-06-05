import { OrganisationInterface } from 'interfaces/organisation';

export interface ContractInterface {
  id?: string;
  title: string;
  content: string;
  organisation_id: string;

  organisation?: OrganisationInterface;
  _count?: {};
}
