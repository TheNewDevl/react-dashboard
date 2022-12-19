import { useEffect, useState } from "react";
import Store from "../api/Api";
import { UseStoreReturn } from "../types/types";

export const useStore = (userId: string | undefined): UseStoreReturn => {
  const [datas, setDatas] = useState<UseStoreReturn>({} as UseStoreReturn);

  useEffect(() => {
    const getDatas = async () => {
      const id = userId ? userId : null;
      try {
        setDatas({
          averageSessions: await Store.averageSessions(id),
          perfData: await Store.performance(id),
          activityData: await Store.activity(id),
          user: await Store.user(id),
        });
      } catch (e: any) {
        console.log(e);
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
