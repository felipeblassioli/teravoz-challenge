import ActiveCallsCard from './ActiveCallsCard';
import ApiServiceContext from '../../contexts/ApiServiceContext';
import pollForever from '../../hocs/pollForever';
import consumeContext from '../../hocs/consumeContext';
import { compose, withState } from 'recompose';

const pollActiveCallsForever = pollForever(
  ({ apiService, setActiveCalls }) => {
    apiService.getActiveCalls().then(setActiveCalls);
  },
  {
    interval: 1000,
  }
);

const enhance = compose(
  consumeContext(ApiServiceContext, 'apiService'),
  withState(
    'activeCalls',
    'setActiveCalls',
    ({ initialActiveCalls }) => initialActiveCalls
  ),
  pollActiveCallsForever
);

export default enhance(ActiveCallsCard);
