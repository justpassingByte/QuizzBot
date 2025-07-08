export type Language = 'en' | 'vi';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    back: string;
    next: string;
    save: string;
    edit: string;
    delete: string;
    close: string;
    retry: string;
    home: string;
    profile: string;
    settings: string;
    leaderboard: string;
  };

  // Auth
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    forgotPassword: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    rememberMe: string;
    createAccount: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    resetPassword: string;
    sendEmail: string;
    confirmOtp: string;
    createNewPassword: string;
    passwordMismatch: string;
    welcomeBack: string;
    passwordResetSuccess: string;
  };

  // Home
  home: {
    title: string;
    slogan: string;
    playNow: string;
    createQuiz: string;
    guest: string;
    welcome: string;
  };

  // Quiz
  quiz: {
    title: string;
    question: string;
    correct: string;
    incorrect: string;
    explanation: string;
    next: string;
    finish: string;
    retry: string;
    result: string;
    score: string;
    totalQuestions: string;
    correctAnswers: string;
    timeTaken: string;
    coinsEarned: string;
    xpEarned: string;
    achievements: string;
    relatedQuizzes: string;
    noRelatedQuizzes: string;
    share: string;
    loadingQuiz: string;
  };

  // Profile
  profile: {
    title: string;
    editProfile: string;
    statistics: string;
    achievements: string;
    quizzes: string;
    points: string;
    avgScore: string;
    activityThisWeek: string;
    noActivityData: string;
    lifetimePoints: string;
    quizPassed: string;
    level: string;
    guest: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    selectDate: string;
    emailSent: string;
    saveChanges: string;
    saving: string;
    userNotFound: string;
    invalidImageFile: string;
    failedToUploadAvatar: string;
    infoUpdated: string;
    failedToUpdateInfo: string;
  };

  // Settings
  settings: {
    title: string;
    notifications: string;
    musicEffects: string;
    music: string;
    soundEffects: string;
    vibrations: string;
    language: string;
    about: string;
    logout: string;
    privacyPolicy: string;
    english: string;
    vietnamese: string;
    home: string;
    profile: string;
    leaderboard: string;
    more: string;
    saveChanges: string;
    saving: string;
  };

  // Leaderboard
  leaderboard: {
    title: string;
    global: string;
    national: string;
    yourRank: string;
    points: string;
    pts: string;
  };

  // Create Quiz
  createQuiz: {
    title: string;
    topic: string;
    topicPlaceholder: string;
    level: string;
    basic: string;
    intermediate: string;
    advanced: string;
    multipleChoiceCount: string;
    difficultyDistribution: string;
    maxAttempts: string;
    includeHints: string;
    create: string;
    creating: string;
    error: string;
  };

  // Optional Survey
  survey: {
    accountType: string;
    accountTypeSubtitle: string;
    personal: string;
    teacher: string;
    student: string;
    professional: string;
    topics: string;
    topicsSubtitle: string;
    continue: string;
    finish: string;
    back: string;
  };

  // Arcade
  arcade: {
    title: string;
    chooseCategory: string;
    explore: string;
  };

  // Edit Profile
  editProfile: {
    title: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    saveChanges: string;
    saving: string;
    emailSent: string;
    selectDate: string;
  };

  // Forgot Password
  forgotPassword: {
    title: string;
    subtitle: string;
    emailSent: string;
    emailSentSubtitle: string;
    otpTitle: string;
    newPasswordTitle: string;
    newPasswordSubtitle: string;
    didntReceiveEmail: string;
    resendIn: string;
    createNewPassword: string;
    confirmNewPassword: string;
    continue: string;
    confirm: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      retry: 'Retry',
      home: 'Home',
      profile: 'Profile',
      settings: 'Settings',
      leaderboard: 'Leaderboard',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      forgotPassword: 'Forgot Password',
      email: 'Email',
      password: 'Password',
      username: 'Username',
      firstName: 'First Name',
      lastName: 'Last Name',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember me',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'I already have an account',
      dontHaveAccount: "Don't have an account?",
      resetPassword: 'Reset Password',
      sendEmail: 'Send Email',
      confirmOtp: 'Confirm OTP',
      createNewPassword: 'Create New Password',
      passwordMismatch: 'Passwords do not match',
      welcomeBack: 'Welcome Back!',
      passwordResetSuccess: 'You have successfully reset and created a new password.',
    },
    home: {
      title: 'QUIZZIE BOT',
      slogan: 'Unleash the power of AI! Discover quizzes made just for you',
      playNow: 'Play Now',
      createQuiz: 'Create your own quiz by QUIZZIE BOT',
      guest: 'Guest',
      welcome: 'Welcome',
    },
    quiz: {
      title: 'Quiz',
      question: 'Question',
      correct: 'Correct!',
      incorrect: 'Incorrect!',
      explanation: 'Explanation:',
      next: 'Next',
      finish: 'Finish',
      retry: 'Retry',
      result: 'Result',
      score: 'Score',
      totalQuestions: 'Total Questions',
      correctAnswers: 'Correct Answers',
      timeTaken: 'Time Taken',
      coinsEarned: 'Coins Earned',
      xpEarned: 'XP Earned',
      achievements: 'Your Achievements',
      relatedQuizzes: 'Related Quizzes',
      noRelatedQuizzes: 'No related quizzes found.',
      share: 'Share',
      loadingQuiz: 'Creating your quiz...'
    },
    profile: {
      title: 'Profile',
      editProfile: 'Edit Profile',
      statistics: 'My Statistics',
      achievements: 'Your Achievements',
      quizzes: 'Quizzes',
      points: 'Points',
      avgScore: 'Avg. Score',
      activityThisWeek: 'Your Activity this Week',
      noActivityData: 'No activity data available.',
      lifetimePoints: 'Lifetime Points',
      quizPassed: 'Quiz Passed',
      level: 'Level',
      guest: 'Guest',
      userName: 'User Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      dateOfBirth: 'Date of Birth',
      selectDate: 'Select Date',
      emailSent: 'Email sent!',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      userNotFound: 'User not found.',
      invalidImageFile: 'Invalid image file.',
      failedToUploadAvatar: 'Failed to upload avatar.',
      infoUpdated: 'Profile updated successfully!',
      failedToUpdateInfo: 'Failed to update profile information.',
    },
    settings: {
      title: 'Settings',
      notifications: 'Notifications',
      musicEffects: 'Music & Effects',
      music: 'Music',
      soundEffects: 'Sound Effects',
      vibrations: 'Vibrations',
      language: 'Language',
      about: 'About Quizzie Bot',
      logout: 'Logout',
      privacyPolicy: 'Privacy Policy & Quizzie Bot',
      english: 'English',
      vietnamese: 'Vietnamese',
      home: 'Home',
      profile: 'Profile',
      leaderboard: 'Leaderboard',
      more: 'More',
      saveChanges: 'Save Changes',
      saving: 'Saving...'
    },
    leaderboard: {
      title: 'Leaderboard',
      global: 'Global',
      national: 'National',
      yourRank: 'Your Rank',
      points: 'Points',
      pts: 'pts',
    },
    createQuiz: {
      title: 'Create your own quiz',
      topic: 'Topic',
      topicPlaceholder: 'Enter a topic (e.g. Harry Potter, Math, ... )',
      level: 'Level (Preset)',
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      multipleChoiceCount: 'Multiple Choice Count',
      difficultyDistribution: 'Difficulty Distribution (basic/intermediate/advanced)',
      maxAttempts: 'Max Attempts',
      includeHints: 'Include Hints',
      create: 'Create Quiz',
      creating: 'Creating...',
      error: 'Cannot create quiz.',
    },
    survey: {
      accountType: 'Choose the account type you want to create? 🤔',
      accountTypeSubtitle: 'Choose an account type that suits you.',
      personal: 'Personal',
      teacher: 'Teacher',
      student: 'Student',
      professional: 'Professional',
      topics: 'To personalize your quiz experience, choose topics you are interested in',
      topicsSubtitle: 'Choose at least one topic to continue.',
      continue: 'Continue',
      finish: 'Finish',
      back: 'Back',
    },
    arcade: {
      title: 'Arcade',
      chooseCategory: 'Choose your category',
      explore: 'Explore!',
    },
    editProfile: {
      title: 'Profile',
      userName: 'User Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      dateOfBirth: 'Date of Birth',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      emailSent: 'Email sent!',
      selectDate: 'Select Date',
    },
    forgotPassword: {
      title: 'Forgot Password',
      subtitle: 'Enter your email address to get an OTP code to reset your password.',
      emailSent: "You've got mail 📧",
      emailSentSubtitle: 'We have sent the OTP verification code to your email address. Check your email and enter the code below.',
      otpTitle: 'Create new password 🔐',
      newPasswordTitle: 'Create New Password',
      newPasswordSubtitle: 'Save the new password in a safe place, if you forget it then you have to do a forgot password again.',
      didntReceiveEmail: "Didn't receive email?",
      resendIn: 'You can resend code in',
      createNewPassword: 'Create a new password',
      confirmNewPassword: 'Confirm a new password',
      continue: 'Continue',
      confirm: 'Confirm',
    },
  },
  vi: {
    common: {
      loading: 'Đang tải...',
      error: 'Lỗi',
      success: 'Thành công',
      cancel: 'Hủy',
      confirm: 'Xác nhận',
      back: 'Quay lại',
      next: 'Tiếp theo',
      save: 'Lưu',
      edit: 'Chỉnh sửa',
      delete: 'Xóa',
      close: 'Đóng',
      retry: 'Thử lại',
      home: 'Trang chủ',
      profile: 'Hồ sơ',
      settings: 'Cài đặt',
      leaderboard: 'Bảng xếp hạng',
    },
    auth: {
      signIn: 'Đăng nhập',
      signUp: 'Đăng ký',
      signOut: 'Đăng xuất',
      forgotPassword: 'Quên mật khẩu',
      email: 'Email',
      password: 'Mật khẩu',
      username: 'Tên người dùng',
      firstName: 'Tên',
      lastName: 'Họ',
      confirmPassword: 'Xác nhận mật khẩu',
      rememberMe: 'Ghi nhớ đăng nhập',
      createAccount: 'Tạo tài khoản',
      alreadyHaveAccount: 'Tôi đã có tài khoản',
      dontHaveAccount: 'Chưa có tài khoản?',
      resetPassword: 'Đặt lại mật khẩu',
      sendEmail: 'Gửi email',
      confirmOtp: 'Xác nhận OTP',
      createNewPassword: 'Tạo mật khẩu mới',
      passwordMismatch: 'Mật khẩu không khớp',
      welcomeBack: 'Chào mừng trở lại!',
      passwordResetSuccess: 'Bạn đã thành công đặt lại và tạo mật khẩu mới.',
    },
    home: {
      title: 'QUIZZIE BOT',
      slogan: 'Khám phá sức mạnh của AI! Khám phá các câu đố được tạo riêng cho bạn',
      playNow: 'Chơi ngay',
      createQuiz: 'Tạo câu đố của riêng bạn bằng QUIZZIE BOT',
      guest: 'Khách',
      welcome: 'Chào mừng',
    },
    quiz: {
      title: 'Câu đố',
      question: 'Câu hỏi',
      correct: 'Đúng!',
      incorrect: 'Sai!',
      explanation: 'Giải thích:',
      next: 'Tiếp theo',
      finish: 'Kết thúc',
      retry: 'Thử lại',
      result: 'Kết quả',
      score: 'Điểm',
      totalQuestions: 'Tổng câu hỏi',
      correctAnswers: 'Câu trả lời đúng',
      timeTaken: 'Thời gian',
      coinsEarned: 'Xu nhận được',
      xpEarned: 'XP nhận được',
      achievements: 'Thành tích của bạn',
      relatedQuizzes: 'Câu đố liên quan',
      noRelatedQuizzes: 'Không tìm thấy câu đố liên quan.',
      share: 'Chia sẻ',
      loadingQuiz: 'Đang tạo câu đố...'
    },
    profile: {
      title: 'Hồ sơ',
      editProfile: 'Chỉnh sửa hồ sơ',
      statistics: 'Thống kê của tôi',
      achievements: 'Thành tích của bạn',
      quizzes: 'Câu đố',
      points: 'Điểm',
      avgScore: 'Điểm TB',
      activityThisWeek: 'Hoạt động tuần này',
      noActivityData: 'Không có dữ liệu hoạt động.',
      lifetimePoints: 'Điểm tổng',
      quizPassed: 'Câu đố đã qua',
      level: 'Cấp độ',
      guest: 'Khách',
      userName: 'Tên người dùng',
      firstName: 'Tên',
      lastName: 'Họ',
      email: 'Email',
      dateOfBirth: 'Ngày sinh',
      selectDate: 'Chọn ngày',
      emailSent: 'Đã gửi email!',
      saveChanges: 'Lưu thay đổi',
      saving: 'Đang lưu...',
      userNotFound: 'Không tìm thấy người dùng.',
      invalidImageFile: 'File ảnh không hợp lệ.',
      failedToUploadAvatar: 'Không thể upload ảnh đại diện.',
      infoUpdated: 'Cập nhật hồ sơ thành công!',
      failedToUpdateInfo: 'Không thể cập nhật thông tin hồ sơ.',
    },
    settings: {
      title: 'Cài đặt',
      notifications: 'Thông báo',
      musicEffects: 'Âm nhạc & Hiệu ứng',
      music: 'Nhạc nền',
      soundEffects: 'Âm thanh',
      vibrations: 'Rung',
      language: 'Ngôn ngữ',
      about: 'Về Quizzie Bot',
      logout: 'Đăng xuất',
      privacyPolicy: 'Chính sách bảo mật & Quizzie Bot',
      english: 'Tiếng Anh',
      vietnamese: 'Tiếng Việt',
      home: 'Trang chủ',
      profile: 'Hồ sơ',
      leaderboard: 'Bảng xếp hạng',
      more: 'Thêm',
      saveChanges: 'Lưu thay đổi',
      saving: 'Đang lưu...'
    },
    leaderboard: {
      title: 'Bảng xếp hạng',
      global: 'Toàn cầu',
      national: 'Quốc gia',
      yourRank: 'Hạng của bạn',
      points: 'Điểm',
      pts: 'điểm',
    },
    createQuiz: {
      title: 'Tạo câu đố của riêng bạn',
      topic: 'Chủ đề',
      topicPlaceholder: 'Nhập chủ đề (ví dụ: Harry Potter, Toán học, ...)',
      level: 'Cấp độ (Cài sẵn)',
      basic: 'Cơ bản',
      intermediate: 'Trung bình',
      advanced: 'Nâng cao',
      multipleChoiceCount: 'Số câu trắc nghiệm',
      difficultyDistribution: 'Phân bố độ khó (cơ bản/trung bình/nâng cao)',
      maxAttempts: 'Số lần thử tối đa',
      includeHints: 'Bao gồm gợi ý',
      create: 'Tạo câu đố',
      creating: 'Đang tạo...',
      error: 'Không thể tạo câu đố.',
    },
    survey: {
      accountType: 'Chọn loại tài khoản bạn muốn tạo? 🤔',
      accountTypeSubtitle: 'Chọn một loại tài khoản phù hợp với bạn.',
      personal: 'Cá nhân',
      teacher: 'Giáo viên',
      student: 'Học sinh',
      professional: 'Chuyên nghiệp',
      topics: 'Để cá nhân hóa trải nghiệm quiz, chọn các chủ đề bạn quan tâm',
      topicsSubtitle: 'Chọn ít nhất một chủ đề để tiếp tục.',
      continue: 'Tiếp theo',
      finish: 'Hoàn thành',
      back: 'Quay lại',
    },
    arcade: {
      title: 'Khu vui chơi',
      chooseCategory: 'Chọn danh mục của bạn',
      explore: 'Khám phá!',
    },
    editProfile: {
      title: 'Hồ sơ',
      userName: 'Tên người dùng',
      firstName: 'Tên',
      lastName: 'Họ',
      email: 'Email',
      dateOfBirth: 'Ngày sinh',
      saveChanges: 'Lưu thay đổi',
      saving: 'Đang lưu...',
      emailSent: 'Đã gửi email!',
      selectDate: 'Chọn ngày',
    },
    forgotPassword: {
      title: 'Quên mật khẩu',
      subtitle: 'Nhập địa chỉ email để nhận mã OTP đặt lại mật khẩu.',
      emailSent: 'Bạn có thư 📧',
      emailSentSubtitle: 'Chúng tôi đã gửi mã xác minh OTP đến địa chỉ email của bạn. Kiểm tra email và nhập mã bên dưới.',
      otpTitle: 'Tạo mật khẩu mới 🔐',
      newPasswordTitle: 'Tạo mật khẩu mới',
      newPasswordSubtitle: 'Lưu mật khẩu mới ở nơi an toàn, nếu bạn quên thì phải làm lại quên mật khẩu.',
      didntReceiveEmail: 'Không nhận được email?',
      resendIn: 'Bạn có thể gửi lại mã trong',
      createNewPassword: 'Tạo mật khẩu mới',
      confirmNewPassword: 'Xác nhận mật khẩu mới',
      continue: 'Tiếp tục',
      confirm: 'Xác nhận',
    },
  },
}; 