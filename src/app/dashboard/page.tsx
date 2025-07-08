import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarehouseMap } from "@/components/warehouse-map";
import { Package, Truck, AlertTriangle, PackageSearch } from "lucide-react";

const stats = [
  { title: "Total Items", value: "12,405", icon: Package, color: "text-blue-500" },
  { title: "Items in Transit", value: "312", icon: Truck, color: "text-amber-500" },
  { title: "Items to Restock", value: "48", icon: AlertTriangle, color: "text-red-500" },
  { title: "Locations Used", value: "1,200", icon: PackageSearch, color: "text-green-500" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <WarehouseMap />
    </div>
  );
}
