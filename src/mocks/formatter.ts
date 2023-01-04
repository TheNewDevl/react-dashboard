/** Mock formatter. It just returns the given data. */
export const defaultFormatter = {
  averageSessions: (data: any) => data,
  activity: (data: any) => data,
  performance: (data: any) => data,
  user: (data: any) => data,
  all(userData: any, activityData:any, performanceData:any, sessionData:any): any {
    return {
      user: this.user(userData),
      activityData: this.activity(activityData),
      perfData: this.performance(performanceData),
      averageSessions: this.averageSessions(sessionData),
    }
  }
}