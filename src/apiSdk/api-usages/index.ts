import axios from 'axios';
import queryString from 'query-string';
import { ApiUsageInterface } from 'interfaces/api-usage';
import { GetQueryInterface } from '../../interfaces';

export const getApiUsages = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/api-usages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createApiUsage = async (apiUsage: ApiUsageInterface) => {
  const response = await axios.post('/api/api-usages', apiUsage);
  return response.data;
};

export const updateApiUsageById = async (id: string, apiUsage: ApiUsageInterface) => {
  const response = await axios.put(`/api/api-usages/${id}`, apiUsage);
  return response.data;
};

export const getApiUsageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/api-usages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteApiUsageById = async (id: string) => {
  const response = await axios.delete(`/api/api-usages/${id}`);
  return response.data;
};
