import { useNavigate } from "react-router-dom";
import { Settings2, Globe, Lock, Bell, Key, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { title: "APN Configuration", description: "Manage Access Point Names for data connectivity", icon: Globe, items: 8 },
  { title: "Security Settings", description: "IMEI lock, IP whitelisting, and access controls", icon: Lock, items: 5 },
  { title: "Notification Rules", description: "Configure alerts for usage thresholds and events", icon: Bell, items: 12 },
  { title: "API Access", description: "Manage API keys and webhook endpoints", icon: Key, items: 3 },
  { title: "Data Retention", description: "Configure CDR and log retention policies", icon: Database, items: 4 },
  { title: "General Settings", description: "Organisation defaults and preferences", icon: Settings2, items: 6 },
];

export default function Configuration() {
  const navigate = useNavigate();
  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuration</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform settings and connectivity configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <div key={s.title} className="glass-card-hover p-5 space-y-3 group cursor-pointer" onClick={() => navigate(`/configuration/${slugify(s.title)}`)}>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.items} settings</span>
              <Button variant="ghost" size="sm" className="text-xs text-primary h-7">
                Configure →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
