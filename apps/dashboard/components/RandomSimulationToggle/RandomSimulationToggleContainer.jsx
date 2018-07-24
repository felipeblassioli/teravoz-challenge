import RandomSimulationToggle from './RandomSimulationToggle';
import { compose, withState, mapProps } from 'recompose';
import TeravozServiceContext from '../../contexts/TeravozServiceContext';
import pollForever from '../../hocs/pollForever';
import consumeContext from '../../hocs/consumeContext';

const pollSimulationStatusForever = pollForever(
  ({ teravozService, setSimulationStatus }) => {
    teravozService.getSimulationStatus().then(setSimulationStatus);
  },
  {
    interval: 5000,
  }
);

const enhance = compose(
  consumeContext(TeravozServiceContext, 'teravozService'),
  withState(
    'simulationStatus',
    'setSimulationStatus',
    ({ initialSimulationStatus }) => initialSimulationStatus
  ),
  mapProps(({ simulationStatus, ...props }) => ({
    active: simulationStatus === 'RUNNING',
    ...props,
  })),
  pollSimulationStatusForever
);

export default enhance(RandomSimulationToggle);
