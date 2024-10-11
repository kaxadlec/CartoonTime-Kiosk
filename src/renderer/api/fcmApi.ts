import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  doc,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore"; // Firestore API 함수들 임포트
import { firestore } from "../../firebase"; // Firebase 설정 파일

// FCM 메시지 모델
interface FcmMessage {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Timestamp;
}

// 메시지 리스너 해제 함수
let unsubscribe: (() => void) | null = null;

// Firestore 인스턴스 가져오기
const db = getFirestore();

// 메시지 저장 함수
export const saveMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  // 현재 시간을 Timestamp로 변환
  const timestamp = Timestamp.now();
  const message: FcmMessage = { senderId, receiverId, content, timestamp };

  try {
    // messages 컬렉션에 메시지 추가
    const documentReference = await addDoc(
      collection(firestore, "messages"),
      message
    ); // firestore 사용
    // console.log(
    //   `메시지가 성공적으로 저장되었습니다. ID: ${documentReference.id}`
    // );
    console.log("최종성공: firebase에 메시지 저장 성공");
  } catch (error) {
    console.error(`메시지 저장 실패: ${(error as Error).message}`);
  }
};

export const listenForMessages = (
  onMessageReceived: (message: FcmMessage) => void
) => {
  console.log("메시지리스너가 활성화되었습니다.");

  const q = query(
    collection(firestore, "messages"),
    // where("senderId", "==", "module"),
    where("receiverId", "==", "kiosk")
  );

  unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const message = change.doc.data() as FcmMessage;
          onMessageReceived(message);
          deleteMessage(change.doc.id);
        }
      });
    },
    (error) => {
      console.error("Listen failed: ", error);
    }
  );
};

const deleteMessage = async (documentId: string) => {
  try {
    await deleteDoc(doc(firestore, "messages", documentId));
    console.log("메시지가 성공적으로 삭제되었습니다. ID: ", documentId);
  } catch (error) {
    console.error("메시지 삭제 실패: ", error);
  }
};

export const removeMessageListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    console.log("메시지 리스너가 제거되었습니다.");
  }
};
