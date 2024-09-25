import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'; // Firestore API 함수들 임포트
import { firestore } from '../../firebase'; // Firebase 설정 파일

// FCM 메시지 모델
interface FcmMessage {
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Timestamp;
}

// Firestore 인스턴스 가져오기
const db = getFirestore();

export const saveMessage = async (senderId: string, receiverId: string, content: string) => {
    // 현재 시간을 Timestamp로 변환
    const timestamp = Timestamp.now();
    const message: FcmMessage = { senderId, receiverId, content, timestamp };

    try {
        // messages 컬렉션에 메시지 추가
        const documentReference = await addDoc(collection(firestore, "messages"), message); // firestore 사용
        console.log(`메시지가 성공적으로 저장되었습니다. ID: ${documentReference.id}`);
    } catch (error) {
        console.error(`메시지 저장 실패: ${(error as Error).message}`);
    }
};