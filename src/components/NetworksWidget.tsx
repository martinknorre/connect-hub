const networks = [
  { name: "Vodafone DE", usage: "234 GB", sessions: "12.4K", pct: 85 },
  { name: "Vodafone UK", usage: "189 GB", sessions: "9.8K", pct: 68 },
  { name: "Vodafone IT", usage: "156 GB", sessions: "7.2K", pct: 56 },
  { name: "Vodafone ES", usage: "98 GB", sessions: "5.1K", pct: 35 },
  { name: "Vodafone NL", usage: "67 GB", sessions: "3.4K", pct: 24 },
];

export function NetworksWidget() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">Top Serving Networks</h3>
      <p className="text-xs text-muted-foreground mb-4">Data usage by network</p>
      <div className="space-y-3">
        {networks.map((n) => (
          <div key={n.name} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">{n.name}</span>
                <span className="text-xs text-muted-foreground">{n.usage}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${n.pct}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
