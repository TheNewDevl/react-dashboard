import { createContext, PropsWithChildren, useContext, useState } from "react";
import {User, UserResponse} from "../types/types";

interface UserContextProps {
  user: User | undefined;
  setUser: (user: User | UserResponse) => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUserState] = useState<User>();
  const setUser = (user: User | UserResponse): void => setUserState(user as User);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
/** Created by carlos on 26/12/2022 */
