import { useNavigate } from "react-router-dom";
import { Bell, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialTriggers = [
  { id: 1, name: "High Data Usage Alert", condition: "Usage > 1 GB / day", action: "Email + Webhook", enabled: true },
  { id: 2, name: "SIM Disconnected", condition: "No connection > 24 hrs", action: "Email notification", enabled: true },
  { id: 3, name: "Roaming Detected", condition: "SIM connects to non-home network", action: "Webhook", enabled: false },
  { id: 4, name: "IMEI Change", condition: "IMEI mismatch detected", action: "Email + Suspend SIM", enabled: true },
  { id: 5, name: "Monthly Usage Threshold", condition: "Usage > 80% of quota", action: "Email notification", enabled: true },
];

export default function EventTriggers() {
  const navigate = useNavigate();
  const [triggers, setTriggers] = useState(initialTriggers);

  const toggle = (id: number) => {
    setTriggers((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Triggers</h1>
          <p className="text-sm text-muted-foreground mt-1">Automate actions based on SIM events</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Trigger
        </Button>
      </div>

      <div className="space-y-3">
        {triggers.map((t) => (
          <div key={t.id} className={`glass-card p-5 flex items-center gap-4 transition-opacity cursor-pointer ${!t.enabled ? "opacity-50" : ""}`} onClick={() => navigate(`/triggers/${t.id}`)}>
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                <span className="font-mono">{t.condition}</span> → {t.action}
              </p>
            </div>
            <button onClick={() => toggle(t.id)} className="shrink-0">
              {t.enabled ? (
                <ToggleRight className="w-8 h-8 text-primary" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-muted-foreground" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
