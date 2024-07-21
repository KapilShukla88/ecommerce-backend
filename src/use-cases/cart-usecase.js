export const addToCartUseCase = async (body, user, { cartRepository }) => {
  const cartUserResponse = await cartRepository.findOne({ user_id: user?._id });
  if (cartUserResponse) {
    let filterCartData = cartUserResponse.cart_items.filter((cartItem) =>
      cartItem.product.equals(body.productId)
    );

    if (
      filterCartData &&
      filterCartData?.length > 0 &&
      Object.keys(filterCartData[0])
    ) {
      filterCartData[0].quantity = filterCartData[0].quantity + body.quantity;
      const restCartData = cartUserResponse.cart_items.filter(
        (cartItem) => !cartItem.product.equals(body.productId)
      );
      if (restCartData?.length > 0) {
        filterCartData = [filterCartData[0], ...restCartData];
      }
      const totalCount = cartUserResponse.total_count + body.quantity;

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
        cartUserResponse.total_count + body.quantity;
      cartUserResponse.cart_items.push({
        product: body.productId,
        quantity: body.quantity,
      });
      const response = await cartUserResponse.save();
      return response;
    }
  } else {
    const cartItem = {
      user_id: user._id,
      cart_items: [
        {
          product: body.productId,
          quantity: body.quantity,
        },
      ],
      total_count: body.quantity,
    };

    const response = await cartRepository.save(cartItem);
    return response;
  }
};

export const getAllProductUseCase = async (user, { cartRepository }) => {
  const response = await cartRepository.populate(user?._id, "products");

  return response || { user_id: user?._id, cart_items: [], total_count: 0 };
};

export const getCartCountUseCase = async (userId, { cartRepository }) => {
  const response = await cartRepository.findOne({ user_id: userId });
  return response?.total_count;
};

export const deleteCartItemUseCase = async (
  { productId },
  userId,
  { cartRepository }
) => {
  const cartResponse = await cartRepository.findOne({ user_id: userId });
  if (!cartResponse) {
    return {
      message: "Cart is empty.",
      total_count: 0,
    };
  }

  const filterProductCart = cartResponse?.cart_items?.filter((item) =>
    item.product?.equals(productId)
  );

  if (filterProductCart && filterProductCart?.length === 0) {
    return {
      message: "Item is not found against this product.",
      total_count: cartResponse?.total_count || 0,
    };
  }

  if (filterProductCart && filterProductCart?.length > 0) {
    if (cartResponse?.cart_items?.length === 1) {
      const deleteResponse = await cartRepository.deleteOne(userId);

      if (deleteResponse) {
        return {
          message: "Deleted successfully",
          total_count: 0,
        };
      }
    } else {
      const leftCartData = cartResponse?.cart_items?.filter(
        (item) => !item.product?.equals(productId)
      );
      cartResponse.cart_items = leftCartData;
      cartResponse.total_count =
        cartResponse.total_count - filterProductCart[0]?.quantity;

      const response = await cartResponse.save();
      return {
        message: "Item deleted from cart.",
        total_count: response?.total_count || 0,
      };
    }
  }

  throw new Error({ message: "Failed to delete an item from cart." });
};
