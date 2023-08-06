import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const lngs = [
  { key: "en", nativeName: "English" },
  { key: "vi", nativeName: "Tiếng Việt" },
];

const resources = {
  en: {
    translation: {
      home: "Home",
      login: "Login",
      logout: "Logout",
      profile: "Profile",
      homeIntro: "Our featured bikes",
      all: "All",
      newArrival: "New arrival",
      bestSeller: "Best seller",
      topRated: "Top rated",
      modalBag: "Cart bag",
      emtyBag: "Empty bag",
      totalPrice: "Total price",
      days: 'days'
    },
  },
  vi: {
    translation: {
      home: "Trang chủ",
      login: "Đăng nhập",
      logout: "Đăng xuất",
      profile: "Hồ sơ",
      homeIntro: "Đặt là có ngay!",
      all: "Tất cả",
      newArrival: "Mới",
      bestSeller: "Bán chạy",
      topRated: "Được đánh giá cao",
      modalBag:"Giỏ hàng",
      emtyBag: "Giỏ hàng trống",
      totalPrice: "Tổng giá",
      days: 'ngày'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
