// 결제 처리 함수 (실제 API 또는 mock 데이터)
export const postPayment = async (userId: number, amount: number) => {
  const useMock = false; // mock 사용 여부

  if (useMock) {
    return mockPayment(userId, amount);
  }
  return realPayment(userId, amount);
};

// 실제 결제 처리 함수
export const realPayment = async (userId: number, amount: number) => {
  try {
    const response = await window.electronAPI.apiRequest({
      method: "POST",
      endpoint: "/ct/pay",
      data: {
        userId: userId,
        amount: amount,
      },
    });
    return response;
  } catch (error: any) {
    console.error("결제 처리 실패", error);
    return {
      success: false,
      message: "결제 처리에 실패했습니다.",
      data: null,
      error: error.response?.data?.error || {
        code: error.response?.status || 500,
        details: error.message,
      },
    };
  }
};

// Mock 결제 처리 함수
export const mockPayment = async (userId: number, amount: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "결제에 성공했습니다.",
    data: {
      userId: userId,
      currentMoney: 1004000, // 예시 금액
    },
    error: null,
  };
};
