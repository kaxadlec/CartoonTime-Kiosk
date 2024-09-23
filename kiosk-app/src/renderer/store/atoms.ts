// store/atoms.ts

import { atom } from "recoil";
import { User } from "../types/user";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

// API_BASE_URL 상태를 저장하는 atom
export const apiBaseUrlState = atom<string>({
  key: "apiBaseUrlState",
  default: "",
});
