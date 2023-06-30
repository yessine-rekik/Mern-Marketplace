import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(30, 'At most 30 characters'),
  price: yup.number().required('Price is required'),
  category: yup.string().required('Category is required'),
});
