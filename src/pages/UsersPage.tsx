import { Users, Plus, MoreHorizontal, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const users = [
  { name: "Alex Donovan", email: "admin@corp.com", role: "Administrator", lastLogin: "2 hrs ago", status: "Active" },
  { name: "Sarah Chen", email: "ops@corp.com", role: "Operations", lastLogin: "30 min ago", status: "Active" },
  { name: "Marcus Weber", email: "marcus@corp.com", role: "Read Only", lastLogin: "1 day ago", status: "Active" },
  { name: "Emily Ross", email: "emily@corp.com", role: "Operations Limited", lastLogin: "3 days ago", status: "Inactive" },
  { name: "James Park", email: "james@corp.com", role: "Management", lastLogin: "5 hrs ago", status: "Active" },
];

const roleColors: Record<string, string> = {
  Administrator: "bg-primary/10 text-primary",
  Operations: "bg-success/10 text-success",
  "Read Only": "bg-muted text-muted-foreground",
  "Operations Limited": "bg-warning/10 text-warning",
  Management: "bg-accent/10 text-accent",
};

export default function UsersPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage platform users and permissions</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Invite User
        </Button>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">User</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Role</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Last Login</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.email} className="border-border/30 hover:bg-muted/20 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[u.role]}`}>
                    {u.role}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className={`status-dot ${u.status === "Active" ? "status-connected" : "status-disconnected"}`} />
                    <span className="text-xs">{u.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <button className="p-1 rounded hover:bg-muted/50">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
