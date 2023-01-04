import { ActivityData, AverageDay, PerformanceData, User } from "../utils/types/types";

class MockData {
  averageSessions(id: string): AverageDay[] {
    return [
      { day: "D", sessionLength: 100 },
      { day: "L", sessionLength: 50 },
      { day: "M", sessionLength: 500 },
      { day: "M", sessionLength: 20 },
      { day: "J", sessionLength: 100 },
      { day: "V", sessionLength: 0 },
      { day: "S", sessionLength: 100 },
      { day: "D", sessionLength: 100 },
      { day: "L", sessionLength: 50 },
    ];
  }

  performance(id: string): PerformanceData[] {
    return [
      { value: 110, category: "Intensité" },
      { value: 220, category: "Vitesse" },
      { value: 80, category: "Force" },
      { value: 80, category: "Endurance" },
      { value: 240, category: "Énergie" },
      { value: 200, category: "Cardio" },
    ];
  }

  activity(id: string): ActivityData[] {
    return [
      { day: 1, "Poids (kg)": 80, "Calories brulées (kCal)": 240 },
      { day: 2, "Poids (kg)": 80, "Calories brulées (kCal)": 220 },
      { day: 3, "Poids (kg)": 77, "Calories brulées (kCal)": 350 },
      { day: 4, "Poids (kg)": 81, "Calories brulées (kCal)": 290 },
      { day: 5, "Poids (kg)": 80, "Calories brulées (kCal)": 160 },
      { day: 6, "Poids (kg)": 78, "Calories brulées (kCal)": 162 },
      { day: 7, "Poids (kg)": 76, "Calories brulées (kCal)": 390 },
      { day: 8, "Poids (kg)": 76, "Calories brulées (kCal)": 390 },
      { day: 9, "Poids (kg)": 76, "Calories brulées (kCal)": 390 },
      { day: 10, "Poids (kg)": 76, "Calories brulées (kCal)": 390 },
      { day: 11, "Poids (kg)": 76, "Calories brulées (kCal)": 390 },
    ];
  }

  user(id: string): User {
    return {
      dayScore: [{ name: "score", value: 25 }],
      firstName: "(Données de démo)",
      keyData: [
        { Calories: "1,930kCal" },
        { Protéines: "155g" },
        { Glucides: "290g" },
        { Lipides: "50g" },
      ],
    };
  }
}

export default new MockData();
