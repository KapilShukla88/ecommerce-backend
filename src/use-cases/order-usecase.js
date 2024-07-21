const addNewOrderUseCase = async (data, { orderRepository }) => {
  const order = await orderRepository.save(data);

  return order;
};

const getMyAllOrdersUseCase = async (userId, { orderRepository }) => {
  const orders = await orderRepository.findByUserId(userId);

  return orders;
};

export { addNewOrderUseCase, getMyAllOrdersUseCase };
