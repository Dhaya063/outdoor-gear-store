import { useCart } from "../hooks/useCart";

import styles from "./CartSidebar.module.scss";

export default function CartSidebar() {
  const {
    items,
    cartCount,
    removeItem,
    clearCart,
  } = useCart();

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3>🛒 Cart ({cartCount})</h3>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className={styles.clearBtn}
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>
          Your cart is empty
        </p>
      ) : (
        <>
          <div className={styles.items}>
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className={styles.item}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div>
                  <h4>{item.title}</h4>

                  <p>
                    {item.color} • {item.size}
                  </p>

                  <p>
                    Qty: {item.quantity}
                  </p>

                  <p>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    onClick={() =>
                      removeItem(
                        item.productId,
                        item.color,
                        item.size
                      )
                    }
                    className={
                      styles.removeBtn
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <h4>
              Total: $
              {total.toFixed(2)}
            </h4>
          </div>
        </>
      )}
    </aside>
  );
}