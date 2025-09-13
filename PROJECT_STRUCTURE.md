# CookiNote - Ứng dụng Công thức Nấu ăn

## Tổng quan
CookiNote là một ứng dụng React Native được thiết kế để chia sẻ và khám phá các công thức nấu ăn. Ứng dụng cung cấp một nền tảng để người dùng có thể tìm hiểu, lưu trữ và chia sẻ các món ăn yêu thích.

## Cấu trúc dự án

### 📱 Screens (Màn hình)

#### 🔄 Loading & Authentication
- **LoadingScreen**: Màn hình tải khi khởi động ứng dụng
- **LoginScreen**: Đăng nhập
- **RegisterScreen**: Đăng ký tài khoản mới
- **ForgotPasswordScreen**: Quên mật khẩu
- **NewPasswordScreen**: Đặt mật khẩu mới

#### 🏠 Main Screens
- **HomeScreen**: Trang chủ chính (dành cho người dùng đã đăng nhập)
- **UnauthenticatedHomeScreen**: Trang chủ cho người dùng chưa đăng nhập
- **CulinaryStoryScreen**: Câu chuyện ẩm thực
- **FavoriteScreen**: Món ăn yêu thích

#### 👤 Account Management
- **AccountScreen**: Trang tài khoản chính
- **ProfileScreen**: Chỉnh sửa thông tin cá nhân
- **ChangePasswordScreen**: Đổi mật khẩu
- **SharedAccountScreen**: Trang cá nhân công khai để chia sẻ

#### 🍽️ Recipe
- **RecipeDetailScreen**: Chi tiết công thức (đã có sẵn)
- **RecipeGuideScreen**: Hướng dẫn chi tiết cách làm món ăn
- **TodaySuggestScreen**: Gợi ý hôm nay (đã có sẵn)
- **WeeklySuggestScreen**: Gợi ý hàng tuần (đã có sẵn)

#### 👨‍💼 Admin
- **AdminDashboardScreen**: Bảng điều khiển quản trị
- **ManageDishesScreen**: Quản lý món ăn (duyệt, chỉnh sửa, xóa)
- **ManageUsersScreen**: Quản lý người dùng
- **AddRecipeScreen**: Thêm công thức mới

### 🧭 Navigation
- **RootNavigator**: Stack Navigator chính
- **TabNavigator**: Bottom Tab Navigator cho các trang chính
- **types.ts**: Định nghĩa các type cho navigation

### 🎨 Components
- **Header**: Component header có thể tùy chỉnh
- **LoadingSpinner**: Component loading spinner
- **Button**: Component button với nhiều variant

### 📁 Folders khác
- **constants/**: Chứa các hằng số (colors, fonts, routes, sizes)
- **types/**: Định nghĩa TypeScript types (common, recipe, user)
- **api/**: (Trống - để chuẩn bị cho API calls)
- **hooks/**: (Trống - để chuẩn bị cho custom hooks)
- **services/**: (Trống - để chuẩn bị cho services)
- **store/**: (Trống - để chuẩn bị cho state management)
- **utils/**: (Trống - để chuẩn bị cho utility functions)

## Tính năng chính

### 🔐 Authentication Flow
- Đăng nhập/Đăng ký
- Quên mật khẩu và đặt lại
- Bảo mật tài khoản

### 🏠 User Experience
- Trang chủ khác biệt cho người dùng đã/chưa đăng nhập
- Thanh điều hướng dưới cùng với 3 tab chính
- Thông báo yêu cầu đăng nhập khi chưa xác thực

### 📖 Content Management
- Xem và chia sẻ công thức nấu ăn
- Lưu món ăn yêu thích
- Đọc câu chuyện ẩm thực
- Gợi ý món ăn hàng ngày/tuần

### 👤 Profile Management
- Quản lý thông tin cá nhân
- Đổi mật khẩu
- Trang cá nhân công khai để chia sẻ

### 👨‍💼 Admin Features
- Dashboard với thống kê tổng quan
- Quản lý người dùng (khóa/mở khóa, xóa)
- Quản lý món ăn (duyệt, chỉnh sửa)
- Thêm công thức mới

## Cài đặt

### Yêu cầu
Để chạy đầy đủ các tính năng navigation, cần cài đặt các packages sau:

```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

### Chạy ứng dụng
```bash
npm start
# hoặc
expo start
```

## Design System

### 🎨 Colors
- Primary: `#FF6B6B` (Đỏ cam chủ đạo)
- Background: `#FFFFFF` (Trắng)
- Text Primary: `#333333` (Xám đậm)
- Text Secondary: `#666666` (Xám vừa)
- Border: `#E0E0E0` (Xám nhạt)
- Success: `#4CAF50`
- Danger: `#F44336`
- Warning: `#FF9800`

### 📝 Typography
- Title: 24-28px, Bold
- Header: 18-20px, Bold
- Body: 16px, Regular
- Caption: 14px, Regular
- Small: 12px, Regular

## Lưu ý phát triển

1. **Navigation**: Các lỗi TypeScript về navigation sẽ được giải quyết khi cài đặt đầy đủ packages
2. **State Management**: Thư mục `store/` đã được chuẩn bị sẵn cho việc thêm Redux/Zustand
3. **API Integration**: Thư mục `api/` và `services/` sẵn sàng cho việc tích hợp backend
4. **Styling**: Mỗi screen đều có file `styles.ts` riêng để dễ quản lý
5. **Components**: Các component đã được thiết kế để tái sử dụng và mở rộng

## Tác giả
Dự án được tạo cho khóa luận tốt nghiệp - Ứng dụng CookiNote
