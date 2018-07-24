import { Card, List } from 'semantic-ui-react'

const ActiveCallsList = () => (
  <List animated verticalAlign='middle'>
    <List.Item>
      <List.Icon name='phone volume' verticalAlign='middle' size='large'/>
      <List.Content>
        <List.Header>+55119999999</List.Header>
        duration 00:12
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='phone volume' verticalAlign='middle' size='large'/>
      <List.Content>
        <List.Header>+55119999999</List.Header>
        duration 00:12
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='phone volume' verticalAlign='middle' size='large'/>
      <List.Content>
        <List.Header>+55119999999</List.Header>
        duration 00:12
      </List.Content>
    </List.Item>

    <List.Item>
      <List.Icon name='phone volume' verticalAlign='middle' size='large'/>
      <List.Content>
        <List.Header>+55119999999</List.Header>
        duration 00:12
      </List.Content>
    </List.Item>

  </List>
)

const ActiveCallsCard = () => (
  <Card fluid>
    <Card.Content>
      <Card.Header>Active Calls</Card.Header>
    </Card.Content>
    <Card.Content>
      <ActiveCallsList />
    </Card.Content>
  </Card>
)

export default ActiveCallsCard;
