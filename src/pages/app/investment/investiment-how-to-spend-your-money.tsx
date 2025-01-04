import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { calculatePorcentage, formatCurrency } from '@/lib/utils'

import { Expenses } from './investment'

const expenses: Expenses[] = [
  {
    name: 'Essenciais (Necessidades)',
    percentage: 0.6,
    description:
      'Inclui despesas básicas, como aluguel, alimentação, contas, transporte, etc.',
  },
  {
    name: 'Liberdade Financeira (Investimentos)',
    percentage: 0.1,
    description:
      'Montante destinado a investimentos para gerar renda passiva, visando independência financeira.',
  },
  {
    name: 'Educação (Crescimento Pessoal)',
    percentage: 0.1,
    description:
      'Para investir em cursos, livros, treinamentos e qualquer coisa que aumente suas habilidades e conhecimentos.',
  },
  {
    name: 'Poupança para Grandes Compras',
    percentage: 0.1,
    description:
      'Reserva para metas específicas, como viagens, compra de um carro, ou um fundo de emergência.',
  },
  {
    name: 'Diversão (Lazer)',
    percentage: 0.1,
    description:
      'Dinheiro para gastar em atividades de lazer e entretenimento, como restaurantes, hobbies, passeios, etc.',
  },
]

export function InvestimentHowToSpendYourMoney() {
  const [salary, setSalary] = React.useState(5000)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Como gastar seu dinheiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="salary">Salário</Label>
            <Input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="max-w-xs"
            />
          </div>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Porcentagem</TableHead>
                  <TableHead>Gastar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense: Expenses) => (
                  <TableRow key={expense.name}>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>{expense.name}</TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{expense.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{expense.percentage * 100}%</TableCell>
                    <TableCell>
                      {formatCurrency(salary * expense.percentage)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell>{calculatePorcentage(expenses) * 100}%</TableCell>
                  <TableCell>{formatCurrency(salary)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
