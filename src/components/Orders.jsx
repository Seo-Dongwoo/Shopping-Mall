import useActions from "../hooks/useActions";
import useOrders from "../hooks/useOrders";
import usePrototypes from "../hooks/usePrototypes";
import { useMemo } from "react";

export default function Orders() {
  const orders = useOrders();
  const prototypes = usePrototypes();
  const { remove, removeAll } = useActions();

  // totalPrice 만들기
  const totalPrice = useMemo(() => {
    return orders
      .map((order) => {
        const { id, quantity } = order;
        const prototype = prototypes.find((p) => p.id === id);
        return prototype.price * quantity;
      })
      .reduce((l, r) => l + r, 0);
  }, [orders, prototypes]);
  // orders가 변할때마다 다시 계산된다.

  // 주문장바구니 만들기
  if (orders.length === 0) {
    return (
      <aside>
        <div className="empty">
          <div className="title">상품이 선택 되어 있지 않습니다.</div>
          <div className="subtitle">a + 를 눌러 상품을 추가해주세요.</div>
        </div>
      </aside>
    );
  }
  return (
    <aside>
      <div className="order">
        <div className="body">
          {orders.map((order) => {
            const { id } = order;
            const prototype = prototypes.find((p) => p.id === id);
            const click = () => {
              remove(id);
            };
            return (
              <div className="item" key={id}>
                <div className="img">
                  <video src={prototype.thumbnail} />
                </div>
                <div className="content">
                  <p className="title">
                    {prototype.title} x {order.quantity}
                  </p>
                </div>
                <div className="action">
                  <p className="price">$ {prototype.price * order.quantity}</p>
                  <button className="btn btn-link" onClick={click}>
                    <i className="icon icon--cross" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total">
          <hr />
          <div className="item">
            <div className="content">Total</div>
            <div className="action">
              <div className="price">$ {totalPrice}</div>
            </div>
            <buttin className="btn btn--link" onClick={removeAll}>
              <i className="icon icon--delete" />
            </buttin>
          </div>
          <button
            className="btn btn--secondary"
            style={{ width: "100%", marginTop: 10 }}
          >
            Checkout
          </button>
        </div>
      </div>
    </aside>
  );
}
