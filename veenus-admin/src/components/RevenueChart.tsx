'use client';

import { RevenueData } from '@/types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface RevenueChartProps {
  data: RevenueData[];
  timePeriod: 'daily' | 'weekly' | 'monthly';
}

export default function RevenueChart({ data, timePeriod }: RevenueChartProps) {
  const formatLabel = (value: string) => {
    if (timePeriod === 'daily') {
      const date = new Date(value);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }
    return value;
  };

  const formatCurrency = (value: number) => `€${(value / 1000).toFixed(1)}k`;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#161616] border border-[#333] rounded-lg px-4 py-3 shadow-lg">
          <p className="text-xs text-[#888] mb-1">{label}</p>
          <p className="text-sm font-semibold text-gold-300">
            €{payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className="text-xs text-[#999] mt-0.5">
              {payload[1].value} orders
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        {timePeriod === 'monthly' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis
              dataKey="date"
              tickFormatter={formatLabel}
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#222' }}
              tickLine={{ stroke: '#222' }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#222' }}
              tickLine={{ stroke: '#222' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#B8860B" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B8860B" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#B8860B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis
              dataKey="date"
              tickFormatter={formatLabel}
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#222' }}
              tickLine={{ stroke: '#222' }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#222' }}
              tickLine={{ stroke: '#222' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={2}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
