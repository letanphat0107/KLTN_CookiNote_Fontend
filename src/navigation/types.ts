export type RootStackParamList = {
  // Loading
  Loading: undefined;
  
  // Authentication
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
  
  // Main App
  MainTabs: undefined;
  UnauthenticatedHome: undefined;
  
  // Recipe
  RecipeDetail: { recipeId: string };
  RecipeGuide: { recipeId: string };
  
  // Account
  Account: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  SharedAccount: { userId?: string };
  
  // Admin
  AdminDashboard: undefined;
  ManageDishes: undefined;
  ManageUsers: undefined;
  AddRecipe: undefined;
};

export type TabParamList = {
  Home: undefined;
  CulinaryStory: undefined;
  Favorite: undefined;
};
