import { lifecycle } from 'recompose';

// FIXME: Dirty polling implementation, dangerous as hell
function pollForever(fn, options = { interval: 5000 }) {
  return lifecycle({
    componentDidMount() {
      setInterval(() => fn(this.props), options.interval);
    },
  });
}

export default pollForever;
