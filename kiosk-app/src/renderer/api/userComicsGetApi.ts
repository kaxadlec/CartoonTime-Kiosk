import { Cartoon } from "../types/cartoon";

// 추천 만화 정보를 조회하는 함수
export const getRecommendedComics = async (
  userId: number
): Promise<Cartoon[]> => {
  try {
    const response = await window.electronAPI.apiRequest({
      method: "GET",
      endpoint: `/ctr/recommend/${userId}`, // 사용자 ID를 경로에 포함
    });

    // 응답의 recommendations를 Cartoon 인터페이스에 맞게 변환
    if (response?.recommendations && Array.isArray(response.recommendations)) {
      const mappedComics: Cartoon[] = response.recommendations.map(
        (item: any) => ({
          title: item.title, // title을 title로 매핑
          author: item.author, // author를 author로 매핑
          location: item.location, // location 그대로 사용
          imageUrl: item.s3url, // s3url을 imageUrl로 매핑
          genres: [], // genres는 응답에 없으므로 빈 배열로 설정 (필요 시 추가 가능)
        })
      );
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
