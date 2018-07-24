import { createContext } from 'react';
import getConfig from 'next/config';
import TeravozService from '../services/TeravozService';

const { publicRuntimeConfig } = getConfig();
const { teravozServiceUrl } = publicRuntimeConfig;

const serviceInstance = new TeravozService({ baseUrl: teravozServiceUrl });
const TeravozServiceContext = createContext(serviceInstance);
TeravozServiceContext.defaultValue = serviceInstance;

export default TeravozServiceContext;
