import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
  
} from "@/components/ui/chart"
import type {ChartConfig} from "@/components/ui/chart";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarOrders({
  data,
}: {
  data: { month: string; orders: number }[]
}) {
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Orders</CardTitle>
        <CardDescription>Orders per month for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" formatter={(v: any) => `${Number(v)} orders`} />}
            />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {totalOrders} total orders <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Last 6 months</div>
      </CardFooter>
    </Card>
  )
}
