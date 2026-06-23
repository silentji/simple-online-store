import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  selectCartItems, selectCartTotal, selectCartLocked,
  incrementItem, decrementItem, removeFromCart, clearCart, lockCart, unlockCart,
} from '../../store/slices/cartSlice';
import { placeOrder } from '../../store/slices/ordersSlice';
import QuantityControl from '../../components/QuantityControl/QuantityControl';
import { decreaseStock } from '../../store/slices/productsSlice';
import styles from './CartPage.module.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const locked = useSelector(selectCartLocked);

  const handlePlaceOrder = () => {
    const overStock = items.find((i) => i.quantity > i.stock);
    if (overStock) {
      toast.error(`«${overStock.name}»: доступно только ${overStock.stock} шт.`);
      return;
    }
    dispatch(placeOrder({ items, total }));
    dispatch(decreaseStock(items.map((i) => ({ productId: i.productId, quantity: i.quantity }))));
    dispatch(lockCart());
    toast.success('Заказ успешно оформлен!');
    dispatch(clearCart());
    navigate('/orders');
    dispatch(unlockCart());
  };

  const handleCancel = () => {
    dispatch(clearCart());
    dispatch(unlockCart());
    toast('Корзина очищена', { icon: '🗑️' });
  };

  return (
    <div className={styles.page}>
      <h2>Корзина</h2>

      {locked && (
        <div className={styles.lockedBanner}>
          У вас есть активный заказ. <button onClick={() => navigate('/orders')}>Перейти к заказам</button> или <button onClick={handleCancel}>Отменить и очистить</button>
        </div>
      )}

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Корзина пуста.</p>
          <button onClick={() => navigate('/products')}>К товарам</button>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <div key={item.productId} className={styles.row}>
                <span className={styles.name} onClick={() => navigate(`/products/${item.productId}`)}>#{item.productId} — {item.name}</span>
                <span className={styles.price}>{item.price.toFixed(2)}₽</span>
                <QuantityControl
                  quantity={item.quantity}
                  onIncrement={() => {
                    if (item.quantity >= item.stock) {
                      toast.error(`Доступно только ${item.stock} шт.`);
                      return;
                    }
                    dispatch(incrementItem(item.productId));
                  }}
                  onDecrement={() => dispatch(decrementItem(item.productId))}
                  atMax={item.quantity >= item.stock}
                />
                <span className={styles.subtotal}>{(item.price * item.quantity).toFixed(2)}₽</span>
                <button className={styles.removeBtn} onClick={() => dispatch(removeFromCart(item.productId))}>✕</button>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <p className={styles.total}>Итого: <strong>{total.toFixed(2)}₽</strong></p>
            <div className={styles.actions}>
              <button className={styles.moreBtn} onClick={() => navigate('/products')}>Смотреть ещё</button>
              <button className={styles.cancelBtn} onClick={handleCancel}>Отменить заказ</button>
              {!locked && (
                <button className={styles.placeBtn} onClick={handlePlaceOrder}>Оформить заказ</button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}