import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useBorrowContext } from "../context/borrow_context";

import { PageHero } from "../components";
import UsersList from "../components/Borrowed/Reserved/UsersList";
import BorrowedUsersList from "../components/Borrowed/Borrowed/BorrowedUsersList";
import AccessRestricted from "../components/AccessRestricted";

const ReservedItemsList = () => {
  const { myUser } = useUserContext();
  const {
    getAllReservedItems,
    reservedItemsByUsers,
    getAllBorrowedItems,
    borrowedItemsByUsers,
    numberOfBorrowing,
  } = useBorrowContext();
  useEffect(() => {
    getAllReservedItems();
    getAllBorrowedItems();
    // eslint-disable-next-line
  }, [numberOfBorrowing]);

  return (
    <main>
      <PageHero title=' חפצים שמורים ומושאלים' />
      {!myUser || myUser.authLevel < 1 ? (
        <AccessRestricted />
      ) : (
        <Wrapper className='page'>
          <div className='section-center products'>
            <div>
              <UsersList users={reservedItemsByUsers} />
            </div>
          </div>
          <div className='section-center products'>
            <BorrowedUsersList users={borrowedItemsByUsers} />
          </div>
        </Wrapper>
      )}
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ReservedItemsList;
