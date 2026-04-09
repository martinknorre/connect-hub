import { Smartphone, Wifi, Activity, Globe, Plus, Upload, FileBarChart, Settings2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { QuickAction } from "@/components/QuickAction";
import { UsageChart } from "@/components/UsageChart";
import { NetworksWidget } from "@/components/NetworksWidget";
import { RecentOperations } from "@/components/RecentOperations";

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your IoT connectivity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Smartphone} label="Total SIMs" value="12,847" change="+124 this month" changeType="positive" />
        <StatCard icon={Wifi} label="Connected" value="11,293" change="87.9% connectivity" changeType="positive" />
        <StatCard icon={Activity} label="Data Usage" value="1.2 TB" change="+8.3% vs last month" changeType="positive" />
        <StatCard icon={Globe} label="Active Networks" value="23" change="Across 14 countries" changeType="neutral" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction icon={Plus} label="Activate SIM" description="Provision a new SIM card" />
          <QuickAction icon={Upload} label="Bulk Upload" description="Upload SIMs via CSV" />
          <QuickAction icon={FileBarChart} label="Generate Report" description="Create usage report" />
          <QuickAction icon={Settings2} label="Profile Config" description="Manage service profiles" />
        </div>
      </div>

      {/* Charts & Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
        <NetworksWidget />
      </div>

      <RecentOperations />
    </div>
  );
}
