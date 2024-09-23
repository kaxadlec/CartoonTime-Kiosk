// api/entryLog.ts 파일에는 입퇴실 기록을 조회하는 API 함수를 작성합니다.

import axios from "axios";

// API의 기본 URL 설정
const API_BASE_URL = "https://your-api-base-url.com";

// 입퇴실 기록을 조회하는 함수
export const getEntries = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ct/entries/all/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("입퇴실 기록 조회 실패");
    throw error;
  }
};

// Response 예시
// {
//   "success": true,
//   "message": "입퇴실 기록 조회에 성공했습니다.",
//   "data": [
//       {
//           "userId": 1,
//           "entryDate": "2024-09-10T10:48:27.588837",
//           "exitDate": "2024-09-10T10:48:32.835407",
//           "fee": 50 // 금액
//       },
//       {
//           "userId": 1,
//           "entryDate": "2024-09-10T10:48:37.376652",
//           "exitDate": "2024-09-10T10:48:39.466967",
//           "fee": 50
//       }
//   ],
//   "error": null
// }
