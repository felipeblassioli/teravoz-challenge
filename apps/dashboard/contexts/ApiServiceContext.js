import { createContext } from 'react';
import ApiService from '../services/ApiService';

const apiServiceUrl = '/api';
const serviceInstance = new ApiService({ baseUrl: apiServiceUrl });
const ApiServiceContext = createContext(serviceInstance);
ApiServiceContext.defaultValue = serviceInstance;

export default ApiServiceContext;
