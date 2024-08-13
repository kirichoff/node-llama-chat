import { getLlama, Llama, LlamaChatSession, LlamaContext, LlamaModel } from 'node-llama-cpp'
import path from 'path'
import { ipcMain } from 'electron'
import { LlamaMessageType } from './LlamaMessageType'
import { error } from 'console'

const systemPrompt: string =
  "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."

export interface LlamaState {
  session: LlamaChatSession
  context: LlamaContext
  model: LlamaModel
  llama: Llama
}

export class LlamaChat {
  state: Promise<LlamaState>

  constructor() {
    this.state = this.innit()
  }

  async initIPCHandlers() {
    this.promptHandler()
  }

  private promptHandler() {
    ipcMain.handle(LlamaMessageType.prompt, async (_event, message: string) => {
      return await this.prompt(message)
    })
  }

  async prompt(message: string): Promise<string> {
    let { session } = await this.state
    if (session !== null) {
      return session.prompt(message, { maxParallelFunctionCalls: 1 })
    } else {
      throw new error('cannot find the session')
    }
  }

  private async innit(): Promise<LlamaState> {
    const llama = await getLlama()

    const model_path = path.join(
      __dirname,
      '../../',
      '/resources/models',
      'Meta-Llama-3.1-8B-Instruct.Q8_0.gguf'
    )

    const model = await llama.loadModel({
      modelPath: model_path
    })

    const context = await model.createContext()

    const session = new LlamaChatSession({
      systemPrompt: systemPrompt,
      contextSequence: context.getSequence()
    })

    return {
      llama: llama,
      session: session,
      model: model,
      context: context
    } as LlamaState
  }
}

export const llamaChatService = new LlamaChat()
