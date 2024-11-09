import React, { useState } from 'react'

import { cn } from '@/lib/utils'

import { Input } from './input'

interface TimeInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  className: string
}

const Time: React.FC<TimeInputProps> = ({ id, value, onChange, className }) => {
  const [time, setTime] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (isValidTime(newValue)) {
      setTime(newValue)
      onChange(newValue)
    }
  }

  const isValidTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    return isValidHours(hours) && isValidMinutes(minutes)
  }

  const isValidHours = (hours: string) => {
    const regex = /^(?:[01]?[0-9]|2[0-3])$/ // 00-23
    return regex.test(hours) && !isNaN(Number(hours))
  }

  const isValidMinutes = (minutes: string) => {
    const regex = /^[0-5]?[0-9]$/ // 00-59
    return regex.test(minutes) && !isNaN(Number(minutes))
  }

  return (
    <Input
      id={id}
      type="text"
      value={time}
      onChange={handleChange}
      placeholder="HH:MM"
      className={cn(
        'col-span-3 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600',
        className,
      )}
    />
  )
}

export default Time
