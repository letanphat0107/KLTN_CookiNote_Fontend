export type RootStackParamList = {
  // Loading
  Loading: undefined;

  // Authentication
  Login: undefined;
  Register: undefined;
  OTPVerification: { email: string; purpose: "register" | "email_change" }; 
  ForgotPassword: undefined;
  NewPassword: { email?: string };

  // Main App
  MainTabs: undefined; // Add this line
  CulinaryStoryDetail: { storyId: string };

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

//Dành cho Tab Navigator
export type TabParamList = {
  HomeScreen: undefined;
  CulinaryStory: undefined;
  CulinaryStoryDetail: { storyId: string };
  Favorite: undefined;
  UnauthFavorite: undefined;
};
