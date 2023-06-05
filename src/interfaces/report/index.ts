import { OrganisationInterface } from 'interfaces/organisation';

export interface ReportInterface {
  id?: string;
  title: string;
  data: string;
  organisation_id: string;

  organisation?: OrganisationInterface;
  _count?: {};
}
