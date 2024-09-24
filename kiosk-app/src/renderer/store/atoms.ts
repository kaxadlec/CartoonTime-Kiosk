// store/atoms.ts

import { atom } from "recoil";
import { User } from "../types/user";

export const userState = atom<User | null>({
  key: "userState_" + Math.random(), // 고유한 키 값
  default: null,
});
