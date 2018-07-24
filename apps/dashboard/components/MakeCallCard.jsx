import { Card } from 'semantic-ui-react';
import NewCallForm from './NewCallForm';

function MakeCallCard() {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Make Call</Card.Header>
      </Card.Content>

      <Card.Content>
        <NewCallForm />
      </Card.Content>
    </Card>
  );
}

export default MakeCallCard;
