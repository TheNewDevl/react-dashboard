import {ActivityData, AllFormattedData, AverageDay, PerformanceData, User} from "../utils/types/types";

export class DisplayData {
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
    if (data?.data?.sessions?.length > 0) {
      const mapDays: { [key: number]: string } = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};
      let sessions: AverageDay[] = data.data.sessions;

      //Return an array whose first element will be the last day of the week and the last element the first day to allow the line to join the values
      return Array.from({length: 9}, (v, i) => {
        const l = sessions[i-1]?.sessionLength;
        const day = sessions[i-1]?.day;
        return i === 0 ? { day: mapDays[7], sessionLength: sessions[6]?.sessionLength || 0 }// Last day of the week
            :  i === 8 ? { day: mapDays[1], sessionLength: sessions[0]?.sessionLength || 0 }/// First day of the week
            // Other days (in the middle) L-M-M-J-V-S-D
            : {
                day: (day && day > 0) || day < 8 ? mapDays[day as number] : mapDays[i - 1],
                sessionLength: l && l >= 0 && l < 500 ? l : 0
              };
      });
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
  }): PerformanceData[] {
    if ( data?.data?.kind && data?.data?.data?.length > 0 ) {
      // Format the catégories to display
      Object.entries(data.data.kind).map(v => {
        if (/cardio/i.test(v[1])) data.data.kind[+v[0]] = "Cardio"
        else if (/speed/i.test(v[1])) data.data.kind[+v[0]] = "Vitesse"
        else if (/endurance/i.test(v[1])) data.data.kind[+v[0]] = "Endurance";
        else if (/energy/i.test(v[1])) data.data.kind[+v[0]] = "Énergie";
        else if (/intensity/i.test(v[1])) data.data.kind[+v[0]] = "Intensité";
        else if (/strength/i.test(v[1])) data.data.kind[+v[0]] = "Force";
      });

      // Format the data
      return data.data.data.map((v, i: number) => ({
        value: v.value ?? 0,
        category: v.kind && data.data.kind[v.kind] || `Catégorie ${i + 1}`,
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
  activity(data: { data: { sessions: { day: string; kilogram: number; calories: number }[] } }): ActivityData[] {
    if (data?.data?.sessions?.length > 0) {
      return data.data.sessions.map((v, i) => {
        // Convert the date into the day of the month
        const day = new Date(v.day).getDate();
        return {
          day: +(day ?? v.day ?? i + 1),
          "Poids (kg)": v.kilogram ?? 0,
          "Calories brulées (kCal)": v.calories ?? 0,
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
    if (data?.data) {
      //firstName
      if (data.data.hasOwnProperty("userInfos") && data.data.userInfos.hasOwnProperty("firstName")) {
        user.firstName = data.data.userInfos.firstName;
      }

      //dayScore
      user.dayScore.push({
        name: "Score",
        value: data.data.todayScore * 100 ?? data.data.score * 100 ?? 0,
      });

      //keyData
      if (data.data.hasOwnProperty("keyData")) {
        for (let [key, value] of Object.entries(data.data.keyData as { [key: string]: number })) {
          if (/calor/i.test(key)) {
            user.keyData.push({ Calories: `${(value / 1000).toFixed(3).replace(".", ",")}kCal` });
          } else if (/prote/i.test(key)) {
            user.keyData.push({ Protéines: `${value}g` });
          } else if (/carbo/i.test(key)) {
            user.keyData.push({ Glucides: `${value}g` });
          } else if (/lipid/i.test(key)) {
            user.keyData.push({ Lipides: `${value}g` });
          }
        }
      }
    }

    return user;
  }

  all(userData:any, activityData:any, performanceData:any, sessionData:any): AllFormattedData {
    return {
      user: this.user(userData),
      activityData: this.activity(activityData),
      perfData: this.performance(performanceData),
      averageSessions: this.averageSessions(sessionData),
    }
  }
}
