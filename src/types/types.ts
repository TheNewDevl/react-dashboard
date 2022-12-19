export interface AverageDay {
  day: string | number;
  sessionLength: number;
}

export interface performanceData {
  value: number;
  category: string;
}

export interface ActivityData {
  day: number;
  kilogram: number;
  calories: number;
}

export interface UseStoreReturn {
  averageSessions: AverageDay[];
  perfData: performanceData[];
  activityData: ActivityData[];
  user: User;
}

export interface DayScore {
  name: string;
  value: number;
}

export interface KeyData {
  [key: string]: string;
}

export interface User {
  firstName: string;
  dayScore: DayScore[];
  keyData: KeyData[];
}
