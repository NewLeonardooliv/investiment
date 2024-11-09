import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps extends ComponentProps<'div'> {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function DatePicker({ date, onDateChange, className }: DatePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'justify-start px-3 text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'LLL dd, y') : <span>Escolha uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
