import { Card } from 'semantic-ui-react';
import ActiveCallsList from './ActiveCallsList';

function ActiveCallsCard({ initialActiveCalls }) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Active Calls</Card.Header>
      </Card.Content>
      <Card.Content>
        <ActiveCallsList initialActiveCalls={initialActiveCalls} />
      </Card.Content>
    </Card>
  );
}

export default ActiveCallsCard;
