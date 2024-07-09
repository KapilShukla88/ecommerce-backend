export const addToCartUseCase = async (body, user, { cartRepository }) => {
  const cartUserResponse = await cartRepository.findOne({ user_id: user?._id });
  if (cartUserResponse) {
    let filterCartData = cartUserResponse.cart_items.filter((cartItem) =>
      cartItem.product.equals(body.cartItem.productId)
    );

    if (
      filterCartData &&
      filterCartData?.length > 0 &&
      Object.keys(filterCartData[0])
    ) {
      filterCartData[0].quantity =
        filterCartData[0].quantity + body.cartItem.quantity;
      const restCartData = cartUserResponse.cart_items.filter(
        (cartItem) => !cartItem.product.equals(body.cartItem.productId)
      );
      if (restCartData?.length > 0) {
        filterCartData = [filterCartData[0], ...restCartData];
      }
      const totalCount = cartUserResponse.total_count + body.cartItem.quantity;

      const updatedCartResponse = await cartRepository.updateOne(
        { user_id: user?._id },
        { cart_items: filterCartData, total_count: totalCount }
      );
      if (updatedCartResponse) {
        return { total_count: totalCount };
      }
      throw new Error("Failed to update the cart.");
    } else {
      cartUserResponse.total_count =
        cartUserResponse.total_count + body.cartItem.quantity;
      cartUserResponse.cart_items.push({
        product: body.cartItem.productId,
        quantity: body.cartItem.quantity,
      });
      const response = await cartUserResponse.save();
      return response;
    }
  } else {
    const cartItem = {
      user_id: user._id,
      cart_items: [
        {
          product: body.cartItem.productId,
          quantity: body.cartItem.quantity,
        },
      ],
      total_count: body.cartItem.quantity,
    };

    const response = await cartRepository.save(cartItem);
    return response;
  }
};

export const getAllProductUseCase = async (user, { cartRepository }) => {
  const response = await cartRepository.populate(user?._id, "products");

  return response || { user_id: user?._id, cart_items: [], total_count: 0 };
};

export const deleteCartItemUseCase = async (
  { cartId, productId },
  { cartRepository }
) => {
  const cartResponse = await cartRepository.findById(cartId);

  console.log("cartResponse =>>", cartResponse);
  return {};
};
