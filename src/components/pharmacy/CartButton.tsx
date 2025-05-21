'use client';

import React, { useState } from 'react';
import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@/contexts/CartContext';
import { Cart } from './Cart';

export const CartButton: React.FC = () => {
  const { totalItems } = useCart();
  const [cartVisible, setCartVisible] = useState(false);

  const showCart = () => {
    setCartVisible(true);
  };

  const hideCart = () => {
    setCartVisible(false);
  };

  return (
    <>
      <Badge count={totalItems} offset={[-5, 5]}>
        <Button
          type="text"
          icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
          onClick={showCart}
          style={{ marginLeft: 8 }}
        />
      </Badge>

      <Cart visible={cartVisible} onClose={hideCart} />
    </>
  );
};
