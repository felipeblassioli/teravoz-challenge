import IsomorphicFetchService from './IsomorphicFetchService';

class TeravozService extends IsomorphicFetchService {
  async getSimulationStatus() {
    const response = await this.fetch('/simulation/status');
    return response.data.status;
  }

  async newCall(payload) {
    await this.fetch('/simulation/call/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }
}

export default TeravozService;
