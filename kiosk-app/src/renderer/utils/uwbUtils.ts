// utils/uwbUtils.ts

export const getUserIdFromUWB = (): Promise<number> => {
  return new Promise((resolve) => {
    // 여기에 실제 UWB 모듈과의 통신 로직을 구현해야함.
    // 지금은 임시로 setTimeout을 사용하여 비동기 작업을 시뮬레이션함.
    setTimeout(() => {
      const mockUserId = Math.floor(Math.random() * 1000) + 1; // 1부터 1000 사이의 랜덤 숫자
      resolve(mockUserId);
    }, 1000);
  });
};
