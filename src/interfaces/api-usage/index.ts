import { OrganisationInterface } from 'interfaces/organisation';

export interface ApiUsageInterface {
  id?: string;
  endpoint: string;
  usage_count: number;
  organisation_id: string;

  organisation?: OrganisationInterface;
  _count?: {};
}
