import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  label: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function QuickAction({ label, description, icon: Icon, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="glass-card-hover p-4 text-left w-full group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );
}
