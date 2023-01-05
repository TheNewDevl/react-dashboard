import {
  ActivityData,
  ActivityResponse,
  AllFormattedData,
  AverageDay,
  AverageResponse,
  PerformanceData, PerformanceResponse,
  User, UserResponse
} from "../utils/types/types";

/**
 * @description This class is responsible for formatting the data from the API.
 * Methods take data from the API calls as param and return the data in the correct format to be used in the graphs
 */
export class DisplayDataFormatter {
  /**
   * Return an array of objects with the average session length per day mapped from API response data or an empty array if data is missing or not valid
   * @param {Object} averageRes from API || undefined
   * @param {number} averageRes.day - day of the month
   * @param {number} averageRes.sessionLength - average session length in minutes
   * @return {Array.<{day: string, sessionLength: number, myArray: Array}>} an array of objects
   * @example
   * const data = await store.averageSessions(userId)
   * const formattedData = new DisplayDataFormatter().averageSessions(data);
   */
  averageSessions(averageRes: AverageResponse): AverageDay[] {
    if (averageRes?.data?.sessions?.length > 0) {
      const mapDays: { [key: number]: string } = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};
      const sessions: AverageDay[] = averageRes.data.sessions;

      //Return an array whose first element will be the last day of the week and the last element the first day to allow the line to join the values
      return Array.from({length: 9}, (v, i) => {
        const l = sessions[i-1]?.sessionLength;
        const day = sessions[i-1]?.day;
        return i === 0 ? { day: mapDays[7], sessionLength: sessions[6]?.sessionLength || 0 }// Last day of the week
            :  i === 8 ? { day: mapDays[1], sessionLength: sessions[0]?.sessionLength || 0 }// First day of the week
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
   * Return an array of objects with the performance data mapped from API response data or and empty array if data is missing or not valid
   * @param {Object} perfRes from API || undefined
   * @param {Array} perfRes.data - array of objects
   * @param {number} perfRes.data[].value - value of the performance
   * @param {number} perfRes.data[].kind  - kind of performance
   * @param {{[key: string]: string}} perfRes.kind - object with the kind of performance as key and the name of the performance as value
   * @return {{value: number, category: string}[] | []}   */
  performance(perfRes: PerformanceResponse): PerformanceData[] {
    if ( perfRes?.data?.kind && perfRes?.data?.data?.length > 0 ) {
      // Format the catégories to display
      Object.entries(perfRes.data.kind).map(v => {
        if (/cardio/i.test(v[1])) perfRes.data.kind[+v[0]] = "Cardio"
        else if (/speed/i.test(v[1])) perfRes.data.kind[+v[0]] = "Vitesse"
        else if (/endurance/i.test(v[1])) perfRes.data.kind[+v[0]] = "Endurance";
        else if (/energy/i.test(v[1])) perfRes.data.kind[+v[0]] = "Énergie";
        else if (/intensity/i.test(v[1])) perfRes.data.kind[+v[0]] = "Intensité";
        else if (/strength/i.test(v[1])) perfRes.data.kind[+v[0]] = "Force";
      });

      // Format the data
      return perfRes.data.data.map((v, i: number) => ({
        value: v.value ?? 0,
        category: v.kind && perfRes.data.kind[v.kind] || `Catégorie ${i + 1}`,
      }));
    } else {
      return [];
    }
  }

  /**
   * Return an array of objects with the activity data mapped from API response data or and empty array if data is missing or not valid
   * @param {Object} activityRes from API || undefined
   * @param {Array} activityRes.data
   * @param {string} activityRes.data[].day - DD-MM-YYYY format
   * @param {number} activityRes.data[].kilogram - weight in kg
   * @param {number} activityRes.data[].calories - calories burned
   * @return {<{"Poids (kg)": number, "Calories brulées (kCal)": number, day: string | number}>[] | []}
   */
  activity(activityRes: ActivityResponse): ActivityData[] {
    if (activityRes?.data?.sessions?.length > 0) {
      return activityRes.data.sessions.map((v, i) => {
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
   * @param {object} userRes from API
   * @param {string} userRes.data.userInfos.firstName - user first name
   * @param {string} userRes.data.userInfos.lastName - user last name
   * @param {number} userRes.data.userInfos.age - user age
   * @param {number} userRes.data.keyData.calorieCount - calories
   * @param {number} userRes.data.keyData.carbohydrateCount - carbohydrates
   * @param {number} userRes.data.keyData.lipidCount - lipids
   * @param {number} userRes.data.keyData.proteinCount - proteins
   * @param {number | undefined} userRes.data.score - score
   * @param {number | undefined} userRes.data.todayScore - score
   * @return {User}
   */
  user(userRes: UserResponse): User {
    const ObjHasProp = (obj: object, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop);
    const user: User = { dayScore: [], firstName: "", keyData: [] };
    if (userRes?.data) {
      //firstName
      if (ObjHasProp(userRes.data, 'userInfos') && ObjHasProp(userRes.data.userInfos, 'firstName')) {
        user.firstName = userRes.data.userInfos.firstName;
      }

      //dayScore
      user.dayScore.push({
        name: "Score",
        value:( userRes.data.todayScore ?? userRes.data.score ?? 0) * 100,
      });

      //keyData
      if (ObjHasProp(userRes.data, 'keyData')) {
        for (const [key, value] of Object.entries(userRes.data.keyData as { [key: string]: number })) {
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

  /**
   * Return user, activity, performance, and session data mapped from API response data.
   * @param {UserResponse} userData - user data from API
   * @param {ActivityResponse} activityData - activity data from API
   * @param {PerformanceResponse} performanceData - performance data from API
   * @param {AverageResponse} sessionData - session data from API
   */
  all(userData: UserResponse, activityData: ActivityResponse, performanceData:PerformanceResponse, sessionData:AverageResponse): AllFormattedData {
    return {
      user: this.user(userData),
      activityData: this.activity(activityData),
      perfData: this.performance(performanceData),
      averageSessions: this.averageSessions(sessionData),
    }
  }
}
