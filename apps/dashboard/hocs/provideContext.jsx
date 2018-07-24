function provideContext(Context) {
  return BaseComponent => props => (
    <Context.Provider value={Context.defaultValue}>
      <BaseComponent {...props} />
    </Context.Provider>
  );
}

export default provideContext;
