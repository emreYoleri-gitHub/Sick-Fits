import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
  });
  return (
    <BigButton
      onClick={removeFromCart}
      title="Remove This Item from Cart"
      disabled={loading}
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;