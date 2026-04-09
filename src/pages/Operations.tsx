import { Zap, Search, Filter, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const ops = [
  { id: "OP-4821", type: "Activate SIM", target: "8944...3201", user: "admin@corp.com", status: "Completed", date: "2025-04-09 14:23" },
  { id: "OP-4820", type: "Change Profile", target: "8944...1455", user: "ops@corp.com", status: "Pending", date: "2025-04-09 14:08" },
  { id: "OP-4819", type: "Suspend SIM", target: "8944...7823", user: "admin@corp.com", status: "Completed", date: "2025-04-09 13:15" },
  { id: "OP-4818", type: "Resume SIM", target: "8944...5567", user: "ops@corp.com", status: "Completed", date: "2025-04-09 11:42" },
  { id: "OP-4817", type: "Bulk Activate", target: "250 SIMs", user: "admin@corp.com", status: "Failed", date: "2025-04-09 10:30" },
  { id: "OP-4816", type: "Send SMS", target: "8944...9012", user: "ops@corp.com", status: "Completed", date: "2025-04-09 09:55" },
  { id: "OP-4815", type: "Change IMEI Lock", target: "8944...3344", user: "admin@corp.com", status: "Processing", date: "2025-04-08 18:20" },
];

const statusConfig: Record<string, { icon: React.ElementType; className: string }> = {
  Completed: { icon: CheckCircle2, className: "text-success" },
  Pending: { icon: Clock, className: "text-warning" },
  Failed: { icon: XCircle, className: "text-destructive" },
  Processing: { icon: AlertCircle, className: "text-primary" },
};

export default function Operations() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Operations</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and manage SIM operations</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: "1,247", color: "text-foreground" },
          { label: "Completed", value: "1,198", color: "text-success" },
          { label: "Pending", value: "38", color: "text-warning" },
          { label: "Failed", value: "11", color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search operations..." className="pl-9 bg-muted/50 border-border/50 h-9" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </Button>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Type</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Target</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">User</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ops.map((op) => {
              const sc = statusConfig[op.status];
              return (
                <TableRow key={op.id} className="border-border/30 hover:bg-muted/20 cursor-pointer transition-colors">
                  <TableCell className="font-mono text-sm text-primary">{op.id}</TableCell>
                  <TableCell className="text-sm font-medium">{op.type}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{op.target}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{op.user}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1.5 ${sc.className}`}>
                      <sc.icon className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{op.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{op.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
