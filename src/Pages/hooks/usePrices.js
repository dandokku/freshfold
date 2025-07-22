import { useQuery } from 'react-query';
import axios from 'axios';

export const usePrices = () => {
  return useQuery('prices', () =>
    axios.get('https://freshfoldserver.onrender.com/api/prices')
  );
};
