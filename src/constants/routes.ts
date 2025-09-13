// Screen names for navigation
export const ROUTES = {
  // Main tabs
  HOME: 'Home',
  RECIPE_DETAIL: 'RecipeDetail',
  TODAY_SUGGEST: 'TodaySuggest',
  WEEKLY_SUGGEST: 'WeeklySuggest',
  
  // Stacks
  HOME_STACK: 'HomeStack',
  RECIPE_STACK: 'RecipeStack',
  SUGGESTION_STACK: 'SuggestionStack',
  
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];
