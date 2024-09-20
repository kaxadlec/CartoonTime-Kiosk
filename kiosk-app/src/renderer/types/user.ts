// types/user.ts

export interface User {
  id: number;
  name: string;
  currentMoney: number | null;
  isCurrentlyCheckedIn: boolean;
}

export interface EntryRecord {
  userId: number;
  entryDate: string;
  exitDate: string | null;
  fee: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: EntryRecord[];
  error: string | null;
}
