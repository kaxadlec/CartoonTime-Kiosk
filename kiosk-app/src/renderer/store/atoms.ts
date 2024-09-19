// atoms.ts
import { atom } from "recoil";

export interface User {
  userId: number;
  userName: string;
  entryDate: string;
  exitDate: string | null;
  fee: number | null;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const isVerifyingState = atom<boolean>({
  key: "isVerifyingState",
  default: false,
});
