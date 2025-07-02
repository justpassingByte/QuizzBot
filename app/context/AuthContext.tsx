import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: string;
  username: string;
  email: string;
  score: number;
  // Thêm các thuộc tính khác của user nếu cần
}

// Định nghĩa kiểu dữ liệu cho Context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (newUserData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect để tải thông tin user từ AsyncStorage khi app khởi động
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('user');
        if (userToken) {
          setUser(JSON.parse(userToken));
        }
      } catch (e) {
        console.error("Lỗi khi tải user từ storage", e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  // Hàm đăng nhập
  const signIn = async (userData: User) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      console.error("Lỗi khi lưu user vào storage", e);
    }
  };

  // Hàm đăng xuất
  const signOut = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.error("Lỗi khi xóa user khỏi storage", e);
    }
  };

  const updateUser = async (newUserData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newUserData };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
}; 