import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../../store/slices/cartSlice';
import styles from './Navbar.module.css';

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>🛍️ Simple Store</Link>
      <Link to="/cart" className={styles.cartBtn}>
        🛒 Корзина {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </Link>
    </nav>
  );
}