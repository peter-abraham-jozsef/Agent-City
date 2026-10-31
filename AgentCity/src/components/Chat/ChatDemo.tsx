// components/Chat/ChatDemo.tsx
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"

import { createChat, getMessageText } from "@/lib/ai"
import { ChatHeader } from "@/components/Chat/ChatHeader"
import { ChatInputForm } from "@/components/Chat/ChatInputForm"
import { ChatMessageList } from "@/components/Chat/ChatMessageList"
import { type ChatMessage } from "@/components/Chat/StepTrace"
import { MessageScrollerProvider } from "@/components/ui/message-scroller"

const chat = createChat<ChatMessage>()
  .user("Add a dark mode toggle to the settings page.")
  .sleep(600)
  .assistant(({ writer }: { writer: any }) => {
    writer.reasoning(
      "I need to know how themes are set up before I add a toggle. If next-themes is already in the layout, the toggle only has to call setTheme."
    )
    writer.sleep(400)
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .sleep(800)
      .output({ stdout: "app/layout.tsx" })
    writer.sleep(500)
    writer.text(`next-themes is already set up in \`app/layout.tsx\`, so the toggle only has to call \`setTheme\`.

**Changes**

- Added \`components/mode-toggle.tsx\` with a Light and Dark option.
- Put \`<ModeToggle />\` next to the Appearance heading in \`app/settings/page.tsx\`.

\`\`\`tsx
const { setTheme } = useTheme()
\`\`\`
`)
  })

const initialMessages = chat.get(0) as unknown as ChatMessage[]
const transport = chat.transport({
  delayMs: 16,
  fallback: "This demo only knows the scripted turns. Press reset to start over.",
}) as any

export function ChatDemo() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  })

  const [draft, setDraft] = React.useState<string | null>(null)
  const [model, setModel] = React.useState<string>("gpt-5")
  const [effort, setEffort] = React.useState<string>("medium")

  const nextMessage = chat.next(messages as unknown as ChatMessage[])
  const busy = status === "submitted" || status === "streaming"
  const text = draft ?? (nextMessage ? getMessageText(nextMessage) : "")
  const canSend = text.trim().length > 0 && !busy

  function handleSubmit() {
    if (!canSend) return

    if (draft === null && nextMessage) {
      void sendMessage(nextMessage)
    } else {
      void sendMessage({ text: text.trim() })
    }
    setDraft(null)
  }

  function handleReset() {
    setMessages(initialMessages)
    setDraft(null)
  }

  return (
    <MessageScrollerProvider>
      <div className="relative flex w-full flex-col gap-4 [[data-slot=preview]:has(&)]:bg-background [[data-slot=preview]:has(&)>div]:p-0!">
        <div className="flex h-200 w-full flex-col gap-4">
          <ChatHeader onReset={handleReset} disabled={busy} />
          
          <div className="min-h-0 flex-1">
            <ChatMessageList
              messages={messages as unknown as ChatMessage[]}
              busy={busy}
            />
          </div>

          <div className="p-8 pt-0">
            <ChatInputForm
              text={text}
              onChangeText={setDraft}
              onSubmit={handleSubmit}
              canSend={canSend}
              model={model}
              onChangeModel={setModel}
              effort={effort}
              onChangeEffort={setEffort}
            />
          </div>
        </div>
      </div>
    </MessageScrollerProvider>
  )
}