type StatCardProps = {
  label: string
  value: string | number
}

export const StatCard = ({ label, value }: StatCardProps) => (
  <div className="rounded-xl bg-panel px-4 py-3">
    <p className="text-xs text-muted">{label}</p>
    <p className="mt-1 text-xl font-medium">{value}</p>
  </div>
)
