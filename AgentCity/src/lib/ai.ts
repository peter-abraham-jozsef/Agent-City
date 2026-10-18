import type { UIMessage } from "ai"

// Extracts text from the AI SDK's message format
export function getMessageText(message: any): string {
  if (message.content) return message.content;
  if (message.parts) {
    return message.parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("");
  }
  return "";
}

// A mock builder to simulate the scripted AI from the demo
export function createChat<T>() {
  const script: any[] = [];
  
  const chain = {
    user: (text: string) => {
      script.push({ role: "user", text });
      return chain;
    },
    sleep: (ms: number) => {
      script.push({ type: "sleep", ms });
      return chain;
    },
    assistant: (fn: any) => {
      script.push({ role: "assistant", fn });
      return chain;
    },
    get: (index: number) => {
      // Return the first user message to start the chat
      const firstUser = script.find(s => s.role === "user");
      if (!firstUser) return [];
      return [{
        id: "msg-1",
        role: "user",
        content: firstUser.text,
        parts: [{ type: "text", text: firstUser.text }]
      }];
    },
    next: (messages: any[]) => {
      // Pre-fills the input box with the next user message
      const userMessages = script.filter(s => s.role === "user");
      const nextIndex = messages.filter((m: any) => m.role === "user").length;
      return userMessages[nextIndex] ? { text: userMessages[nextIndex].text } : null;
    },
    transport: (opts: any) => {
      // Return a mock transport that useChat can understand
      return {};
    }
  };
  
  return chain;
}