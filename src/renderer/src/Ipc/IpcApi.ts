import { LlamaMessageType } from './../../../llama/LlamaMessageType';

export class LlamaChatIpc {

  window: any;
  constructor(window:any) {
    this.window = window;
  }

  prompt (message: string):Promise<string>{
    return this.window.electron.ipcRenderer.invoke(LlamaMessageType.prompt, message)
  }
}

const llamaChatIpc = new LlamaChatIpc(window);

export default llamaChatIpc;
