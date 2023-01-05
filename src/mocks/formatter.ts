import {
  ActivityResponse,
  AverageResponse,
  PerformanceResponse,
  UserResponse
} from "../utils/types/types";

/** Mock formatter. It just returns the given data. */
export const defaultFormatter = {
  averageSessions: (data: AverageResponse) => data,
  activity: (data: ActivityResponse) => data,
  performance: (data: PerformanceResponse) => data,
  user: (data: UserResponse) => data,
  all(userData: UserResponse, activityData:ActivityResponse, performanceData:PerformanceResponse, sessionData:AverageResponse) {
    return {
      user: this.user(userData),
      activityData: this.activity(activityData),
      perfData: this.performance(performanceData),
      averageSessions: this.averageSessions(sessionData),
    }
  }
}