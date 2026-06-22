import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectProductById } from '../../store/slices/productsSlice';
import { addToCart, incrementItem, decrementItem, selectItemInCart, selectCartLocked } from '../../store/slices/cartSlice';
import QuantityControl from '../../components/QuantityControl/QuantityControl';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useSelector(selectProductById(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector(selectItemInCart(Number(id)));
  const locked = useSelector(selectCartLocked);

  if (!product) return <div className={styles.page}>Товар не найден.</div>;

  const handleAdd = () => {
    if (locked) {
      toast.error('Оформите или отмените текущий заказ перед добавлением товаров');
      return;
    }
    dispatch(addToCart({ productId: product.id, name: product.name, price: product.price, stock: product.stock }));
    toast.success(`«${product.name}» добавлен в корзину`);
  };

  const handleIncrement = () => {
    if (cartItem.quantity >= product.stock) {
      toast.warn(`Выбрано максимальное количество: ${product.stock} шт.`);
      return;
    }
    dispatch(incrementItem(product.id));
  };

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/products')}>← К товарам</button>
      <div className={styles.detail}>
        <img src={product.thumbnail} alt={product.name} />
        <div className={styles.info}>
          <p className={styles.id}>Арт. #{product.id}</p>
          <h2>{product.name}</h2>
          <p className={styles.price}>{product.price.toFixed(2)}₽</p>
          <p>{product.longDescription}</p>
          <p className={styles.stock}>В наличии: {product.stock} шт.</p>
          {cartItem ? (
            <div className={styles.inCartRow}>
              <QuantityControl
                quantity={cartItem.quantity}
                onIncrement={handleIncrement}
                onDecrement={() => dispatch(decrementItem(product.id))}
                atMax={cartItem.quantity >= product.stock}
              />
              <button className={styles.inCartNote} onClick={() => navigate('/cart')}>в корзине</button>
            </div>
          ) : (
            <button onClick={handleAdd} className={styles.addBtn}>Добавить в корзину</button>
          )}
        </div>
      </div>
    </div>
  );
}