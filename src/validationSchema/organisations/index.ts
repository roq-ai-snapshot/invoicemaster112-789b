import * as yup from 'yup';
import { apiUsageValidationSchema } from 'validationSchema/api-usages';
import { contractValidationSchema } from 'validationSchema/contracts';
import { invoiceValidationSchema } from 'validationSchema/invoices';
import { reportValidationSchema } from 'validationSchema/reports';
import { userOrganisationValidationSchema } from 'validationSchema/user-organisations';

export const organisationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  api_usage: yup.array().of(apiUsageValidationSchema),
  contract: yup.array().of(contractValidationSchema),
  invoice: yup.array().of(invoiceValidationSchema),
  report: yup.array().of(reportValidationSchema),
  user_organisation: yup.array().of(userOrganisationValidationSchema),
});
