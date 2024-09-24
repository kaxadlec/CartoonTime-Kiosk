//  store/userState.ts

import { selector } from "recoil";
import { userState } from "./atoms";

export const userStatusSelector = selector({
  key: "userStatusSelector_" + Math.random(), // 고유한 키 값
  get: ({ get }) => {
    const user = get(userState);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});
