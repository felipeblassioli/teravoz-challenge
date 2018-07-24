async function callsRoute(fastify, options = {}) {
  const { teravozEventHandlerService } = options;
  if (!teravozEventHandlerService) {
    throw new Error('TeravozEventHandlerService is required!');
  }

  fastify.get('/calls/active', (request, reply) => {
    reply.code(200).send({
      data: teravozEventHandlerService.getOngoingCalls().toJS(),
    });
  });
}

module.exports = callsRoute;
