import { Card, Label } from 'semantic-ui-react';
import ActiveCallsList from '../ActiveCallsList';

function ActiveCallsCard({ activeCalls }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          Active Calls <Label circular>{activeCalls.length}</Label>{' '}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <ActiveCallsList activeCalls={activeCalls} />
      </Card.Content>
    </Card>
  );
}

export default ActiveCallsCard;
