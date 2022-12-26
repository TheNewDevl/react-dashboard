import { useEffect, useState } from "react";
import Store from "../../api/Api";
import { UseStoreReturn } from "../types/types";
import MockData from "../../mocks/mockData";

export const useStore = (userId: string): Partial<UseStoreReturn> => {
  const [datas, setDatas] = useState<Partial<UseStoreReturn>>({} as UseStoreReturn);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDatas = async () => {
      //Use Mock store or real store depending on user id
      const store = userId === "sample" ? MockData : Store;

      try {
        const [averageSessions, perfData, activityData, user] = await Promise.all([
          store.averageSessions(userId),
          store.performance(userId),
          store.activity(userId),
          store.user(userId),
        ]);

        setDatas({ averageSessions, perfData, activityData, user });
      } catch (e: any) {
        setError(e.message);
        console.log(e.message);
      }
    };
    getDatas();
  }, [userId]);

  return {
    averageSessions: datas.averageSessions,
    perfData: datas.perfData,
    activityData: datas.activityData,
    user: datas.user,
  };
};
