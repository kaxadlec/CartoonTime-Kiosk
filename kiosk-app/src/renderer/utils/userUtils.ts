import { User, ApiResponse } from "../types/user";
import { getEntries } from "./../api/entryLog";

export const fetchAndUpdateUserStatus = async (
  userId: number
): Promise<User | null> => {
  try {
    const apiResponse: ApiResponse = await getEntries(userId);
    // 체크인 상태 확인 및 User 객체 업데이트 로직
    if (!apiResponse.success || apiResponse.data.length === 0) {
      console.error("API 요청 실패 또는 데이터 없음");
      return null;
    }

    const lastEntry: EntryRecord =
      apiResponse.data[apiResponse.data.length - 1];
    const isCurrentlyCheckedIn = lastEntry.exitDate === null;

    // 여기서는 이름과 currentMoney를 API에서 받지 않았다고 가정합니다.
    // 실제 구현시 이 정보도 API에서 받아오거나, 다른 방식으로 처리해야 합니다.
    const updatedUser: User = {
      id: userId,
      name: "사용자", // 이 부분은 실제 구현시 적절히 수정해야 합니다.
      currentMoney: null, // 이 부분도 실제 구현시 적절히 수정해야 합니다.
      isCurrentlyCheckedIn: isCurrentlyCheckedIn,
    };

    // ...
  } catch (error) {
    console.error("사용자 상태 업데이트 실패", error);
    return null;
  }
};

// 체크인 상태 변경 함수 (예: 사용자가 직접 체크인/체크아웃 할 때 사용)
export const updateCheckInStatus = (user: User, isCheckedIn: boolean): User => {
  return {
    ...user,
    isCurrentlyCheckedIn: isCheckedIn,
  };
};
