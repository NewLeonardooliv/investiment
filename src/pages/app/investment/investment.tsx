'use client'

import { Info } from 'lucide-react'
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

type Expenses = {
  name: string
  percentage: number
  description: string
}

export default function Component() {
  const [salary, setSalary] = useState(5000)
  const [cdbInitialValue, setCdbInitialValue] = useState(5000)
  const [selicInitialValue, setSelicInitialValue] = useState(5000)
  const [poupancaInitialValue, setPoupancaInitialValue] = useState(5000)
  const [monthlyContribution, setMonthlyContribution] = useState(550)
  const [cdiRate, setCdiRate] = useState(10.75)
  const [month, setMonth] = useState(12)

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

  const calculateRate = (): number => {
    const rate = month <= 6 ? 22.5 : month <= 12 ? 20 : month <= 24 ? 17.5 : 15

    if (rate < 0) {
      return 0
    }

    return rate
  }

  const rate = calculateRate()

  const calculateInvestmentMetrics = (
    initialValue: number,
    annualRate: number,
  ) => {
    const monthlyRate = annualRate / 12

    const amountInvested = calculateAmountInvested(initialValue)

    const grossReturn =
      monthlyContribution !== 0
        ? initialValue * Math.pow(1 + monthlyRate / 100, month) +
          (monthlyContribution *
            Math.pow(1 + monthlyRate / 100, month) *
            (Math.pow(1 + monthlyRate / 100, month) - 1)) /
            (Math.pow(1 + monthlyRate / 100, 1) - 1) -
          amountInvested
        : initialValue * Math.pow(1 + monthlyRate / 100, month) - amountInvested

    const discountedIncomeIR = grossReturn - (grossReturn * rate) / 100
    const discountedValue = amountInvested + discountedIncomeIR
    const tax = grossReturn - discountedIncomeIR
    const netReturn = grossReturn - tax

    const finalValue = grossReturn + amountInvested

    return {
      amountInvested,
      annualRate,
      monthlyRate: monthlyRate.toFixed(2),
      monthlyRealRate: (monthlyRate - (monthlyRate * rate) / 100).toFixed(2),
      grossReturn: grossReturn.toFixed(2),
      tax: tax.toFixed(2),
      netReturn: netReturn.toFixed(2),
      finalValue: finalValue.toFixed(2),
      discountedIncomeIR: discountedIncomeIR.toFixed(2),
      discountedValue: discountedValue.toFixed(2),
    }
  }

  const calculateAmountInvested = (initialValue: number) => {
    console.log(monthlyContribution)

    return initialValue + month * monthlyContribution
  }

  const cdbMetrics = calculateInvestmentMetrics(cdbInitialValue, cdiRate)
  const selicMetrics = calculateInvestmentMetrics(selicInitialValue, 10.75)
  const poupancaMetrics = calculateInvestmentMetrics(poupancaInitialValue, 6.0)

  const calculatePorcentage = (expenses: Expenses[]) => {
    let porcentage = 0

    expenses.forEach((expense) => {
      porcentage += expense.percentage
    })

    return Math.round(porcentage * 100) / 100
  }

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
                    <TableCell>
                      {calculatePorcentage(expenses) * 100}%
                    </TableCell>
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
                disabled
                id="year"
                value={(month / 12).toFixed(1)}
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
              <Label htmlFor="fees">Juros (%)</Label>
              <Input type="number" disabled id="fees" value={rate} />
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
            <CardHeader className="flex flex-row">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CardTitle>CDB</CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      CDB é a sigla para Certificado de Depósito Bancário, um
                      investimento de renda fixa em que o investidor empresta
                      dinheiro a uma instituição financeira por um período de
                      tempo determinado. Em troca, o investidor recebe o valor
                      investido acrescido de juros.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <Label htmlFor="cdb-initial">Valor inicial</Label>
                    <Input
                      type="number"
                      id="cdb-initial"
                      value={cdbInitialValue}
                      onChange={(e) =>
                        setCdbInitialValue(Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="cdiRate">Taxa CDI (%)</Label>
                    <Input
                      type="number"
                      id="cdiRate"
                      value={cdiRate}
                      onChange={(e) => setCdiRate(Number(e.target.value))}
                    />
                  </div>
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
                      <TableCell>Valor Investido</TableCell>
                      <TableCell>
                        {formatCurrency(cdbMetrics.amountInvested)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor CDI</TableCell>
                      <TableCell>{cdiRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Renda sobre CDI</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>Juros</TableHead>
                      <TableHead></TableHead>
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
                      <TableHead>Dinheiro</TableHead>
                      <TableHead></TableHead>
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
                      <TableCell>Rendimentos descontado IR</TableCell>
                      <TableCell>
                        {formatCurrency(Number(cdbMetrics.discountedIncomeIR))}
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
            <CardHeader className="flex flex-row">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CardTitle>SELIC</CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      A Selic (Sistema Especial de Liquidação e Custódia) é a
                      taxa básica de juros da economia brasileira. Ela é o
                      principal instrumento do Banco Central do Brasil (BC) para
                      controlar a inflação.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <p>
                O CDB (Certificado de Depósito Bancário) geralmente oferece as
                melhores taxas de retorno entre as opções apresentadas.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <p>
                A taxa SELIC é a taxa básica de juros da economia brasileira,
                utilizada como referência para várias aplicações financeiras.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <p>
                A poupança é considerada um investimento de baixo risco, mas
                geralmente oferece retornos menores em comparação com outras
                opções.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <p>
                Lembre-se de considerar seus objetivos financeiros, perfil de
                risco e horizonte de investimento ao escolher uma opção de
                investimento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
