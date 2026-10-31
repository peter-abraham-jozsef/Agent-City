
import { MessageCircleDashedIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { getMessageText } from "@/lib/ai"
import { MESSAGE_ANIMATIONS } from "@/lib/message-animations"
import { Markdown } from "@/components/Chat/Markdown"
import { StepRow, type ChatPart, type ChatMessage } from "@/components/Chat/StepTrace"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Empty, EmptyHeader, EmptyMedia } from "@/components/ui/empty"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Trace } from "@/components/ui/trace"

const MotionMessageScrollerItem = motion.create(MessageScrollerItem)

interface ChatMessageListProps {
  messages: ChatMessage[]
  busy: boolean
}

export function ChatMessageList({ messages, busy }: ChatMessageListProps) {
  const shouldReduceMotion = useReducedMotion()

  if (messages.length === 0) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircleDashedIcon />
          </EmptyMedia>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent aria-busy={busy} className="gap-6 px-8 py-0">
          {messages.map((message) => {
            if (message.role === "user") {
              return (
                <MotionMessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor
                  variants={MESSAGE_ANIMATIONS["slide-up"].variants}
                  initial={shouldReduceMotion ? false : "initial"}
                  animate="animate"
                >
                  <Message align="end">
                    <MessageContent>
                      <Bubble align="end" variant="muted">
                        <BubbleContent>
                          {getMessageText(message)}
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MotionMessageScrollerItem>
              )
            }

            const streaming = busy && message === messages.at(-1)
            const steps = message.parts.filter(
              (part) =>
                part.type === "reasoning" ||
                part.type === "tool-runCommand"
            )
            const reply = getMessageText(message)

            return (
              <MessageScrollerItem key={message.id} messageId={message.id}>
                <Message>
                  <MessageContent className="gap-3">
                    {steps.length > 0 && (
                      <Trace>
                        {steps.map((part, index) => (
                          <StepRow
                            key={index}
                            part={part as ChatPart}
                            streaming={streaming}
                          />
                        ))}
                      </Trace>
                    )}
                    {reply && <Markdown content={reply} />}
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            )
          })}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  )
}