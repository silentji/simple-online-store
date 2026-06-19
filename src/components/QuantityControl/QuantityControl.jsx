import styles from './QuantityControl.module.css';

export default function QuantityControl({ quantity, onIncrement, onDecrement, atMax }) {
  return (
    <div className={styles.control}>
      <button onClick={onDecrement} className={styles.btn}>−</button>
      <span className={styles.qty}>{quantity}</span>
      <button onClick={onIncrement} className={`${styles.btn} ${atMax ? styles.disabled : ''}`} disabled={atMax}>+</button>
    </div>
  );
}