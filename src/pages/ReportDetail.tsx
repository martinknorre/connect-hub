import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Play, Calendar, Clock, FileBarChart, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const reportsData: Record<string, any> = {
  "monthly-data-usage": {
    name: "Monthly Data Usage", type: "Usage", schedule: "Monthly", lastRun: "Apr 1, 2025", nextRun: "May 1, 2025",
    format: "CSV", size: "2.4 MB", createdBy: "admin@company.com", description: "Aggregated monthly data consumption across all active SIMs, broken down by profile and network.",
    filters: { profile: "All", network: "All", status: "Active", dateRange: "Last 30 days" },
    history: [
      { date: "Apr 1, 2025", size: "2.4 MB", rows: "12,450", duration: "14s" },
      { date: "Mar 1, 2025", size: "2.2 MB", rows: "11,890", duration: "13s" },
      { date: "Feb 1, 2025", size: "2.1 MB", rows: "11,200", duration: "12s" },
      { date: "Jan 1, 2025", size: "1.9 MB", rows: "10,430", duration: "11s" },
    ],
    preview: [
      { month: "Jan", usage: 1240 }, { month: "Feb", usage: 1580 }, { month: "Mar", usage: 1820 },
      { month: "Apr", usage: 2100 }, { month: "May", usage: 1950 }, { month: "Jun", usage: 2340 },
    ],
  },
};

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = reportsData[id || ""] || reportsData["monthly-data-usage"];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/reports")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{report.name}</h1>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{report.type}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{report.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-3.5 h-3.5" /> Download Latest</Button>
          <Button size="sm" className="gap-1.5"><Play className="w-3.5 h-3.5" /> Run Now</Button>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Schedule", value: report.schedule, icon: Clock, accent: "text-aqua bg-aqua/10" },
          { label: "Last Run", value: report.lastRun, icon: Calendar, accent: "text-turquoise bg-turquoise/10" },
          { label: "Format / Size", value: `${report.format} • ${report.size}`, icon: FileBarChart, accent: "text-lemon bg-lemon/10" },
          { label: "Next Run", value: report.nextRun, icon: Settings2, accent: "text-violet bg-violet/10" },
        ].map((c) => (
          <div key={c.label} className="glass-card p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${c.accent}`}><c.icon className="w-4 h-4" /></div>
              <span className="text-xs text-muted-foreground">{c.label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Report Filters</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(report.filters).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
              <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
              <span className="text-sm font-medium text-foreground">{val as string}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preview chart */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Data Preview</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={report.preview}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 3%, 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(210, 3%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(210, 3%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(210, 3%, 9%)", border: "1px solid hsl(210, 3%, 18%)", borderRadius: 8 }} />
              <Bar dataKey="usage" fill="hsl(0, 100%, 45%)" radius={[4, 4, 0, 0]} name="Usage (GB)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Run history */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Run History</h3>
        <div className="space-y-2">
          {report.history.map((h: any) => (
            <div key={h.date} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground">{h.date}</span>
                <span className="text-xs text-muted-foreground">{h.rows} rows • {h.size}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{h.duration}</span>
                <Button variant="ghost" size="sm" className="gap-1 text-xs h-7"><Download className="w-3 h-3" /> Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}