import { useCart }
from "../../features/cart/hooks/useCart";

export default function CartDebug() {
  const {
    items,
    cartCount,
  } = useCart();

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "white",
        border: "1px solid #ddd",
        padding: "12px",
        zIndex: 999,
      }}
    >
      <h4>
        Cart ({cartCount})
      </h4>

      {items.map((item) => (
        <div
          key={`${item.productId}-${item.color}-${item.size}`}
        >
          {item.title}

          {" - "}

          {item.color}

          {" - "}

          {item.size}

          {" x "}

          {item.quantity}
        </div>
      ))}
    </div>
  );
}