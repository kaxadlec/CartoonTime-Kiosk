// store/userState.ts

import { selector } from "recoil";
import { userState } from "./atoms";
import { fetchAndUpdateUserStatus } from "../utils/userUtils";

export const userStatusSelector = selector({
  key: "userStatusSelector",
  get: async ({ get }) => {
    const user = get(userState);
    if (!user) return null;
    return await fetchAndUpdateUserStatus(user.id);
  },
});
