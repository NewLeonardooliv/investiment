'use client'

import { useState } from 'react'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default function Component() {
  const [salary, setSalary] = useState(5000)
  const [cdbInitialValue, setCdbInitialValue] = useState(5000)
  const [selicInitialValue, setSelicInitialValue] = useState(5000)
  const [poupancaInitialValue, setPoupancaInitialValue] = useState(5000)
  const [monthlyContribution, setMonthlyContribution] = useState(4500)
  const [cdiRate, setCdiRate] = useState(10.75)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(0.1)

  const expenses = [
    {
      name: 'Essenciais (Necessidades)',
      percentage: 55,
      amount: salary * 0.55,
      description:
        'Inclui despesas básicas, como aluguel, alimentação, contas, transporte, etc.',
    },
    {
      name: 'Liberdade Financeira (Investimentos)',
      percentage: 10,
      amount: salary * 0.1,
      description:
        'Montante destinado a investimentos para gerar renda passiva, visando independência financeira.',
    },
    {
      name: 'Educação (Crescimento Pessoal)',
      percentage: 10,
      amount: salary * 0.1,
      description:
        'Para investir em cursos, livros, treinamentos e qualquer coisa que aumente suas habilidades e conhecimentos.',
    },
    {
      name: 'Poupança para Grandes Compras',
      percentage: 10,
      amount: salary * 0.1,
      description:
        'Reserva para metas específicas, como viagens, compra de um carro, ou um fundo de emergência.',
    },
    {
      name: 'Diversão (Lazer)',
      percentage: 10,
      amount: salary * 0.1,
      description:
        'Dinheiro para gastar em atividades de lazer e entretenimento, como restaurantes, hobbies, passeios, etc.',
    },
    {
      name: 'Doações (Contribuição)',
      percentage: 5,
      amount: salary * 0.05,
      description:
        'Destinado a doações ou a ajudar outras pessoas, seja com caridade, ajuda à família, ou outros.',
    },
  ]

  const calculateInvestmentMetrics = (
    initialValue: number,
    annualRate: number,
  ) => {
    const monthlyRate = annualRate / 12

    const grossReturn = initialValue * (annualRate / 100)
    const taxRate = 0.15
    const tax = grossReturn * taxRate
    const netReturn = grossReturn - tax

    const finalValue = initialValue * (1 + annualRate / 100)
    const discountedValue = finalValue - tax

    return {
      annualRate,
      monthlyRate: monthlyRate.toFixed(2),
      monthlyRealRate: (monthlyRate * 0.85).toFixed(2),
      grossReturn: grossReturn.toFixed(2),
      tax: tax.toFixed(2),
      netReturn: netReturn.toFixed(2),
      finalValue: finalValue.toFixed(2),
      discountedValue: discountedValue.toFixed(2),
    }
  }

  const cdbMetrics = calculateInvestmentMetrics(cdbInitialValue, cdiRate)
  const selicMetrics = calculateInvestmentMetrics(selicInitialValue, 10.75)
  const poupancaMetrics = calculateInvestmentMetrics(poupancaInitialValue, 6.0)

  return (
    <div className="container mx-auto space-y-6 p-4">
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
                  {expenses.map((expense) => (
                    <TableRow key={expense.name}>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>{expense.name}</TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{expense.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{expense.percentage}%</TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>{formatCurrency(salary)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="month">Mês</Label>
              <Input
                type="number"
                id="month"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="year">Ano</Label>
              <Input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Label htmlFor="monthlyContribution">Aporte mensal</Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Aporte mensal é um valor que você decide investir em um
                      ativo financeiro de forma recorrente todo mês.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                type="number"
                id="monthlyContribution"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="cdiRate">Taxa CDI (%)</Label>
              <Input
                type="number"
                id="cdiRate"
                value={cdiRate}
                onChange={(e) => setCdiRate(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cdb" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cdb">CDB</TabsTrigger>
          <TabsTrigger value="selic">SELIC</TabsTrigger>
          <TabsTrigger value="poupanca">POUPANÇA</TabsTrigger>
        </TabsList>

        <TabsContent value="cdb">
          <Card>
            <CardHeader>
              <CardTitle>CDB</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="cdb-initial">Valor inicial</Label>
                  <Input
                    type="number"
                    id="cdb-initial"
                    value={cdbInitialValue}
                    onChange={(e) => setCdbInitialValue(Number(e.target.value))}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Métrica</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Valor CDI</TableCell>
                      <TableCell>{cdiRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rend sobre CDI</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Ano</TableCell>
                      <TableCell>{cdbMetrics.annualRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Mês</TableCell>
                      <TableCell>{cdbMetrics.monthlyRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Mês Real</TableCell>
                      <TableCell>{cdbMetrics.monthlyRealRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rendimentos Juros</TableCell>
                      <TableCell>
                        {formatCurrency(Number(cdbMetrics.grossReturn))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Imposto Rendimento</TableCell>
                      <TableCell>
                        {formatCurrency(Number(cdbMetrics.tax))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor Final</TableCell>
                      <TableCell>
                        {formatCurrency(Number(cdbMetrics.finalValue))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor descontado IR</TableCell>
                      <TableCell>
                        {formatCurrency(Number(cdbMetrics.discountedValue))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selic">
          <Card>
            <CardHeader>
              <CardTitle>SELIC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="selic-initial">Valor inicial</Label>
                  <Input
                    type="number"
                    id="selic-initial"
                    value={selicInitialValue}
                    onChange={(e) =>
                      setSelicInitialValue(Number(e.target.value))
                    }
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Métrica</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Taxa SELIC</TableCell>
                      <TableCell>10.75%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Ano</TableCell>
                      <TableCell>{selicMetrics.annualRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Mês</TableCell>
                      <TableCell>{selicMetrics.monthlyRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Mês Real</TableCell>
                      <TableCell>{selicMetrics.monthlyRealRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rendimentos Juros</TableCell>
                      <TableCell>
                        {formatCurrency(Number(selicMetrics.grossReturn))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Imposto Rendimento</TableCell>
                      <TableCell>
                        {formatCurrency(Number(selicMetrics.tax))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor Final</TableCell>
                      <TableCell>
                        {formatCurrency(Number(selicMetrics.finalValue))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor descontado IR</TableCell>
                      <TableCell>
                        {formatCurrency(Number(selicMetrics.discountedValue))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="poupanca">
          <Card>
            <CardHeader>
              <CardTitle>POUPANÇA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="poupanca-initial">Valor inicial</Label>
                  <Input
                    type="number"
                    id="poupanca-initial"
                    value={poupancaInitialValue}
                    onChange={(e) =>
                      setPoupancaInitialValue(Number(e.target.value))
                    }
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Métrica</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Taxa Poupança</TableCell>
                      <TableCell>6.00%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Ano</TableCell>
                      <TableCell>{poupancaMetrics.annualRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ao Mês</TableCell>
                      <TableCell>{poupancaMetrics.monthlyRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rendimentos Juros</TableCell>
                      <TableCell>
                        {formatCurrency(Number(poupancaMetrics.grossReturn))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor Final</TableCell>
                      <TableCell>
                        {formatCurrency(Number(poupancaMetrics.finalValue))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
