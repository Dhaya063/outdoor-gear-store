import styles from "./QuantityPicker.module.scss";

interface Props {
  quantity: number;
  max: number;
  onChange: (qty: number) => void;
}

export default function QuantityPicker({
  quantity,
  max,
  onChange,
}: Props) {
  return (
    <div className={styles.quantity}>
      <button
        onClick={() =>
          onChange(quantity - 1)
        }
        disabled={quantity <= 1}
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        onClick={() =>
          onChange(quantity + 1)
        }
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}