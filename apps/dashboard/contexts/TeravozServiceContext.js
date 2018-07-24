import { createContext } from 'react';
import TeravozService from '../services/TeravozService';

const teravozServiceUrl = '/teravoz';

const serviceInstance = new TeravozService({ baseUrl: teravozServiceUrl });
const TeravozServiceContext = createContext(serviceInstance);
TeravozServiceContext.defaultValue = serviceInstance;

export default TeravozServiceContext;
