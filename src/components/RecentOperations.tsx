import { ArrowUpRight, ArrowDownRight, RefreshCw, Power } from "lucide-react";

const operations = [
  { id: "OP-4821", type: "Activate", sim: "8944...3201", status: "Completed", time: "2 min ago", icon: Power },
  { id: "OP-4820", type: "Profile Change", sim: "8944...1455", status: "Pending", time: "15 min ago", icon: RefreshCw },
  { id: "OP-4819", type: "Suspend", sim: "8944...7823", status: "Completed", time: "1 hr ago", icon: ArrowDownRight },
  { id: "OP-4818", type: "Resume", sim: "8944...5567", status: "Completed", time: "2 hrs ago", icon: ArrowUpRight },
];

export function RecentOperations() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Operations</h3>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </div>
        <button className="text-xs text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-2">
        {operations.map((op) => (
          <div key={op.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="p-1.5 rounded-md bg-muted">
              <op.icon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{op.type}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  op.status === "Completed"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}>
                  {op.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground font-mono">{op.sim}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{op.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
