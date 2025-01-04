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

const invest = [
  {
    name: 'Renda Fixa',
    percentage: 0.5,
    description:
      'Investimento em ativos de baixo risco e alta segurança, como CDB e Tesouro Selic, proporcionando retorno previsível e liquidez diária, ideal para proteção do capital.',
  },
  {
    name: 'Fundos de Ações',
    percentage: 0.3,
    description:
      'Investimento em ETFs que replicam índices de ações, como o Ibovespa (IBOV11) e fundos imobiliários (XFIX11), permitindo diversificação no mercado de ações com gestão simplificada e menor risco em comparação com ações individuais.',
  },
  {
    name: 'Criptoativos',
    percentage: 0.1,
    description:
      'Pequena exposição ao mercado de criptoativos, como Bitcoin ou Ethereum, visando potencial de valorização no longo prazo, com risco moderado.',
  },
  {
    name: 'Ações Individuais',
    percentage: 0.1,
    description:
      'Ações de empresas consolidadas no mercado nacional, oferecendo um equilíbrio entre liquidez e potencial de valorização com exposição a empresas de alta solidez.',
  },
]

export function InvestimentPortifolio() {
  const [toInvest, setToInvest] = React.useState(5000)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carteira de investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="salary">Valor a investir</Label>
            <Input
              type="number"
              id="salary"
              value={toInvest}
              onChange={(e) => setToInvest(Number(e.target.value))}
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
                {invest.map((expense: Expenses) => (
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
                      {formatCurrency(toInvest * expense.percentage)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell>{calculatePorcentage(invest) * 100}%</TableCell>
                  <TableCell>{formatCurrency(toInvest)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
