//  store/userState.ts

import { selector } from "recoil";
import { userState } from "./atoms";

export const userStatusSelector = selector({
  key: "userStatusSelector", // 고정된 키 사용
  get: ({ get }) => {
    const user = get(userState);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});
