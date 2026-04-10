import { useNavigate } from "react-router-dom";
import { Shield, Plus, MoreHorizontal, Wifi, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const profiles = [
  { name: "Standard Data", sims: 5420, services: ["Data"], apn: "m2m.vodafone.com", status: "Active", ratePlan: "IoT Basic" },
  { name: "High Speed", sims: 3210, services: ["Data", "SMS"], apn: "iot.vodafone.com", status: "Active", ratePlan: "IoT Pro" },
  { name: "Low Power IoT", sims: 2890, services: ["Data"], apn: "nb.vodafone.com", status: "Active", ratePlan: "NB-IoT" },
  { name: "Voice Enabled", sims: 980, services: ["Data", "SMS", "Voice"], apn: "m2m.vodafone.com", status: "Active", ratePlan: "IoT Voice" },
  { name: "Test Profile", sims: 347, services: ["Data"], apn: "test.vodafone.com", status: "Active", ratePlan: "Test" },
];

const serviceIcon: Record<string, React.ElementType> = {
  Data: Wifi,
  SMS: MessageSquare,
  Voice: Phone,
};

export default function ServiceProfiles() {
  const navigate = useNavigate();
  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Service Profiles</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure connectivity and service settings</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((p) => (
          <div key={p.name} className="glass-card-hover p-5 space-y-4 cursor-pointer" onClick={() => navigate(`/profiles/${slugify(p.name)}`)}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.ratePlan}</p>
                </div>
              </div>
              <button className="p-1 rounded hover:bg-muted/50">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {p.services.map((s) => {
                const Icon = serviceIcon[s] || Wifi;
                return (
                  <span key={s} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                    <Icon className="w-3 h-3" />
                    {s}
                  </span>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">APN: <span className="font-mono text-foreground">{p.apn}</span></span>
              <span className="text-muted-foreground">{p.sims.toLocaleString()} SIMs</span>
            </div>

            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${(p.sims / 5420) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
