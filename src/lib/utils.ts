import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Expenses } from '@/pages/app/investment/investment'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(text: string, maxLength = 13) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength) + '...'
  }
}

export function formatarDataParaBrasileiro(data: string): string {
  const [year, month, day] = data.split('-')
  return `${day}/${month}/${year}`
}

export function formatQueryParams(params: object) {
  const queryParams = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(params).filter(([_, value]) => value !== undefined),
  )

  return queryParams
}

export function convertDecimalToHMS(decimalHours: number): string {
  const hours = Math.floor(decimalHours)
  const minutes = Math.floor((decimalHours - hours) * 60)
  const seconds = Math.round(((decimalHours - hours) * 60 - minutes) * 60)

  return `${hours}:${minutes}:${seconds}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

  const formattedDate = date.toISOString().split('T')[0]

  return formattedDate
}

export function isTimeGreaterThan(
  hourString: string,
  compareHour: number,
): boolean {
  const [hours, minutes, seconds] = hourString.split(':').map(Number)

  const time = new Date()
  time.setHours(hours, minutes, seconds, 0)

  const compareTime = new Date()
  compareTime.setHours(compareHour, 0, 0, 0)

  return time >= compareTime
}

export function limitarCaracteresWithRemoveTagsHTML(
  frase: string,
  limite = 35,
) {
  const regex = /<\/?[^>]+(>|$)/g
  frase = frase.replace(regex, '')
  frase = frase.replace(/&nbsp;/g, ' ')
  if (frase.length <= limite) {
    return frase
  } else {
    return frase.substring(0, limite) + '...'
  }
}

export function calculateHours(records: string[]): string {
  if (records.length % 2 === 0) {
    return ''
  }

  const now = new Date()

  const timeStringToDate = (timeString: string): Date => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes, seconds, 0)
    return date
  }

  const millisecondsToTimeString = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (num: number) => num.toString().padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  let totalMilliseconds = 0

  for (let i = 0; i < records.length; i += 2) {
    const startTime = timeStringToDate(records[i])
    const endTime =
      i + 1 < records.length ? timeStringToDate(records[i + 1]) : now

    const differenceInMilliseconds = endTime.getTime() - startTime.getTime()
    totalMilliseconds += differenceInMilliseconds
  }

  return millisecondsToTimeString(totalMilliseconds)
}

export function timeRecords(arr: string[]): string[] {
  const timeFormatRegex = /^\d{2}:\d{2}:\d{2}$/

  const timeRecords = arr.filter((item) => timeFormatRegex.test(item))

  return timeRecords
}

export function formatDateTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const date = new Date(dateString)
  return date.toLocaleString('pt-BR', options).replace(',', '')
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const calculatePorcentage = (expenses: Expenses[]) => {
  let porcentage = 0

  expenses.forEach((expense) => {
    porcentage += expense.percentage
  })

  return Math.round(porcentage * 100) / 100
}
