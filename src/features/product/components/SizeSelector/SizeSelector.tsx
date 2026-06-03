import styles from "./SizeSelector.module.scss";

interface Variant {
  color: string;
  size: string;
  stock: number;
}

interface Props {
  variants: Variant[];
  selectedColor: string;
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  variants,
  selectedColor,
  selectedSize,
  onSelect,
}: Props) {
  const filteredVariants = variants.filter(
    (variant) => variant.color === selectedColor
  );

  return (
    <div>
      <h3>Capacity</h3>

      <div className={styles.sizes}>
        {filteredVariants.map((variant) => {
          const isActive =
            selectedSize === variant.size;

          return (
            <button
              key={variant.size}
              disabled={variant.stock === 0}
              onClick={() =>
                onSelect(variant.size)
              }
              className={
                isActive
                  ? styles.active
                  : ""
              }
            >
              <div className={styles.sizeLabel}>
                {variant.size}
              </div>

              {variant.stock > 0 &&
                variant.stock <= 2 && (
                  <small
                    className={
                      styles.lowStock
                    }
                  >
                    Only {variant.stock} left
                  </small>
                )}

              {variant.stock === 0 && (
                <small
                  className={
                    styles.soldOut
                  }
                >
                  Sold Out
                </small>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}