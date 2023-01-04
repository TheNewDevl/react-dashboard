import {useEffect, useState} from "react";
import Store from "../../api/Api";
import {StoreActionsEnum, UseStoreReturn} from "../types/types";
import MockData from "../../mocks/mockData";
import {DisplayData} from "../../models/DisplayData";
import {defaultFormatter} from "../../mocks/formatter";

/**
 * Custom hook to fetch data from the store.
 * The hook will return 3 states : the data, an error message and a boolean indicating if the data is loading.
 * @param {string} userId - The id of the user to fetch. If undefined, the hook will not fetch anything. If 'sample', the hook will return the mock data.
 * @param {StoreActionsEnum} type - The type of data to fetch. It will call different routes depending on the type.
 * @param {"format"} needFormattedData - Optional. If the data needs to be formatted before return it.
 * @return {Partial<UseStoreReturn>}
 */
export const useStore = (userId: string, type: StoreActionsEnum, needFormattedData?: 'format'): Partial<UseStoreReturn> => {
  const [datas, setDatas] = useState<Partial<UseStoreReturn>>({} as UseStoreReturn);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDatas = async () => {
      //Use Mock store or real store depending on user id
      const store = userId === "sample" ? MockData : Store;
      //Instantiate formatter only if needed
      const needToFormat = needFormattedData === 'format' && userId !== "sample";
      const formatter = needToFormat ? new DisplayData() : defaultFormatter;

      try {
        setIsLoading(true);
        switch (type) {
          case StoreActionsEnum.ALL: {
            const [averageSessions, perfData, activityData, user] = await Promise.all([
              store.averageSessions(userId),
              store.performance(userId),
              store.activity(userId),
              store.user(userId),
            ]);
            const formattedData = formatter.all(user, activityData, perfData, averageSessions);
            setDatas(formattedData);
            break;
          }
          case StoreActionsEnum.AVERAGE: {
            const data = await store.averageSessions(userId);
            setDatas({averageSessions: formatter.averageSessions(data)});
            break;
          }
          case StoreActionsEnum.ACTIVITY: {
            const data = await store.activity(userId);
            setDatas({activityData: formatter.activity(data)});
            break;
          }
          case StoreActionsEnum.PERFORMANCE: {
            const data = await store.performance(userId);
            setDatas({ perfData: formatter.performance(data) });
            break;
          }
          case StoreActionsEnum.USER: {
            const data = await store.user(userId);
            setDatas({ user: formatter.user(data)});
            break;
          }
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
