function consumeContext(Context, propName) {
  return BaseComponent => props => (
    <Context.Consumer>
      {value => <BaseComponent {...props} {...{ [propName]: value }} />}
    </Context.Consumer>
  );
}

export default consumeContext;
