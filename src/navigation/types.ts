export type RootStackParamList = {
  // Loading
  Loading: undefined;

  // Authentication
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  NewPassword: { email?: string };

  // Main App
  MainTabs: undefined;
  HomeScreen: undefined;

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

export type UnauthenticatedTabParamList = {
  UnauthHome: undefined;
  UnauthStory: undefined;
  UnauthFavorite: undefined;
  Profile: undefined;
};
