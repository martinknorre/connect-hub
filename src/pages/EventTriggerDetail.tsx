import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Save, Play, Clock, Zap, Mail, Globe, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const triggersData: Record<string, any> = {
  "1": {
    name: "High Data Usage Alert", enabled: true,
    condition: { type: "Usage Threshold", operator: ">", value: "1 GB", period: "per day", metric: "Data Usage" },
    actions: [
      { type: "Email", target: "admin@company.com", delay: "Immediate" },
      { type: "Webhook", target: "https://api.company.com/alerts", delay: "Immediate" },
    ],
    scope: { profiles: ["Standard Data", "High Speed"], networks: "All", simStatus: "Active" },
    history: [
      { time: "Apr 10, 09:14", sim: "894450...001", result: "Email sent + Webhook 200 OK" },
      { time: "Apr 9, 16:32", sim: "894450...006", result: "Email sent + Webhook 200 OK" },
      { time: "Apr 8, 11:45", sim: "894450...002", result: "Email sent + Webhook timeout (retried)" },
      { time: "Apr 7, 22:10", sim: "894450...008", result: "Email sent + Webhook 200 OK" },
    ],
  },
  "2": {
    name: "SIM Disconnected", enabled: true,
    condition: { type: "Connectivity", operator: "No connection", value: "24 hours", period: "consecutive", metric: "Last Seen" },
    actions: [
      { type: "Email", target: "ops-team@company.com", delay: "Immediate" },
    ],
    scope: { profiles: "All", networks: "All", simStatus: "Active" },
    history: [
      { time: "Apr 9, 08:00", sim: "894450...003", result: "Email sent" },
      { time: "Apr 5, 08:00", sim: "894450...007", result: "Email sent" },
    ],
  },
};

const actionIcons: Record<string, React.ElementType> = { Email: Mail, Webhook: Globe, SMS: Bell };

export default function EventTriggerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trigger = triggersData[id || ""] || triggersData["1"];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/triggers")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{trigger.name}</h1>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${trigger.enabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              {trigger.enabled ? "Active" : "Disabled"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Play className="w-3.5 h-3.5" /> Test</Button>
          <Button size="sm" className="gap-1.5"><Save className="w-3.5 h-3.5" /> Save</Button>
        </div>
      </div>

      {/* Condition card */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" /> Trigger Condition
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.entries(trigger.condition).map(([key, val]) => (
            <div key={key} className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <p className="text-sm font-medium text-foreground mt-0.5">{val as string}</p>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="actions" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="actions" className="gap-1.5"><Zap className="w-3.5 h-3.5" /> Actions</TabsTrigger>
          <TabsTrigger value="scope" className="gap-1.5"><Bell className="w-3.5 h-3.5" /> Scope</TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> History</TabsTrigger>
        </TabsList>

        <TabsContent value="actions">
          <div className="space-y-3">
            {trigger.actions.map((a: any, i: number) => {
              const Icon = actionIcons[a.type] || Zap;
              return (
                <div key={i} className="glass-card p-4 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-aqua/10">
                    <Icon className="w-5 h-5 text-aqua" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{a.type}</p>
                    <p className="text-xs text-muted-foreground font-mono">{a.target}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.delay}</span>
                </div>
              );
            })}
            <Button variant="outline" size="sm" className="gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5" /> Add Action
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="scope">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Trigger Scope</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(trigger.scope).map(([key, val]) => (
                <div key={key} className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {Array.isArray(val) ? (val as string[]).join(", ") : val as string}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="glass-card divide-y divide-border/30">
            {trigger.history.map((h: any, i: number) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors">
                <span className="text-xs text-muted-foreground whitespace-nowrap w-36 shrink-0 pt-0.5">{h.time}</span>
                <div>
                  <span className="text-sm font-mono text-foreground">{h.sim}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{h.result}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}