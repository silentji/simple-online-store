import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.hero}>
      <h1>Добро пожаловать в Simple Store</h1>
      <p>Найди для себя прекрасные товары по лучшим ценам!</p>
      <button onClick={() => navigate('/products')} className={styles.cta}>
        Смотреть товары
      </button>
    </div>
  );
}