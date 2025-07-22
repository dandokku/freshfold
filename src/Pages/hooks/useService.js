import { useQuery } from 'react-query';
import axios from 'axios';

export const useService = (serviceId) => {
  return useQuery(['service', serviceId], () =>
    axios.get(`https://freshfoldserver.onrender.com/api/services/${serviceId}`)
  );
};
