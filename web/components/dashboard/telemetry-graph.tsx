"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts"

import { useEffect, useState } from "react"

function generatePoint(index: number) {
  return {
    value:
      50 +
      Math.sin(index / 4) * 20 +
      Math.random() * 10,
  }
}

export default function TelemetryGraph({
  className = "",
}: {
  className?: string
}) {
  const [data, setData] = useState<{ value: number }[]>(
    Array.from({ length: 40 }, (_, i) => generatePoint(i))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)]

        next.push({
          value:
            50 +
            Math.sin(Date.now() / 1000) * 20 +
            Math.random() * 10,
        })

        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="white"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
