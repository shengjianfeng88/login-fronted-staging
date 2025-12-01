import React from "react"

interface Stat {
  requests: number
  success: number
  failures: number
}

interface Props {
  stats: Record<string, Stat>
}

export default function DashboardStats({ stats }: Props) {
  const vendorLabels: Record<string, string> = {
    default : "default",
    juguang: "Juguang",
    veoflow: "VeoFlow",
    gemini: "Gemini"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {Object.keys(stats).map((vendor) => {
        const s = stats[vendor]
        return (
          <div
            key={vendor}
            className="bg-white shadow border rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-bold">{vendorLabels[vendor]}</h3>
            <div className="mt-2 text-gray-700 space-y-1">
              <p>Requests: <span className="font-semibold">{s.requests}</span></p>
              <p className="text-green-600">Success: <span className="font-semibold">{s.success}</span></p>
              <p className="text-red-500">Failures: <span className="font-semibold">{s.failures}</span></p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
