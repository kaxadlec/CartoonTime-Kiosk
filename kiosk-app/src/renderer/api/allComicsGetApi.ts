import { Cartoon } from "../types/cartoon";

// 모든 만화 정보를 조회하는 함수
export const getAllComics = async (): Promise<Cartoon[]> => {
  try {
    const response = await window.electronAPI.apiRequest({
      method: "GET",
      endpoint: "/ct/comics/all",
    });

    // console.log(response);
    if (Array.isArray(response)) {
      return response;
    } else {
      console.error("Unexpected API response structure:", response);
      return [];
    }
  } catch (error: any) {
    console.error("만화 정보 조회 실패", error);
    return [];
  }
};
