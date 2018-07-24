import { Button, Form } from 'semantic-ui-react';

function NewCallForm() {
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Customer PhoneNumber</label>
          <input placeholder="+551199999999" />
        </Form.Field>
        <Form.Field>
          <label>Call Duration (in seconds)</label>
          <input placeholder="10" />
        </Form.Field>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default NewCallForm;
