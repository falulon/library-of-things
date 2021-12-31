import AllReservedItems from "./AllReservedItems";
import { formatPrice } from "../../../utils/helpers";

const UsersList = ({ users }) => {
  if (!users || users.length < 1)
    return <p>הרשימה ריקה. אין חפצים שמחכים למשאילים.</p>;
  return users.map((user) => {
    const totalPrice = user.reservedItems.reduce(
      (sum, item) => sum + item.price,
      0
    );

    return (
      <article key={user._id}>
        <h5>{user.name}</h5>
        <p className='subtotal'>{formatPrice(totalPrice)}</p>
        <AllReservedItems
          items={user.reservedItems}
          userName={user.name}
          userId={user._id}
        />
      </article>
    );
  });
};

export default UsersList;
