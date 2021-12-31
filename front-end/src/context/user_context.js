import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { users_url as url } from "../utils/constants";
import axios from "axios";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    setupUserInfo();
    // eslint-disable-next-line
  }, [user]);

  const setupUserInfo = async () => {
    let searchEmailUrl;
    if (user && user.email) {
      searchEmailUrl = `${url}/email/${user.email}`;
      const { userFullName, userId, reservedItems, authLevel } =
        await fetchUserInfo(searchEmailUrl);
      setMyUser({
        ...user,
        name: userFullName,
        userId,
        reservedItems,
        authLevel,
      });
    }
  };

  const fetchUserInfo = async (url) => {
    // skip fetching from db, if signed up with a gmail account
    // if (user.name) {
    //   return { userFullName: user.name, userId: user.sub, reservedItems: [] };
    // }

    const response = await axios.get(url);
    const userId = response.data._id;
    const userFullName = response.data.name;
    const authLevel = response.data.authLevel || 0;
    const reservedItemsData = response.data.reservedItems;
    const reservedItems = reservedItemsData.map((item) => {
      return { ...item, id: item._id };
    });

    return { userFullName, userId, reservedItems, authLevel };
  };

  const attachItemsToUser = async (cart) => {
    const currentUrl = `${url}/reserve/${myUser.userId}`;
    await axios.post(currentUrl, cart);
    setMyUser((prevState) => {
      return {
        ...prevState,
        reservedItems: [...prevState.reservedItems, ...cart],
      };
    });
  };

  const removeItemsFromUser = async () => {
    const currentUrl = `${url}/reserve/${myUser.userId}`;
    const response = await axios.delete(currentUrl, {});
    console.log(response);
    setMyUser((prevState) => {
      return { ...prevState, reservedItems: [] };
    });

    // reset the current items in store - refresh the page
  };

  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        attachItemsToUser,
        removeItemsFromUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
