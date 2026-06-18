import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <img src={product.thumbnail} alt={product.name} />
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p className={styles.price}>{product.price.toFixed(2)}₽</p>
        <p className={styles.desc}>{product.shortDescription}</p>
        <button onClick={() => navigate(`/products/${product.id}`)}>
          Выбрать
        </button>
      </div>
    </div>
  );
}