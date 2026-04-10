import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Edit, Trash2, ToggleRight, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const configData: Record<string, any> = {
  "apn-configuration": {
    title: "APN Configuration",
    description: "Manage Access Point Names for data connectivity across all service profiles.",
    items: [
      { id: 1, name: "m2m.vodafone.com", type: "IPv4", auth: "None", profiles: 3, enabled: true },
      { id: 2, name: "iot.vodafone.com", type: "IPv4/IPv6", auth: "CHAP", profiles: 1, enabled: true },
      { id: 3, name: "nb.vodafone.com", type: "IPv4", auth: "None", profiles: 1, enabled: true },
      { id: 4, name: "test.vodafone.com", type: "IPv4", auth: "PAP", profiles: 1, enabled: true },
      { id: 5, name: "legacy.vodafone.com", type: "IPv4", auth: "None", profiles: 0, enabled: false },
    ],
  },
  "security-settings": {
    title: "Security Settings",
    description: "IMEI lock, IP whitelisting, and access control settings.",
    items: [
      { id: 1, name: "IMEI Lock", type: "Global", auth: "Per-SIM override", profiles: 2, enabled: true },
      { id: 2, name: "IP Whitelist", type: "Firewall", auth: "CIDR ranges", profiles: 5, enabled: true },
      { id: 3, name: "Two-Factor Auth", type: "Portal", auth: "TOTP", profiles: 0, enabled: true },
      { id: 4, name: "Session Timeout", type: "Portal", auth: "30 min", profiles: 0, enabled: true },
      { id: 5, name: "API Rate Limiting", type: "API", auth: "100 req/min", profiles: 0, enabled: false },
    ],
  },
  "notification-rules": {
    title: "Notification Rules",
    description: "Configure alerts for usage thresholds and events.",
    items: [
      { id: 1, name: "Data 80% threshold", type: "Usage", auth: "Email", profiles: 8, enabled: true },
      { id: 2, name: "Data 100% threshold", type: "Usage", auth: "Email + SMS", profiles: 8, enabled: true },
      { id: 3, name: "SIM Disconnected", type: "Connectivity", auth: "Email", profiles: 5, enabled: true },
      { id: 4, name: "IMEI Change Detected", type: "Security", auth: "Email + Webhook", profiles: 2, enabled: true },
      { id: 5, name: "Roaming Started", type: "Network", auth: "Webhook", profiles: 3, enabled: false },
    ],
  },
  "api-access": {
    title: "API Access",
    description: "Manage API keys and webhook endpoints.",
    items: [
      { id: 1, name: "Production API Key", type: "REST", auth: "Bearer Token", profiles: 0, enabled: true },
      { id: 2, name: "Staging API Key", type: "REST", auth: "Bearer Token", profiles: 0, enabled: true },
      { id: 3, name: "Webhook Endpoint", type: "Webhook", auth: "HMAC SHA256", profiles: 0, enabled: true },
    ],
  },
  "data-retention": {
    title: "Data Retention",
    description: "Configure CDR and log retention policies.",
    items: [
      { id: 1, name: "CDR Records", type: "90 days", auth: "Auto-archive", profiles: 0, enabled: true },
      { id: 2, name: "Audit Logs", type: "365 days", auth: "Compressed", profiles: 0, enabled: true },
      { id: 3, name: "Session Logs", type: "30 days", auth: "Auto-delete", profiles: 0, enabled: true },
      { id: 4, name: "API Logs", type: "14 days", auth: "Auto-delete", profiles: 0, enabled: true },
    ],
  },
  "general-settings": {
    title: "General Settings",
    description: "Organisation defaults and preferences.",
    items: [
      { id: 1, name: "Default Profile", type: "Standard Data", auth: "—", profiles: 0, enabled: true },
      { id: 2, name: "Auto-Activate SIMs", type: "On assignment", auth: "—", profiles: 0, enabled: true },
      { id: 3, name: "Usage Alerts", type: "Enabled", auth: "Email", profiles: 0, enabled: true },
      { id: 4, name: "Timezone", type: "UTC+1 (CET)", auth: "—", profiles: 0, enabled: true },
      { id: 5, name: "Currency", type: "EUR", auth: "—", profiles: 0, enabled: true },
      { id: 6, name: "Language", type: "English", auth: "—", profiles: 0, enabled: true },
    ],
  },
};

export default function ConfigurationDetail() {
  const { section } = useParams();
  const navigate = useNavigate();
  const config = configData[section || ""] || configData["apn-configuration"];
  const [items, setItems] = useState(config.items);

  const toggle = (id: number) => {
    setItems((prev: any[]) => prev.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/configuration")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{config.title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{config.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" /> Add</Button>
          <Button size="sm" className="gap-1.5"><Save className="w-3.5 h-3.5" /> Save Changes</Button>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item: any) => (
          <div key={item.id} className={`glass-card p-4 flex items-center gap-4 transition-opacity ${!item.enabled ? "opacity-50" : ""}`}>
            <div className="flex-1 grid grid-cols-4 gap-4 items-center">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Type</span>
                <p className="text-sm text-foreground">{item.type}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Config</span>
                <p className="text-sm text-foreground">{item.auth}</p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5 text-muted-foreground" /></Button>
                <button onClick={() => toggle(item.id)} className="shrink-0">
                  {item.enabled ? <ToggleRight className="w-7 h-7 text-primary" /> : <ToggleLeft className="w-7 h-7 text-muted-foreground" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}