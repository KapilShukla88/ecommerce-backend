/**
 * @description use to add the new orders
 * @param {*} data orders data
 * @param {*} orderRepository order repository - the order models
 * @returns `{....}`
 */
const addNewOrderUseCase = async (data, { orderRepository }) => {
  const order = await orderRepository.save(data);

  return order;
};

/**
 * @description to get the all the orders details
 * @param {*} userId
 * @param {*} orderRepository order model class
 * @returns `[{...}, {....}]`
 */
const getMyAllOrdersUseCase = async (userId, { orderRepository }) => {
  const orders = await orderRepository.findByUserId(userId);

  return orders;
};

export { addNewOrderUseCase, getMyAllOrdersUseCase };
