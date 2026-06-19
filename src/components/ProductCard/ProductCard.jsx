import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart, incrementItem, decrementItem, selectItemInCart, selectCartLocked } from '../../store/slices/cartSlice';
import QuantityControl from '../QuantityControl/QuantityControl';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector(selectItemInCart(product.id));
  const locked = useSelector(selectCartLocked);

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
      toast.error(`Доступно только ${product.stock} шт.`);
      return;
    }
    dispatch(incrementItem(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementItem(product.id));
  };

  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.name}
        onClick={() => navigate(`/products/${product.id}`)}
        className={styles.thumb}
      />
      <div className={styles.info}>
        <h3 onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h3>
        <p className={styles.price}>{product.price.toFixed(2)}₽</p>
        <p className={styles.desc}>{product.shortDescription}</p>
        {cartItem ? (
          <QuantityControl
            quantity={cartItem.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            atMax={cartItem.quantity >= product.stock}
          />
        ) : (
          <button className={styles.addBtn} onClick={handleAdd}>Добавить в корзину</button>
        )}
      </div>
    </div>
  );
}