import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  title: yup.string().required(),
  data: yup.string().required(),
  organisation_id: yup.string().nullable().required(),
});
