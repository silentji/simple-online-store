import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectOrders } from '../../store/slices/ordersSlice';
import { unlockCart } from '../../store/slices/cartSlice';
import styles from './OrdersPage.module.css';

export default function OrdersPage() {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const handleNewOrder = () => {
    dispatch(unlockCart());
    navigate('/products');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Мои заказы</h2>
        <button onClick={handleNewOrder} className={styles.newBtn}>+ Новый заказ</button>
      </div>

      {orders.length === 0 ? (
        <p className={styles.empty}>Заказов пока нет.</p>
      ) : (
        <div className={styles.list}>
          {[...orders].reverse().map((order) => (
            <div key={order.id} className={styles.card}>
              <div className={styles.summary} onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                <div>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.date}>{new Date(order.placedAt).toLocaleString('ru-RU')}</span>
                </div>
                <div className={styles.right}>
                  <span className={styles.status}>{order.status}</span>
                  <span className={styles.orderTotal}>{order.total.toFixed(2)}₽</span>
                  <span className={styles.toggle}>{expanded === order.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === order.id && (
                <div className={styles.items}>
                  <table>
                    <thead>
                      <tr><th>Товар</th><th>Цена</th><th>Кол-во</th><th>Сумма</th></tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.productId}>
                          <td>{item.name}</td>
                          <td>{item.price.toFixed(2)}₽</td>
                          <td>{item.quantity}</td>
                          <td>{(item.price * item.quantity).toFixed(2)}₽</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className={styles.itemsTotal}>Итого: <strong>{order.total.toFixed(2)}₽</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}