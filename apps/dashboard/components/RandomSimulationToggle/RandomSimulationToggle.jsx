import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

function RandomSimulationToggle({ active, onClick }) {
  const label = active ? 'Online' : 'Offline';
  const extraProps = active ? { positive: true } : { negative: true };
  return (
    <Button toggle active={active} {...extraProps} onClick={onClick}>
      {label}
    </Button>
  );
}

RandomSimulationToggle.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RandomSimulationToggle;
