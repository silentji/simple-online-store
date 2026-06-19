import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../../store/slices/cartSlice';
import { selectOrders } from '../../store/slices/ordersSlice';
import styles from './Navbar.module.css';

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const orders = useSelector(selectOrders);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>🛍️ SimpleStore</Link>
      <div className={styles.links}>
        <Link to="/orders" className={styles.link}>
          Заказы {orders.length > 0 && <span className={styles.badge}>{orders.length}</span>}
        </Link>
        <Link to="/cart" className={styles.cartBtn}>
          🛒 Корзина {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}