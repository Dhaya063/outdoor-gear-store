import AppRouter from "./app/router/AppRouter";

import {
  CartProvider,
} from "./features/cart/context/CartContext";

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;