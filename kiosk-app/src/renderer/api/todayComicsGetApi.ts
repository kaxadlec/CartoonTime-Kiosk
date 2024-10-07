import { Cartoon } from "../types/cartoon";

// 추천 만화 정보를 조회하는 함수
export const getTodayComics = async (): Promise<Cartoon[]> => {
  try {
    const response = await window.electronAPI.apiRequest({
      method: "GET",
      endpoint: `/ctr/today`,
    });

    // console.log("response", response);
    // 응답이 배열인지 확인
    if (Array.isArray(response)) {
      const mappedComics: Cartoon[] = response.map((item: any) => ({
        id: item.id,
        title: item.titleKo,
        author: item.authorKo,
        location: item.location,
        imageUrl: item.imageUrl,
        genres: item.genres,
      }));
      return mappedComics;
    } else {
      console.error("Unexpected API response structure:", response);
      return [];
    }
  } catch (error: any) {
    console.error("추천 만화 정보 조회 실패", error);
    return [];
  }
};
