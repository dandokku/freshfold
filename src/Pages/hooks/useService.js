import { useQuery } from 'react-query';
import axios from 'axios';

export const useService = (serviceId) => {
  return useQuery(['service', serviceId], () =>
    axios.get(`http://localhost:9000/api/services/${serviceId}`)
  );
};
