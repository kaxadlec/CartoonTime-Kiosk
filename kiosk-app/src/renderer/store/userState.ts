// store/userState.ts

import { selector } from "recoil";
import { userState } from "./atoms";
import { getUserIdFromUWB } from "../utils/uwbUtils";
import { getEntries } from "../api/entryLog";

export const userStatusSelector = selector({
  // 프로덕션 빌드에서는 이 방식을 사용하지 말고, 고정된 key를 사용
  key:
    process.env.NODE_ENV === "development"
      ? `userStatusSelector_${Math.random()}`
      : "userStatusSelector",
  get: async ({ get }) => {
    try {
      const userId = await getUserIdFromUWB();
      // const entries = await getEntries(userId);
      get(userState); // Recoil userState에 의존성이 있음
      return {
        userId,
        // entries,
      };
    } catch (error) {
      console.error(
        "유저 정보를 uwb 통신으로 가져오는데 오류가 발생함:",
        error
      );
      throw error;
    }
  },
});
