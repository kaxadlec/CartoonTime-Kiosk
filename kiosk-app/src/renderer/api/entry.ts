import axios from "axios";

// API의 기본 URL 설정
const API_BASE_URL = "https://your-api-base-url.com";

// 입실 처리를 하는 함수
export const checkIn = async (userId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/entry/${userId}`);
    return response.data;
  } catch (error) {
    console.error("입실 처리 실패");
    throw error;
  }
};

// response
// {
//   "success": true,
//   "message": "입실하셨습니다.",
//   "data": {
//       "userId": 1,
//       "entryDate": "2024-09-10T10:49:51.4711276",
//       "exitDate": null,
//       "fee": null
//   },
//   "error": null
// }

// 퇴실 처리를 하는 함수
export const checkOut = async (userId: number) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/entry/${userId}/exit`
    );
    return response.data;
  } catch (error) {
    console.error("퇴실 처리 실패");
    throw error;
  }
};

// response
// {
//     "success": true,
//     "message": "퇴실하셨습니다.",
//     "data": {
//         "userId": 1,
//         "entryDate": "2024-09-10T10:49:51.471128",
//         "exitDate": "2024-09-10T10:49:53.2996999",
//         "fee": 50
//     },
//     "error": null
// }

// {
//     "success": false,
//     "message": "이미 퇴실하셨습니다.",
//     "data": null,
//     "error": {
//         "code": 400,
//         "details": null
//     }
// }
