import { createContext } from 'react';
import getConfig from 'next/config';
import ApiService from '../services/ApiService';

const { publicRuntimeConfig } = getConfig();
const { apiServiceUrl } = publicRuntimeConfig;

const serviceInstance = new ApiService({ baseUrl: apiServiceUrl });
const ApiServiceContext = createContext(serviceInstance);
ApiServiceContext.defaultValue = serviceInstance;

export default ApiServiceContext;
