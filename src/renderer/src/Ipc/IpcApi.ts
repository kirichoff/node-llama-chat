import { electronAPI } from '@electron-toolkit/preload';
import { LlamaMessageType } from './../../../llama/LlamaMessageType';

declare global {
  interface Window {
    electron: typeof electronAPI;
  }
}

export class LlamaChatIpc {

  window: Window;
  constructor(window:Window) {
    this.window = window;
  }

  prompt (message: string):Promise<string>{
    return this.window.electron.ipcRenderer.invoke(LlamaMessageType.prompt, message)
  }
}

const llamaChatIpc = new LlamaChatIpc(window);

export default llamaChatIpc;
