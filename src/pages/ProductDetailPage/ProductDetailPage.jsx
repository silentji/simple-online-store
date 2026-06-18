import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useSelector(selectProductById(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  if (!product) return <div className={styles.page}>Товар не найден.</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, name: product.name, price: product.price }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/products')}>← Продолжить просмотр товаров</button>
      <div className={styles.detail}>
        <img src={product.thumbnail} alt={product.name} />
        <div className={styles.info}>
          <p className={styles.id}>ID: #{product.id}</p>
          <h2>{product.name}</h2>
          <p className={styles.price}>{product.price.toFixed(2)}₽</p>
          <p>{product.longDescription}</p>
          <p className={styles.stock}>В наличии: {product.stock}</p>
          <button onClick={handleAddToCart} className={styles.addBtn}>Добавить в корзину</button>
          {added && <div className={styles.confirmation}>✅ Товар добавлен!</div>}
        </div>
      </div>
    </div>
  );
}