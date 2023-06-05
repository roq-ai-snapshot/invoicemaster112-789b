import * as yup from 'yup';

export const apiUsageValidationSchema = yup.object().shape({
  endpoint: yup.string().required(),
  usage_count: yup.number().integer().required(),
  organisation_id: yup.string().nullable().required(),
});
