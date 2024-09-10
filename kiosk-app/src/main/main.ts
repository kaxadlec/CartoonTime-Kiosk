import { app, BrowserWindow, Menu } from "electron";
import path from "path";

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
    },
  });

  // 그리고 앱의 index.html을 로드
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools(); // 개발자 도구 열기
    // mainWindow.setMenuBarVisibility(true); // 메뉴 바 숨기기
  } else {
    Menu.setApplicationMenu(null); // 배포 환경에서는 메뉴 바 제거
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
