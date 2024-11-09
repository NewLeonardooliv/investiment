import * as React from 'react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export type FileInputProps = React.InputHTMLAttributes<HTMLInputElement>

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, ...props }, ref) => {
    const [fileName, setFileName] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFileName(file.name)
      }
      if (props.onChange) props.onChange(event)
    }

    return (
      <div
        className={cn('flex flex-col items-center justify-center', className)}
      >
        <input
          type="file"
          className="hidden"
          ref={ref}
          {...props}
          onChange={handleChange}
        />
        <label
          htmlFor={props.id}
          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {fileName || props.children || 'Escolher arquivo'}
        </label>
      </div>
    )
  },
)

FileInput.displayName = 'FileInput'

export { FileInput }
