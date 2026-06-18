import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const products = useSelector(selectProducts);
  return (
    <div className={styles.page}>
      <h2>Товары</h2>
      <div className={styles.grid}>
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}