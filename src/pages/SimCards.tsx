import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sims = [
  { iccid: "8944501234567890001", imsi: "204043912345001", status: "Active", profile: "Standard Data", network: "Vodafone DE", usage: "2.4 GB", lastSeen: "2 min ago" },
  { iccid: "8944501234567890002", imsi: "204043912345002", status: "Active", profile: "High Speed", network: "Vodafone UK", usage: "5.1 GB", lastSeen: "5 min ago" },
  { iccid: "8944501234567890003", imsi: "204043912345003", status: "Suspended", profile: "Standard Data", network: "—", usage: "0 B", lastSeen: "3 days ago" },
  { iccid: "8944501234567890004", imsi: "204043912345004", status: "Active", profile: "Low Power IoT", network: "Vodafone IT", usage: "128 MB", lastSeen: "1 hr ago" },
  { iccid: "8944501234567890005", imsi: "204043912345005", status: "Test Ready", profile: "Test Profile", network: "Vodafone NL", usage: "45 MB", lastSeen: "30 min ago" },
  { iccid: "8944501234567890006", imsi: "204043912345006", status: "Active", profile: "High Speed", network: "Vodafone ES", usage: "3.7 GB", lastSeen: "Just now" },
  { iccid: "8944501234567890007", imsi: "204043912345007", status: "Inactive", profile: "—", network: "—", usage: "0 B", lastSeen: "14 days ago" },
  { iccid: "8944501234567890008", imsi: "204043912345008", status: "Active", profile: "Standard Data", network: "Vodafone DE", usage: "890 MB", lastSeen: "12 min ago" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Suspended: "bg-warning/10 text-warning",
  Inactive: "bg-muted text-muted-foreground",
  "Test Ready": "bg-aqua/10 text-aqua",
};

export default function SimCards() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filtered = sims.filter(
    (s) => s.iccid.includes(search) || s.imsi.includes(search) || s.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SIM Cards</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor your SIM inventory</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add SIM
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ICCID, IMSI, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted/50 border-border/50 h-9"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">ICCID</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">IMSI</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Profile</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Network</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Usage</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Last Seen</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((sim) => (
              <TableRow key={sim.iccid} className="border-border/30 hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => navigate(`/sims/${sim.iccid}`)}>
                <TableCell className="font-mono text-sm">{sim.iccid}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{sim.imsi}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[sim.status] || ""}`}>
                    {sim.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{sim.profile}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{sim.network}</TableCell>
                <TableCell className="text-sm font-medium">{sim.usage}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{sim.lastSeen}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-muted/50">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Change Profile</DropdownMenuItem>
                      <DropdownMenuItem>Suspend</DropdownMenuItem>
                      <DropdownMenuItem>Send SMS</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Terminate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {sims.length} SIMs</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-2">1 / 1</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
