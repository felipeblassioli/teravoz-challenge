import 'semantic-ui-css/semantic.min.css';
import { Container, Grid } from 'semantic-ui-react';

import ActiveCallsCard from '../components/ActiveCallsCard';
import MakeCallCard from '../components/MakeCallCard';
import EventFeed from '../components/EventFeed';
import RandomSimulationToggle from '../components/RandomSimulationToggle';

function IndexPage() {
  return (
    <Container>
      <div style={{ marginBottom: '16px' }}>
        Random simulation: <RandomSimulationToggle />
      </div>
      <Grid centered columns={1}>
        <Grid.Column>
          <MakeCallCard />
        </Grid.Column>

        <Grid.Row centered columns={2}>
          <Grid.Column>
            <ActiveCallsCard />
          </Grid.Column>
          <Grid.Column>
            <EventFeed />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default IndexPage;
