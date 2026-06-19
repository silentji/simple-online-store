import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductsPage.module.css';

const CATEGORIES = [
  { key: 'all', label: 'Все' },
  { key: 'headsets', label: '🎧 Наушники' },
  { key: 'keyboards', label: '⌨️ Клавиатуры' },
  { key: 'hubs', label: '🔌 Концентраторы' },
  { key: 'webcams', label: '📷 Веб-камеры' },
  { key: 'mice', label: '🖱️ Мыши' },
];

export default function ProductsPage() {
  const products = useSelector(selectProducts);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.page}>
      <h2>Товары</h2>
      <div className={styles.filters}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}