import { useQuery } from 'react-query';
import axios from 'axios';

export const usePrices = () => {
  return useQuery('prices', () =>
    axios.get('http://localhost:9000/api/prices')
  );
};
