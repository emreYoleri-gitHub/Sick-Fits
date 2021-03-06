import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toogleCart = () => setCartOpen(!cartOpen);
  const closeCart = () => setCartOpen(false);
  const openCart = () => setCartOpen(true);

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toogleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
};

const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};
export { CartStateProvider, useCart };
