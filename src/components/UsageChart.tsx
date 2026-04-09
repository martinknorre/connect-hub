import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Mar 1", download: 42, upload: 18 },
  { date: "Mar 5", download: 55, upload: 22 },
  { date: "Mar 10", download: 48, upload: 25 },
  { date: "Mar 15", download: 72, upload: 31 },
  { date: "Mar 20", download: 65, upload: 28 },
  { date: "Mar 25", download: 89, upload: 35 },
  { date: "Mar 30", download: 78, upload: 32 },
  { date: "Apr 3", download: 95, upload: 40 },
  { date: "Apr 7", download: 88, upload: 38 },
];

export function UsageChart() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Data Usage</h3>
          <p className="text-xs text-muted-foreground">Last 30 days • All organisations</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Download</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Upload</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(170, 80%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(170, 80%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
          <XAxis dataKey="date" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit=" GB" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 9%)",
              border: "1px solid hsl(222, 30%, 16%)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area type="monotone" dataKey="download" stroke="hsl(210, 100%, 56%)" fillOpacity={1} fill="url(#colorDown)" strokeWidth={2} />
          <Area type="monotone" dataKey="upload" stroke="hsl(170, 80%, 50%)" fillOpacity={1} fill="url(#colorUp)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
