import { ActivityData, AverageDay, performanceData, User } from "../types/types";

export class DataModels {
  /**
   * Return an array of objects with the average session length per day mapped from API response data.
   * If any error occurs in the fetch, return and empty array.
   * @param {Object} data from API || undefined
   * @param {number} data.day
   * @param {number} data.sessionLength
   * @return {{day: string, sessionLength: number}[]}
   * @example
   * const data = await this._api.get(`${userId}/average-sessions`, new Headers());
   * const averageSessions = this.dataModels.averageSessions(data);
   */
  averageSessions(data: any): AverageDay[] {
    if (data && data.data && data.data?.sessions && data.data.sessions.length > 0) {
      const mapDays: { [key: number]: string } = {
        1: "L",
        2: "M",
        3: "M",
        4: "J",
        5: "V",
        6: "S",
        7: "D",
      };
      let sessions: AverageDay[] = data.data.sessions;
      let activityData = [{ day: mapDays[7], sessionLength: sessions[6]?.sessionLength || 0 }];

      for (let i = 0; i < 7; i++) {
        const l = sessions[i]?.sessionLength;
        const day = sessions[i]?.day;
        activityData.push({
          day: (day && day > 0) || day < 8 ? mapDays[day as number] : mapDays[i + 1],
          sessionLength: l && l >= 0 && l < 500 ? l : 0,
        });
      }
      activityData.push({ day: mapDays[1], sessionLength: sessions[0]?.sessionLength || 0 });
      return activityData;
    } else {
      return [];
    }
  }

  /**
   * Return an array of objects with the performance data mapped from API response data.
   * If any error occurs in the fetch, return and empty array.
   * @param {Object} data from API || undefined
   * @param {Array} data.data
   * @param {number} data.data[].value
   * @param {number} data.data[].kind
   * @param {Object} data.kind
   * @param {string} data.kind[string]
   * @return {{value: number, category: string}[]}   */
  performance(data: {
    data: { data: { value: number; kind: number }[]; kind: { [key: number]: string } };
  }): performanceData[] {
    if (
      data &&
      data.data &&
      data.data.hasOwnProperty("kind") &&
      data.data.hasOwnProperty("data") &&
      data.data.data.length > 0
    ) {
      // Format the catégories
      for (let [key, value] of Object.entries(data.data.kind)) {
        data.data.kind[+key] = value
          .replace(/cardio/i, "Cardio")
          .replace(/speed/i, "Vitesse")
          .replace(/endurance/i, "Endurance")
          .replace(/energy/i, "Énergie")
          .replace(/intensity/i, "Intensité")
          .replace(/strength/i, "Force");
      }
      // Format the data
      return data.data.data.map((v, i: number) => ({
        value: v.hasOwnProperty("value") ? v.value : 0,
        category:
          v.hasOwnProperty("kind") && data.data.kind[v.kind]
            ? data.data.kind[v.kind]
            : `Catégorie ${i + 1}`,
      }));
    } else {
      return [];
    }
  }

  /**
   * Return an array of objects
   * If any error occurs in the fetch, return and empty array.
   * @param {Object} data from API || undefined
   * @param {Array} data.data
   * @param {string} data.data[].day - date
   * @param {number} data.data[].kilogram
   * @param {number} data.data[].calories
   * @return {{"Poids (kg)": number, "Calories brulées (kCal)": number, day: string | number}[] | any[]}
   */
  activity(data: {
    data: { sessions: { day: string; kilogram: number; calories: number }[] };
  }): ActivityData[] {
    if (data && data.data && data.data.sessions && data.data.sessions.length > 0) {
      return data.data.sessions.map((v, index) => {
        // Convert the date into the day of the month
        const day = new Date(v.day).getDate();
        return {
          day: +(day ? day : v.day ? v.day : index + 1),
          "Poids (kg)": v.kilogram ? v.kilogram : 0,
          "Calories brulées (kCal)": v.calories ? v.calories : 0,
        };
      });
    } else {
      return [];
    }
  }

  /**
   * Return an object with the user data mapped from API response data.
   * The object will contain firstName, today score, and key data for the user.
   * If any information is missing, the value will be set to an empty string or empty array.
   * @param data from API || undefined
   * @return {User}
   */
  user(data: any): User {
    const user: User = { dayScore: [], firstName: "", keyData: [] };
    if (data && data.data) {
      //firstName
      if (
        data.data.hasOwnProperty("userInfos") &&
        data.data.userInfos.hasOwnProperty("firstName")
      ) {
        user.firstName = data.data.userInfos.firstName;
      }

      //dayScore
      const scoreKeyFilter = Object.keys(data.data).filter((key) => /score/i.test(key));
      if (scoreKeyFilter.length > 0) {
        user.dayScore.push({
          name: "Score",
          value: data.data[scoreKeyFilter[0]] * 100,
        });
      }
      //keyData
      if (data.data.hasOwnProperty("keyData")) {
        for (let [key, value] of Object.entries(data.data.keyData as { [key: string]: number })) {
          if (/calor/i.test(key)) {
            user.keyData.push({ Calories: `${(value / 1000).toFixed(3).replace(".", ",")}kCal` });
          }
          if (/prote/i.test(key)) {
            user.keyData.push({ Protéines: `${value}g` });
          }
          if (/carbo/i.test(key)) {
            user.keyData.push({ Glucides: `${value}g` });
          }
          if (/lipid/i.test(key)) {
            user.keyData.push({ Lipides: `${value}g` });
          }
        }
      }
    }

    return user;
  }
}
