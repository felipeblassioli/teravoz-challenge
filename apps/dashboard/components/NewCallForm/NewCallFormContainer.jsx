import NewCallForm from './NewCallForm';
import TeravozServiceContext from '../../contexts/TeravozServiceContext';
import consumeContext from '../../hocs/consumeContext';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
  consumeContext(TeravozServiceContext, 'teravozService'),
  withHandlers({
    newCall: ({ teravozService }) => payload => teravozService.newCall(payload),
  })
);

export default enhance(NewCallForm);
