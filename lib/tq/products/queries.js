import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProduct } from '@/lib/tq/products/api';
import { STORAGE_KEY } from '@/lib/tq/products/settings';

export const useProducts = ({
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    suspense: true,
    queryKey: [STORAGE_KEY],
    queryFn: fetchProducts,
    onSuccess,
    onError,
  });
