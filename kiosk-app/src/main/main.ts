// main/main.ts 파일은 Electron의 메인 프로세스로 사용

import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";

const API_BASE_URL =
  process.env.VITE_API_BASE_URL || "https://j11a507.p.ssafy.io";

// Windows에서 설치/제거 시 바로가기를 생성/제거하는 것을 처리
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // 브라우저 창을 생성
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 환경 변수 확인을 위한 로그
  // console.log("Main process API_BASE_URL:", process.env.API_BASE_URL);
  // console.log("Main process API_BASE_URL:", API_BASE_URL);

  // console.log("MAIN_WINDOW_VITE_NAME", MAIN_WINDOW_VITE_NAME);
  // console.log("__dirname:", __dirname);
  // console.log("app.getAppPath():", app.getAppPath());

  // 그리고 앱의 index.html을 로드
  // if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  //   mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  // } else {
  //   path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`);
  //   // mainWindow.loadFile(
  //   //   path.join(__dirname, "..", "renderer", "main_window", "index.html")
  //   // );
  // }
  if (app.isPackaged) {
    const indexPath = path.join(__dirname, "../renderer/index.html");
    console.log("Loading file from:", indexPath);
    mainWindow.loadFile(indexPath);
  } else {
    // 개발 모드
    mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
  }

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools(); // 개발자 도구 열기
    // mainWindow.setMenuBarVisibility(true); // 메뉴 바 숨기기
  } else {
    Menu.setApplicationMenu(null); // 배포 환경에서는 메뉴 바 제거
    mainWindow.setFullScreen(true); // 전체 화면으로 설정
    // mainWindow.webContents.openDevTools(); // 개발자 도구 열기
  }
};

// 이 메서드는 Electron이 초기화를 완료하고 브라우저 창을 생성할 준비가 되었을 때 호출됩니다.
// 일부 API는 이 이벤트가 발생한 후에만 사용할 수 있습니다.
app.on("ready", createWindow);

// macOS를 제외한 모든 창이 닫힐 때 종료합니다.
// macOS에서는 사용자 명령으로 Cmd + Q를 통해 명시적으로 종료할 때까지
// 애플리케이션과 메뉴 바가 활성 상태로 남아 있는 것이 일반적입니다.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // OS X에서는 도크 아이콘이 클릭되고 다른 창이 열려 있지 않으면
  // 앱에서 창을 다시 생성하는 것이 일반적입니다.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 이 파일에서 앱의 메인 프로세스에 대한 나머지 구체적인 코드를 포함할 수 있습니다.
// 이 코드를 별도의 파일로 작성한 후 여기에 가져올 수도 있습니다.

// API 요청을 처리하는 IPC 핸들러
ipcMain.handle("api-request", async (event, { method, endpoint, data }) => {
  try {
    // const url = `${process.env.API_BASE_URL}${endpoint}`;
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
});
