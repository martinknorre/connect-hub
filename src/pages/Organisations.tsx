import { Globe, Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const orgs = [
  { name: "Global Operations", type: "Customer", sims: 8420, country: "Germany", children: 3 },
  { name: "EMEA Division", type: "Sub-Customer", sims: 3120, country: "UK", children: 0 },
  { name: "APAC Division", type: "Sub-Customer", sims: 1890, country: "Singapore", children: 0 },
  { name: "Americas Division", type: "Sub-Customer", sims: 2417, country: "USA", children: 0 },
];

export default function Organisations() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Organisations</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage organisational hierarchy</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Organisation
        </Button>
      </div>

      <div className="space-y-3">
        {orgs.map((o) => (
          <div key={o.name} className="glass-card-hover p-5 flex items-center gap-4 cursor-pointer">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{o.name}</h3>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{o.type}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {o.country} • {o.sims.toLocaleString()} SIMs
                {o.children > 0 && ` • ${o.children} sub-orgs`}
              </p>
            </div>
            <Globe className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}
