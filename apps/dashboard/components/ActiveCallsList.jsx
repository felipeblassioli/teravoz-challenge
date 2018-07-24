import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import dayjs from 'dayjs';

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function Item({ callId, theirNumber, ourNumber, timestamp }) {
  const duration = dayjs(new Date()).diff(dayjs(timestamp), 'seconds');
  return (
    <List.Item>
      <List.Icon name="phone volume" verticalAlign="middle" size="large" />
      <List.Content>
        <List.Header>{theirNumber}</List.Header>
        duration {formatDuration(duration)}
      </List.Content>
    </List.Item>
  );
}

function ActiveCallsList({ activeCalls }) {
  return (
    <List animated verticalAlign="middle">
      {activeCalls.map(props => <Item {...props} key={props.callId} />)}
    </List>
  );
}

ActiveCallsList.propTypes = {
  activeCalls: PropTypes.arrayOf(
    PropTypes.shape({
      callId: PropTypes.string,
      theirNumber: PropTypes.string,
      ourNumber: PropTypes.string,
    })
  ).isRequired,
};

export default ActiveCallsList;
