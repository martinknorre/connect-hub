import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Signal, MapPin, Smartphone, Shield, Activity, Clock, Send, Pause, Play, Trash2, RefreshCw, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const simData: Record<string, any> = {
  "8944501234567890001": { iccid: "8944501234567890001", imsi: "204043912345001", msisdn: "+31612345001", imei: "352099001234567", status: "Active", profile: "Standard Data", network: "Vodafone DE", ip: "10.128.45.12", apn: "m2m.vodafone.com", usage: "2.4 GB", lastSeen: "2 min ago", country: "Germany", rat: "4G LTE", activated: "Jan 15, 2024", monthlyQuota: "5 GB" },
  "8944501234567890002": { iccid: "8944501234567890002", imsi: "204043912345002", msisdn: "+44712345002", imei: "352099001234568", status: "Active", profile: "High Speed", network: "Vodafone UK", ip: "10.128.45.88", apn: "iot.vodafone.com", usage: "5.1 GB", lastSeen: "5 min ago", country: "United Kingdom", rat: "4G LTE", activated: "Mar 3, 2024", monthlyQuota: "10 GB" },
  "8944501234567890003": { iccid: "8944501234567890003", imsi: "204043912345003", msisdn: "+31612345003", imei: "352099001234569", status: "Suspended", profile: "Standard Data", network: "—", ip: "—", apn: "m2m.vodafone.com", usage: "0 B", lastSeen: "3 days ago", country: "—", rat: "—", activated: "Feb 20, 2024", monthlyQuota: "5 GB" },
};

const usageHistory = [
  { day: "Apr 1", download: 120, upload: 30 },
  { day: "Apr 2", download: 180, upload: 45 },
  { day: "Apr 3", download: 95, upload: 22 },
  { day: "Apr 4", download: 210, upload: 55 },
  { day: "Apr 5", download: 340, upload: 80 },
  { day: "Apr 6", download: 280, upload: 65 },
  { day: "Apr 7", download: 190, upload: 48 },
  { day: "Apr 8", download: 410, upload: 92 },
  { day: "Apr 9", download: 320, upload: 71 },
  { day: "Apr 10", download: 250, upload: 60 },
];

const events = [
  { time: "Apr 10, 14:32", type: "Data Session", detail: "Session started on Vodafone DE", color: "text-success" },
  { time: "Apr 10, 09:15", type: "Location Update", detail: "Attached to LAC 4521, Cell ID 89012", color: "text-aqua" },
  { time: "Apr 9, 22:45", type: "Data Session", detail: "Session closed — 45 MB transferred", color: "text-muted-foreground" },
  { time: "Apr 9, 18:00", type: "Quota Alert", detail: "80% of monthly data quota used", color: "text-warning" },
  { time: "Apr 8, 11:30", type: "Network Change", detail: "Roaming from Vodafone NL → Vodafone DE", color: "text-turquoise" },
  { time: "Apr 7, 08:00", type: "IMEI Check", detail: "IMEI verified — no change detected", color: "text-muted-foreground" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Suspended: "bg-warning/10 text-warning",
  Inactive: "bg-muted text-muted-foreground",
  "Test Ready": "bg-aqua/10 text-aqua",
};

export default function SimDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sim = simData[id || ""] || simData["8944501234567890001"];

  const usagePercent = sim.monthlyQuota ? (parseFloat(sim.usage) / parseFloat(sim.monthlyQuota)) * 100 : 0;

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/sims")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground font-mono">{sim.iccid}</h1>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[sim.status]}`}>
              {sim.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">MSISDN: {sim.msisdn} • Profile: {sim.profile}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Send className="w-3.5 h-3.5" /> Send SMS
          </Button>
          {sim.status === "Active" ? (
            <Button variant="outline" size="sm" className="gap-1.5 text-warning border-warning/30 hover:bg-warning/10">
              <Pause className="w-3.5 h-3.5" /> Suspend
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-1.5 text-success border-success/30 hover:bg-success/10">
              <Play className="w-3.5 h-3.5" /> Reactivate
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
            <Trash2 className="w-3.5 h-3.5" /> Terminate
          </Button>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Network", value: sim.network, sub: `${sim.rat} • ${sim.country}`, icon: Signal, accent: "text-aqua bg-aqua/10" },
          { label: "IP Address", value: sim.ip, sub: `APN: ${sim.apn}`, icon: MapPin, accent: "text-turquoise bg-turquoise/10" },
          { label: "Device IMEI", value: sim.imei, sub: `Activated: ${sim.activated}`, icon: Smartphone, accent: "text-lemon bg-lemon/10" },
          { label: "Service Profile", value: sim.profile, sub: `Quota: ${sim.monthlyQuota}`, icon: Shield, accent: "text-violet bg-violet/10" },
        ].map((card) => (
          <div key={card.label} className="glass-card p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-md ${card.accent}`}>
                <card.icon className="w-4 h-4" />
              </div>
              <span className="text-xs text-muted-foreground">{card.label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground font-mono truncate">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Usage bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Monthly Data Usage</span>
          <span className="text-sm text-muted-foreground">{sim.usage} / {sim.monthlyQuota}</span>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${usagePercent > 80 ? "bg-warning" : "bg-primary"}`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="usage" className="gap-1.5"><Activity className="w-3.5 h-3.5" /> Usage History</TabsTrigger>
          <TabsTrigger value="events" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> Events</TabsTrigger>
          <TabsTrigger value="diagnostics" className="gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Diagnostics</TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5"><Settings2 className="w-3.5 h-3.5" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="usage">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Daily Data Usage (MB)</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageHistory}>
                  <defs>
                    <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0, 100%, 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(0, 100%, 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ulGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(189, 100%, 40%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(189, 100%, 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 3%, 18%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(210, 3%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(210, 3%, 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(210, 3%, 9%)", border: "1px solid hsl(210, 3%, 18%)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="download" stroke="hsl(0, 100%, 45%)" fill="url(#dlGrad)" strokeWidth={2} name="Download" />
                  <Area type="monotone" dataKey="upload" stroke="hsl(189, 100%, 40%)" fill="url(#ulGrad)" strokeWidth={2} name="Upload" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="glass-card divide-y divide-border/30">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors">
                <span className="text-xs text-muted-foreground whitespace-nowrap w-32 shrink-0 pt-0.5">{e.time}</span>
                <div>
                  <span className={`text-sm font-medium ${e.color}`}>{e.type}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diagnostics">
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Network Diagnostics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Signal Strength", value: "-72 dBm", status: "Good" },
                { label: "Latency", value: "34 ms", status: "Excellent" },
                { label: "Packet Loss", value: "0.02%", status: "Excellent" },
                { label: "Connection Uptime", value: "14d 6h", status: "Stable" },
              ].map((d) => (
                <div key={d.label} className="bg-muted/30 rounded-lg p-3 space-y-1">
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="text-lg font-bold text-foreground">{d.value}</p>
                  <p className="text-xs text-success">{d.status}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Run Diagnostics
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">SIM Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "IMEI Lock", value: "Enabled", desc: "Lock SIM to current device IMEI" },
                { label: "Data Roaming", value: "Allowed", desc: "Allow data usage on roaming networks" },
                { label: "SMS MO", value: "Enabled", desc: "Mobile-originated SMS capability" },
                { label: "SMS MT", value: "Enabled", desc: "Mobile-terminated SMS capability" },
                { label: "Voice", value: "Disabled", desc: "Voice call capability" },
                { label: "Static IP", value: "10.128.45.12", desc: "Assigned static IP address" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <span className="text-xs font-medium text-aqua bg-aqua/10 px-2 py-1 rounded-full">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}