import { useEffect, useState } from "react";
import Store from "../../api/Api";
import { StoreActionsEnum, UseStoreReturn } from "../types/types";
import MockData from "../../mocks/mockData";

export const useStore = (userId: string, type: StoreActionsEnum): Partial<UseStoreReturn> => {
  const [datas, setDatas] = useState<Partial<UseStoreReturn>>({} as UseStoreReturn);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDatas = async () => {
      //Use Mock store or real store depending on user id
      const store = userId === "sample" ? MockData : Store;

      try {
        setIsLoading(true);

        switch (type) {
          case StoreActionsEnum.ALL:
            const [averageSessions, perfData, activityData, user] = await Promise.all([
              store.averageSessions(userId),
              store.performance(userId),
              store.activity(userId),
              store.user(userId),
            ]);
            setDatas({ averageSessions, perfData, activityData, user });
            break;
          case StoreActionsEnum.AVERAGE:
            setDatas({ averageSessions: await store.averageSessions(userId) });
            break;
          case StoreActionsEnum.ACTIVITY:
            setDatas({ activityData: await store.activity(userId) });
            break;
          case StoreActionsEnum.PERFORMANCE:
            setDatas({ perfData: await store.performance(userId) });
            break;
          case StoreActionsEnum.USER:
            setDatas({ user: await store.user(userId) });
            break;
        }
      } catch (e: any) {
        setError(e.message);
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) {
      getDatas();
    }
  }, [userId, type]);

  return {
    averageSessions: datas.averageSessions,
    perfData: datas.perfData,
    activityData: datas.activityData,
    user: datas.user,
    error,
    isLoading,
  };
};
