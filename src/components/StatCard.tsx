import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  accent?: "primary" | "aqua" | "turquoise" | "lemon";
}

export function StatCard({ label, value, change, changeType = "neutral", icon: Icon, accent = "primary" }: StatCardProps) {
  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  const accentStyles = {
    primary: "bg-primary/10 text-primary",
    aqua: "bg-aqua/10 text-aqua",
    turquoise: "bg-turquoise/10 text-turquoise",
    lemon: "bg-lemon/10 text-lemon",
  }[accent];

  return (
    <div className="glass-card-hover p-5 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-2 font-medium ${changeColor}`}>{change}</p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${accentStyles}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
