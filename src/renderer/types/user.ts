// types/user.ts

export interface User {
  id: number;
  name: string;
  currentMoney: number | null;
  isCurrentlyCheckedIn: boolean;
}

export interface EntryExitLog {
  userId: number;
  entryDate: string;
  exitDate: string | null;
  fee: number;
}
