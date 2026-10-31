
import { RotateCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatHeaderProps {
  onReset: () => void
  disabled?: boolean // Optional prop represented by '?'
}

export function ChatHeader({ onReset, disabled = false }: ChatHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 p-8 pb-4">
      <div className="flex flex-col gap-1">
        <div className="font-medium">New Thread</div>
        <div className="text-sm text-muted-foreground">
          Ask the agent to change your code.
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              aria-label="Reset conversation"
              onClick={onReset}
              disabled={disabled}
            >
              <RotateCwIcon />
            </Button>
          }
        />
        <TooltipContent>
          <p>Reset</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}