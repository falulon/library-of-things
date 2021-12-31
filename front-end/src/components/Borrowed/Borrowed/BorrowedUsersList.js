import AllBorrowedItems from "./AllBorrowedItems";

const BorrowedUsersList = ({ users }) => {
  if (!users || users.length < 1) return <p>אין חפצים מושאלים .</p>;
  return users.map((user) => {
    return (
      <article key={user._id}>
        <h5>{user.name}</h5>
        <h4>חפצים מושאלים:</h4>
        <AllBorrowedItems
          items={user.currentlyBorrowing}
          userName={user.name}
          userId={user._id}
        />
      </article>
    );
  });
};

export default BorrowedUsersList;
