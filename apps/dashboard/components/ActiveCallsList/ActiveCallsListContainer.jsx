import ActiveCallsList from './ActiveCallsList';
import ApiServiceContext from '../../contexts/ApiServiceContext';
import consumeContext from '../../hocs/consumeContext';
import { compose, withState, lifecycle } from 'recompose';

// FIXME: Dirty polling implementation, dangerous as hell
function pollActiveCallsForever(pollInterval) {
  return lifecycle({
    componentDidMount() {
      const { apiService, setActiveCalls } = this.props;
      setInterval(() => {
        apiService.getActiveCalls().then(setActiveCalls);
      }, pollInterval);
    },
  });
}

const enhance = compose(
  consumeContext(ApiServiceContext, 'apiService'),
  withState(
    'activeCalls',
    'setActiveCalls',
    ({ initialActiveCalls }) => initialActiveCalls
  ),
  pollActiveCallsForever(1000)
);

export default enhance(ActiveCallsList);
