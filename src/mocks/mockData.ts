import { ActivityData, AverageDay, performanceData, User } from "../types/types";

export const mockSessions: AverageDay[] = [
  { day: 7, sessionLength: 100 },
  { day: 1, sessionLength: 50 },
  { day: 2, sessionLength: 500 },
  { day: 3, sessionLength: 20 },
  { day: 4, sessionLength: 100 },
  { day: 5, sessionLength: 0 },
  { day: 6, sessionLength: 100 },
  { day: 7, sessionLength: 100 },
];

export const mockPerfData: performanceData[] = [
  { value: 110, category: "Intensité" },
  { value: 220, category: "Vitesse" },
  { value: 80, category: "Force" },
  { value: 80, category: "Endurance" },
  { value: 240, category: "Énergie" },
  { value: 200, category: "Cardio" },
];

export const mockSessionsActivity: ActivityData[] = [
  {
    day: 1,
    kilogram: 80,
    calories: 240,
  },
  {
    day: 2,
    kilogram: 80,
    calories: 220,
  },
  {
    day: 3,
    kilogram: 77,
    calories: 350,
  },
  {
    day: 4,
    kilogram: 81,
    calories: 290,
  },
  {
    day: 5,
    kilogram: 80,
    calories: 160,
  },
  {
    day: 6,
    kilogram: 78,
    calories: 162,
  },
  {
    day: 7,
    kilogram: 76,
    calories: 390,
  },
  {
    day: 8,
    kilogram: 76,
    calories: 390,
  },
  {
    day: 9,
    kilogram: 76,
    calories: 390,
  },
  {
    day: 10,
    kilogram: 76,
    calories: 390,
  },
  {
    day: 11,
    kilogram: 76,
    calories: 390,
  },
];

export const mockUserData: User = {
  dayScore: [{ name: "score", value: 25 }],
  firstName: "Thomas",
  keyData: [
    { Calories: "1,930kCal" },
    { Protéines: "155g" },
    { Glucides: "290g" },
    { Lipides: "50g" },
  ],
};
