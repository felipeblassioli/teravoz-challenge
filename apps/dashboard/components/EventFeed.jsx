import { Card, Feed } from 'semantic-ui-react';

const events = [
  {
    date: '4 seconds Ago',
    summary: 'CALL_NEW event received',
    extraText: 'their_number=+5511999999 our_number=551199999999',
  },

  {
    date: '4 seconds Ago',
    summary: 'CALL_NEW event received',
    extraText: 'their_number=+5511999999 our_number=551199999999',
  },
  {
    date: '4 seconds Ago',
    summary: 'CALL_NEW event received',
    extraText: 'their_number=+5511999999 our_number=551199999999',
  },
  {
    date: '4 seconds Ago',
    summary: 'CALL_NEW event received',
    extraText: 'their_number=+5511999999 our_number=551199999999',
  },
];

const EventFeed = () => (
  <Card fluid>
    <Card.Content>
      <Card.Header>Events</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed events={events} />
    </Card.Content>
  </Card>
);

export default EventFeed;
