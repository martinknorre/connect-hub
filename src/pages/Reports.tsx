import { useNavigate } from "react-router-dom";
import { FileBarChart, Download, Calendar, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { name: "Monthly Data Usage", type: "Usage", schedule: "Monthly", lastRun: "Apr 1, 2025", format: "CSV", size: "2.4 MB" },
  { name: "SIM Status Summary", type: "Inventory", schedule: "Weekly", lastRun: "Apr 7, 2025", format: "XLSX", size: "1.1 MB" },
  { name: "Network Distribution", type: "Network", schedule: "On demand", lastRun: "Mar 28, 2025", format: "PDF", size: "850 KB" },
  { name: "Operations Audit Log", type: "Audit", schedule: "Daily", lastRun: "Apr 9, 2025", format: "CSV", size: "3.2 MB" },
  { name: "Voice & SMS Usage", type: "Usage", schedule: "Monthly", lastRun: "Apr 1, 2025", format: "CSV", size: "980 KB" },
  { name: "Roaming Analysis", type: "Network", schedule: "On demand", lastRun: "Mar 15, 2025", format: "PDF", size: "1.5 MB" },
];

const typeColors: Record<string, string> = {
  Usage: "bg-primary/10 text-primary",
  Inventory: "bg-success/10 text-success",
  Network: "bg-accent/10 text-accent",
  Audit: "bg-warning/10 text-warning",
};

export default function Reports() {
  const navigate = useNavigate();
  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and download connectivity reports</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.name} className="glass-card-hover p-5 space-y-4 cursor-pointer" onClick={() => navigate(`/reports/${slugify(r.name)}`)}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <FileBarChart className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{r.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[r.type]}`}>{r.type}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Schedule: {r.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>Last run: {r.lastRun}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{r.format} • {r.size}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                <Download className="w-3 h-3" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Run Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
