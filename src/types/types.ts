export interface AverageDay {
  day: string | number;
  sessionLength: number;
}

export interface performanceData {
  value: number;
  category: string;
}

export interface UseStoreReturn {
  averageSessions: AverageDay[];
  perfData: performanceData[];
}
