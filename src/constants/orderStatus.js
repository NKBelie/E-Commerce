export const ORDER_STATUS = {
  DELIVERED: 'success',
  PAID: 'success',
  SHIPPED: 'primary',
  PENDING: 'warning',
  CANCELLED: 'danger',
};

export const getOrderStatusVariant = (status) =>
  ORDER_STATUS[status?.toUpperCase()] ?? 'default';
