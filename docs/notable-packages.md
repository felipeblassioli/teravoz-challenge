## Notable Packages 

Table of Contents

- [Nextjs](#nextjs)
- [Recompose](#recompose)
- [Formik](#formik)
- [Semantic UI](#semantic-ui)
- [Redux + Redux logic](#redux--redux-logic)
- [Immutablejs](#immutablejs)
- [Ava](#ava)

### Nextjs

[Nextjs](https://github.com/zeit/next.js/) made React server side rendering trivial.
The development experience is really good, it has builting code-splitting and overall the API is really sensible.

Used in `apps/dashboard`

### Recompose

As per official react docs [Use HOCs For Cross-Cutting Concerns](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns)

The [recompose](https://github.com/acdlite/recompose) library is great for writing higher order components. The [creator](https://github.com/acdlite) currently works for facebook.

For an example see [ActiveCallsCardContainer.jsx](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/dashboard/components/ActiveCallsCard/ActiveCallsCardContainer.jsx)

```javascript
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
```

Used in `apps/dashboard`

### Formik

The [formik](https://github.com/jaredpalmer/formik) library in a nutshell: Build forms in React, without the tears.
It's trivial to handle form state and perform validations and show errors.

For an example see [NewCallForm.jsx](https://github.com/felipeblassioli/teravoz-challenge/blob/851f1995e085f4bf2d7e27d6ec24f2cd901ade05/apps/dashboard/components/NewCallForm/NewCallForm.jsx#L57) for an example.

```javascript
(...)
function NewCallForm({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) {
  (...)
  return ()
  (...)
        <Form.Input
          name="phoneNumber"
          label="Customer PhoneNumber"
          error={!!errors.phoneNumber}
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
  );
}
(...)
export default withFormik({
  mapPropsToValues: _ => ({
    phoneNumber: '+551199999999',
    targetDuration: 10,
  }),
  isInitialValid: true,
  validateOnChange: true,
  validationSchema: yup.object().shape({
    phoneNumber: yup.string().required(),
    targetDuration: yup
      .number()
      .positive('Target call duration must be a positive number.')
      .required(),
  })
})(NewCallForm);
```

Used in `apps/dashboard`

### Semantic UI

The [semantic-ui-react](https://react.semantic-ui.com/introduction) library is the official [Semantic UI](https://semantic-ui.com/) integration.
The Components are really intuitive and easy to use. I've used [material-ui](https://material-ui.com/getting-started/installation/) and [react-toolbox](http://react-toolbox.io/) in the past and I am still really impressed with semantic-ui.

Used in `apps/dashboard`

### Redux + Redux logic

Taken from [Redux docs](https://redux.js.org/)

> Redux is a predictable state container for JavaScript apps.
> It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
> I chose Redux to handle the app's state and data-flow.

Perhaps it is somewhat unusual to use redux for a server-side application, but it's not the library that is important, but the paradigm: In a event oriented application determinins is highly desirable and it fits perfectly with nodejs (since it's also event oriented).

For this challenge, redux is convenient because:
  - The business logic is decoupled. The challenge specification required the app to:
    - Delegate calls new users to 900 and returning users to 901. This is done at `logic/call-delegation-logic.js`
  - Teravoz events are trivially mapped 1:1 to [Redux actions](https://redux.js.org/basics/actions)
  - It's ease to test, because:
    - Injected dependencies are explicit and easily mocked.
    - State changes are deterministic, so we can describe behaviors/scenarios in a declarative way.
  - Since we do not hide the application state, it's really easy to persist it and continue after a restart (or crash).

Also we could drop redux and fit neatly in any micro-service architecture, the logic's are reactive to actions/events, so if we instead
listen for events from a message-bus such as Kafka the business logic wouldn't change much. In fact any file in the `logic` directory can
be seen as a microservice in a distributed system!

Used in `apps/api`

### Immutablejs
 
We use Facebook's [immutablejs](https://facebook.github.io/immutable-js/) because it's cheap to check for state changes.
And why we want cheap changes checks? Because we have a heavy IO operation: saving state to disk, so we do that only if something has changed;

Used in `apps/api`

### Ava
We use [ava](https://github.com/avajs/ava) instead of mocha because test files are run in parallel as separate processes, giving you even better performance and an isolated environment for each test file. Also having tests run concurrently forces you to write atomic tests, meaning tests don't depend on global state or the state of other tests, which is a great thing!

Used in `apps/api`
