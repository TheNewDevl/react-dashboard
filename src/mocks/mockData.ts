/* eslint @typescript-eslint/no-unused-vars: 0 */

import {
  ActivityResponse,
  AverageResponse,
  PerformanceResponse,
  UserResponse
} from "../utils/types/types";

/**
 * @description Mock the Store class
 * Contain the same methods as the Store class but return mock data
 * @see src/utils/store.ts
 * Note that the methods are not async and return data already formatted
 */
class MockData {
  /** Return mock formatted data for the average sessions to display */
  averageSessions(id: string): AverageResponse {
    return {
      data: {
        userId: 1,
        sessions: [
          { day: 1, sessionLength: 50 },
          { day: 2, sessionLength: 500 },
          { day: 3, sessionLength: 20 },
          { day: 4, sessionLength: 100 },
          { day: 5, sessionLength: 0 },
          { day: 6, sessionLength: 100 },
          { day: 7, sessionLength: 100 },
        ]
      }
    }
  }

  /** Return mock formatted data for the perf graph to display */
  performance(id: string): PerformanceResponse {
    return {
     data: {
       data: [
         { value: 200, kind: 1 },
         { value: 240, kind: 2 },
         { value: 80, kind: 3 },
         { value: 80, kind: 4 },
         { value: 220, kind: 5 },
         { value: 110, kind: 6 },
       ],
       kind: {1: 'cardio', 2: 'energy', 3: 'endurance', 4: 'strength', 5: 'speed', 6: 'intensity'}
     }
    }
  }

  /** Return mock formatted data to be used in the activity graph */
  activity(id: string): ActivityResponse {
    return {
      data: {
        sessions: [
          { day: '2020-07-01', kilogram: 80, calories: 240 },
          { day: '2020-07-02', kilogram: 80, calories: 220 },
          { day: '2020-07-03', kilogram: 77, calories: 350 },
          { day: '2020-07-04', kilogram: 81, calories: 290 },
          { day: '2020-07-05', kilogram: 80, calories: 160 },
          { day: '2020-07-06', kilogram: 78, calories: 162 },
          { day: '2020-07-07', kilogram: 76, calories: 390 },
          { day: '2020-07-08', kilogram: 76, calories: 390 },
          { day: '2020-07-09', kilogram: 76, calories: 390 },
          { day: '2020-07-10', kilogram: 76, calories: 390 },
          { day: '2020-07-11', kilogram: 76, calories: 390 },
        ]
      }
    }
  }

  /** Return user mock formatted data to be used in app and graphs */
  user(id: string): UserResponse {
    return {
      data: {
        id: 1,
        userInfos: {firstName: '(Données de démo)', lastName: 'name', age: 30},
        todayScore: 0.25,
        keyData: {
          calorieCount: 1930,
          proteinCount: 155,
          carbohydrateCount: 290,
          lipidCount: 50
        }
      },
    }
  }
}

export default new MockData();
