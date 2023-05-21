import React from 'react';
import * as yup from 'yup';

export const validationSchema = yup.object({
  username: yup.string().required('Username is required').max(20),
});

export const validate = (values) => {
  const errors = {};
  const errorsArr = [];

  if (!values.password) {
    errorsArr.push('Password is required');
  } else {
    if (values.password.length < 8)
      errorsArr.push(<span>&nbsp;&nbsp;&nbsp;-at least 8 characters</span>);

    if (!/[a-z]/.test(values.password))
      errorsArr.push(
        <span>&nbsp;&nbsp;&nbsp;-at least 1 lowercase letter</span>
      );

    if (!/[A-Z]/.test(values.password))
      errorsArr.push(
        <span>&nbsp;&nbsp;&nbsp;-at least 1 uppercase letter</span>
      );

    if (!/[a-zA-Z]+[^a-zA-Z\s]+/.test(values.password))
      errorsArr.push(
        <span>&nbsp;&nbsp;&nbsp;-at least 1 number or special character</span>
      );

    if (errorsArr.length) errorsArr.unshift(<span>Password must have:</span>);
  }
  if (errorsArr.length) {
    errors.password = (
      <>
        {errorsArr.map((error, index) => (
          <React.Fragment key={index}>
            {error}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  }

  if (!values.confirmPassword)
    errors.confirmPassword = 'Please re-type your password';
  else if (values.password.length && values.confirmPassword !== values.password)
    errors.confirmPassword = 'Passwords do not match';

  return errors;
};
