// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// main/preload.ts
// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   updateEnv: (callback) => ipcRenderer.on("update-env", callback),
// });

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  updateEnv: (callback) => ipcRenderer.on("update-env", callback),
  apiRequest: (params) => ipcRenderer.invoke("api-request", params),
});
