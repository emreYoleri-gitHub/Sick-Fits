import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import DisplayError from "../components/ErrorMessage";
import formatMoney from "../lib/formatMoney";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import SuccessMessage from "../components/SuccessMessage";
import Loading from "../components/Loading";

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInAnOrder = (order) => {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
};

const OrdersPage = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <Loading />;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      {allOrders.length === 0 ? (
        <SuccessMessage>You do not have an order yet.</SuccessMessage>
      ) : (
        <SuccessMessage>You have {allOrders.length} orders!</SuccessMessage>
      )}
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInAnOrder(order)} Items</p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? "" : "s"}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default OrdersPage;
