export type Language = "en" | "bn";

export const translations = {
  en: {
    // Nav
    home: "Home",
    slots: "Slots",
    liveCasino: "Live Casino",
    sports: "Sports",
    crash: "Crash",
    promotions: "Promotions",
    login: "Login",
    register: "Register",
    logout: "Logout",
    wallet: "Wallet",
    profile: "Profile",
    
    // Home
    heroTitle: "Play & Win Big",
    heroSubtitle: "The ultimate online casino experience with instant payouts",
    playNow: "Play Now",
    joinNow: "Join Now",
    featuredGames: "Featured Games",
    popularGames: "Popular Games",
    newGames: "New Games",
    allGames: "All Games",
    
    // Categories
    slotsCategory: "Slots",
    liveCasinoCategory: "Live Casino",
    sportsCategory: "Sports Betting",
    crashCategory: "Crash Games",
    miniGames: "Mini Games",
    
    // Wallet
    balance: "Balance",
    deposit: "Deposit",
    withdraw: "Withdraw",
    transactionHistory: "Transaction History",
    amount: "Amount",
    
    // Auth
    email: "Email",
    password: "Password",
    phone: "Phone Number",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    
    // General
    loading: "Loading...",
    error: "Error",
    success: "Success",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    search: "Search",
    language: "Language",
  },
  bn: {
    // Nav
    home: "হোম",
    slots: "স্লটস",
    liveCasino: "লাইভ ক্যাসিনো",
    sports: "স্পোর্টস",
    crash: "ক্র্যাশ",
    promotions: "প্রমোশন",
    login: "লগইন",
    register: "রেজিস্টার",
    logout: "লগআউট",
    wallet: "ওয়ালেট",
    profile: "প্রোফাইল",
    
    // Home
    heroTitle: "খেলুন এবং বড় জিতুন",
    heroSubtitle: "তাৎক্ষণিক পেআউট সহ চূড়ান্ত অনলাইন ক্যাসিনো অভিজ্ঞতা",
    playNow: "এখনই খেলুন",
    joinNow: "যোগ দিন",
    featuredGames: "ফিচার্ড গেমস",
    popularGames: "জনপ্রিয় গেমস",
    newGames: "নতুন গেমস",
    allGames: "সকল গেমস",
    
    // Categories
    slotsCategory: "স্লটস",
    liveCasinoCategory: "লাইভ ক্যাসিনো",
    sportsCategory: "স্পোর্টস বেটিং",
    crashCategory: "ক্র্যাশ গেমস",
    miniGames: "মিনি গেমস",
    
    // Wallet
    balance: "ব্যালেন্স",
    deposit: "জমা",
    withdraw: "উত্তোলন",
    transactionHistory: "লেনদেনের ইতিহাস",
    amount: "পরিমাণ",
    
    // Auth
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    phone: "ফোন নম্বর",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    dontHaveAccount: "অ্যাকাউন্ট নেই?",
    alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    
    // General
    loading: "লোড হচ্ছে...",
    error: "ত্রুটি",
    success: "সফল",
    submit: "জমা দিন",
    cancel: "বাতিল",
    save: "সংরক্ষণ",
    search: "অনুসন্ধান",
    language: "ভাষা",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
