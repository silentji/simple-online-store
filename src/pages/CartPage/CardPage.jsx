import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems, selectCartTotal,
  updateQuantity, removeFromCart, clearCart
} from '../../store/slices/cartSlice';
import { placeOrder, selectLastConfirmation } from '../../store/slices/ordersSlice';
import styles from './CartPage.module.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const confirmation = useSelector(selectLastConfirmation);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    dispatch(placeOrder(items));
    dispatch(clearCart());
  };

  const handleCancel = () => {
    dispatch(clearCart());
  };

  if (confirmation) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <h2>🎉 Заказ создан!</h2>
          <p>Номер подтверждения: <strong>{confirmation}</strong></p>
          <button onClick={() => navigate('/products')}>Продолжить покупки</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2>Корзина</h2>
      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>Корзина пуста.</p>
          <button onClick={() => navigate('/products')}>Смотреть товары</button>
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr><th>Товар</th><th>Цена</th><th>Количество</th><th>Промежуточная сумма</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.productId}>
                  <td>#{item.productId} — {item.name}</td>
                  <td>{item.price.toFixed(2)}₽</td>
                  <td>
                    <input
                      type="number" min="1" value={item.quantity}
                      onChange={(e) => dispatch(updateQuantity({ productId: item.productId, quantity: e.target.value }))}
                      className={styles.qtyInput}
                    />
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}₽</td>
                  <td>
                    <button className={styles.removeBtn} onClick={() => dispatch(removeFromCart(item.productId))}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.footer}>
            <p className={styles.total}>Итого: <strong>{total.toFixed(2)}₽</strong></p>
            <div className={styles.actions}>
              <button className={styles.moreBtn} onClick={() => navigate('/products')}>Продолжить просмотр товаров</button>
              <button className={styles.cancelBtn} onClick={handleCancel}>Отменить заказ</button>
              <button className={styles.placeBtn} onClick={handlePlaceOrder}>Создать заказ</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}