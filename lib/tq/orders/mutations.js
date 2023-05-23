import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder, updateOrder, addOrder } from '@/lib/tq/orders/api';
import { STORAGE_KEY } from '@/lib/tq/orders/settings';

export const useAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};
