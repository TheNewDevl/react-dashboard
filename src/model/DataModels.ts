import { AverageDay, performanceData } from "../types/types";

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

  activity(data: any) {
    return data;
  }

  user(data: any) {
    return data;
  }
}
