import 'semantic-ui-css/semantic.min.css';
import { compose } from 'recompose';
import { Container, Grid } from 'semantic-ui-react';
import provideContext from '../hocs/provideContext';
import TeravozServiceContext from '../contexts/TeravozServiceContext';
import ApiServiceContext from '../contexts/ApiServiceContext';
import ActiveCallsCard from '../components/ActiveCallsCard';
import MakeCallCard from '../components/MakeCallCard';
import EventFeed from '../components/EventFeed';
import RandomSimulationToggle from '../components/RandomSimulationToggle';

function IndexPageComponent(props) {
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
            <ActiveCallsCard initialActiveCalls={props.initialActiveCalls} />
          </Grid.Column>
          <Grid.Column>
            <EventFeed />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

const IndexPage = compose(
  provideContext(TeravozServiceContext),
  provideContext(ApiServiceContext)
)(IndexPageComponent);

IndexPage.getInitialProps = async ({ req }) => {
  return {
    initialActiveCalls: await ApiServiceContext.defaultValue.getActiveCalls(),
  };
};

export default IndexPage;
