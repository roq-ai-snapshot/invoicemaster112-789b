import * as yup from 'yup';

export const contractValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  organisation_id: yup.string().nullable().required(),
});
