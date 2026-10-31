// components/Chat/ChatInputForm.tsx
import * as React from "react"
import {
  ArrowUpIcon,
  ChevronDownIcon,
  GlobeIcon,
  PaperclipIcon,
  PlusIcon,
  TelescopeIcon,
} from "lucide-react"

import { ContextDemo } from "@/components/Footer/Context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"

interface ChatInputFormProps {
  text: string
  onChangeText: (value: string) => void
  onSubmit: () => void
  canSend: boolean
  model: string
  onChangeModel: (model: string) => void
  effort: string
  onChangeEffort: (effort: string) => void
}

export function ChatInputForm({
  text,
  onChangeText,
  onSubmit,
  canSend,
  model,
  onChangeModel,
  effort,
  onChangeEffort,
}: ChatInputFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)

  // Explicit React SyntheticEvent typing in TypeScript
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (canSend) {
      onSubmit()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <InputGroup>
        <InputGroupTextarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Ask the agent..."
          aria-label="Message"
          className="min-h-14"
          onKeyDown={handleKeyDown}
        />
        <InputGroupAddon align="block-end" className="pt-1">
          {/* Context Options */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton
                  aria-label="Add context"
                  type="button"
                  size="icon-sm"
                  variant="outline"
                >
                  <PlusIcon />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align="start" side="top" className="w-44">
              <DropdownMenuItem>
                <PaperclipIcon />
                Add Photos & Files
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <TelescopeIcon />
                Deep Research
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GlobeIcon />
                Web Search
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Model Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton size="sm" variant="ghost">
                  {model === "gpt-5-mini" ? "GPT-5 mini" : "GPT-5"}
                  <ChevronDownIcon />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value={model} onValueChange={onChangeModel}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>OpenAI</DropdownMenuLabel>
                  <DropdownMenuRadioItem value="gpt-5">
                    GPT-5
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="gpt-5-mini">
                    GPT-5 mini
                  </DropdownMenuRadioItem>
                </DropdownMenuGroup>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Effort Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton size="sm" variant="ghost">
                  {effort.charAt(0).toUpperCase() + effort.slice(1)}
                  <ChevronDownIcon />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value={effort} onValueChange={onChangeEffort}>
                <DropdownMenuGroup>
                  <DropdownMenuRadioItem value="low">
                    Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="medium">
                    Medium
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="high">
                    High
                  </DropdownMenuRadioItem>
                </DropdownMenuGroup>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ContextDemo />

          <InputGroupButton
            type="submit"
            variant="default"
            size="icon-sm"
            disabled={!canSend}
            className="ml-auto"
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}