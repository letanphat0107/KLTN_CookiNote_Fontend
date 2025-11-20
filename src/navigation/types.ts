export type RootStackParamList = {
  // Loading
  Loading: undefined;

  // Authentication
  Login: undefined;
  Register: undefined;
  OTPVerification: { email: string; purpose: "register" | "email_change" }; // Add this
  ForgotPassword: undefined;
  NewPassword: { email?: string };

  // Main App
  MainTabs: undefined; // Add this line
  HomeScreen: undefined;
  CulinaryStoryDetail: { storyId: string };
  DailySuggestions: undefined;
  

  // Recipe
  RecipeDetail: { recipeId: string };
  RecipeGuide: { recipeId: string };

  // Account
  Account: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  SharedAccount: { userId?: string };
  EmailChangeOTP: {
    newEmail: string;
  };
  QRScanner: undefined;

  // Admin
  AdminDashboard: undefined;
  ManageUsers: undefined;
  ManageRecipe: undefined;
  ManageCategory: undefined;
  CreateRecipe: undefined;
  EditRecipe: { recipeId: string };
};

export type TabParamList = {
  Home: undefined;
  CulinaryStory: undefined;
  CulinaryStoryDetail: { storyId: string };
  Favorite: undefined;
  UnauthFavorite: undefined;
};

export type AdminTabParamList = {
  AdminDashboard: undefined;
  ManageUsers: undefined;
  ManageRecipe: undefined;
};