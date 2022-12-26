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
  "Poids (kg)": number;
  "Calories brulées (kCal)": number;
}

export interface UseStoreReturn {
  averageSessions: AverageDay[];
  perfData: performanceData[];
  activityData: ActivityData[];
  user: User;
  error: string | null;
  isLoading: boolean;
}

export interface DayScore {
  name: string;
  value: number;
}

export interface KeyData {
  [key: string]: string;
}

export interface User {
  id?: string;
  firstName: string;
  dayScore: DayScore[];
  keyData: KeyData[];
}

export enum StoreActionsEnum {
  ALL,
  AVERAGE,
  PERFORMANCE,
  ACTIVITY,
  USER,
}
