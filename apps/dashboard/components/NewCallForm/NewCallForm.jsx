import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';
import { withFormik } from 'formik';
import * as yup from 'yup';

function ValidationErrorsList({ errors }) {
  return <ul>{errors.map((message, i) => <li key={i}>{message}</li>)}</ul>;
}

ValidationErrorsList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

function NewCallForm({
  isValid,
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) {
  const errorHeader = 'Validation Error';
  const errorContent = <ValidationErrorsList errors={Object.values(errors)} />;

  return (
    <Form error={!isValid}>
      <Form.Group widths="equal">
        <Form.Input
          name="phoneNumber"
          label="Customer PhoneNumber"
          error={!!errors.phoneNumber}
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        <Form.Input
          name="targetDuration"
          label="Call Duration (in seconds)"
          error={!!errors.targetDuration}
          value={values.targetDuration}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
      </Form.Group>

      <Message error header={errorHeader} content={errorContent} />
      <Button type="submit" loading={isSubmitting} onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: _ => ({
    phoneNumber: '+551199999999',
    targetDuration: 10,
  }),
  isInitialValid: true,
  validateOnChange: true,
  validationSchema: yup.object().shape({
    phoneNumber: yup.string().required(),
    targetDuration: yup
      .number()
      .positive('Target call duration must be a positive number.')
      .required(),
  }),
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    // TODO: capture error and display in the form
    props.newCall(values).then(() => {
      setSubmitting(false);
    });
  },
})(NewCallForm);
