import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Wifi, MessageSquare, Phone, Globe, Settings2, Plus, Edit, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profilesData: Record<string, any> = {
  "standard-data": {
    name: "Standard Data", sims: 5420, apn: "m2m.vodafone.com", ratePlan: "IoT Basic", status: "Active",
    services: { data: true, sms: false, voice: false },
    settings: {
      maxBandwidth: "10 Mbps", dataQuota: "5 GB/month", roaming: "Allowed", staticIp: "Optional",
      imeiLock: "Disabled", ipVersion: "IPv4", mtu: "1500", headerCompression: "Enabled",
    },
    apnConfig: { name: "m2m.vodafone.com", type: "IPv4", auth: "None", proxy: "—", port: "—", dns1: "8.8.8.8", dns2: "8.8.4.4" },
    networks: [
      { name: "Vodafone DE", mcc: "262", mnc: "02", priority: 1 },
      { name: "Vodafone UK", mcc: "234", mnc: "15", priority: 2 },
      { name: "Vodafone NL", mcc: "204", mnc: "04", priority: 3 },
      { name: "Vodafone IT", mcc: "222", mnc: "10", priority: 4 },
    ],
  },
  "high-speed": {
    name: "High Speed", sims: 3210, apn: "iot.vodafone.com", ratePlan: "IoT Pro", status: "Active",
    services: { data: true, sms: true, voice: false },
    settings: {
      maxBandwidth: "50 Mbps", dataQuota: "10 GB/month", roaming: "Allowed", staticIp: "Required",
      imeiLock: "Enabled", ipVersion: "IPv4/IPv6", mtu: "1500", headerCompression: "Disabled",
    },
    apnConfig: { name: "iot.vodafone.com", type: "IPv4/IPv6", auth: "CHAP", proxy: "—", port: "—", dns1: "8.8.8.8", dns2: "8.8.4.4" },
    networks: [
      { name: "Vodafone UK", mcc: "234", mnc: "15", priority: 1 },
      { name: "Vodafone DE", mcc: "262", mnc: "02", priority: 2 },
      { name: "Vodafone ES", mcc: "214", mnc: "01", priority: 3 },
    ],
  },
};

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default function ServiceProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = profilesData[id || ""] || profilesData["standard-data"];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/profiles")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-success/10 text-success">{profile.status}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{profile.ratePlan} • {profile.sims.toLocaleString()} SIMs assigned</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Copy className="w-3.5 h-3.5" /> Clone</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Edit className="w-3.5 h-3.5" /> Edit</Button>
        </div>
      </div>

      {/* Service badges */}
      <div className="flex gap-3">
        {[
          { key: "data", label: "Data", icon: Wifi, enabled: profile.services.data },
          { key: "sms", label: "SMS", icon: MessageSquare, enabled: profile.services.sms },
          { key: "voice", label: "Voice", icon: Phone, enabled: profile.services.voice },
        ].map((s) => (
          <div key={s.key} className={`glass-card px-4 py-3 flex items-center gap-2 ${s.enabled ? "" : "opacity-40"}`}>
            <s.icon className={`w-4 h-4 ${s.enabled ? "text-aqua" : "text-muted-foreground"}`} />
            <span className="text-sm font-medium text-foreground">{s.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${s.enabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              {s.enabled ? "On" : "Off"}
            </span>
          </div>
        ))}
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="settings" className="gap-1.5"><Settings2 className="w-3.5 h-3.5" /> Settings</TabsTrigger>
          <TabsTrigger value="apn" className="gap-1.5"><Globe className="w-3.5 h-3.5" /> APN Config</TabsTrigger>
          <TabsTrigger value="networks" className="gap-1.5"><Shield className="w-3.5 h-3.5" /> Allowed Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(profile.settings).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-sm font-medium text-foreground">{val as string}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="apn">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">APN Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(profile.apnConfig).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground capitalize">{key}</span>
                  <span className="text-sm font-medium text-foreground font-mono">{val as string}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="networks">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Allowed Networks</h3>
              <Button variant="outline" size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Network</Button>
            </div>
            <div className="space-y-2">
              {profile.networks.map((n: any) => (
                <div key={n.name} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-6">#{n.priority}</span>
                    <span className="text-sm font-medium text-foreground">{n.name}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">MCC: {n.mcc} / MNC: {n.mnc}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}