import * as yup from 'yup';
import { paymentValidationSchema } from 'validationSchema/payments';

export const invoiceValidationSchema = yup.object().shape({
  invoice_number: yup.string().required(),
  amount: yup.number().integer().required(),
  status: yup.string().required(),
  organisation_id: yup.string().nullable().required(),
  payment: yup.array().of(paymentValidationSchema),
});
