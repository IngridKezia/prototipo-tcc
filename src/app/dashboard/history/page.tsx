import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import Image from "next/image";

const movementHistory = [
  {
    id: "M001",
    product: "Industrial Gearbox T-800",
    image: "https://placehold.co/64x64.png",
    imageHint: "industrial gearbox",
    sku: "IG-T800-001",
    user: "Alice",
    action: "Entry",
    location: "Receiving Bay",
    date: "2024-07-22 09:15 AM",
  },
  {
    id: "M002",
    product: "Industrial Gearbox T-800",
    image: "https://placehold.co/64x64.png",
    imageHint: "industrial gearbox",
    sku: "IG-T800-001",
    user: "Alice",
    action: "Move",
    location: "Aisle B | Shelf 4",
    date: "2024-07-22 09:30 AM",
  },
  {
    id: "M003",
    product: "Hydraulic Pump",
    image: "https://placehold.co/64x64.png",
    imageHint: "hydraulic pump",
    sku: "HP-250-004",
    user: "Bob",
    action: "Entry",
    location: "Receiving Bay",
    date: "2024-07-22 10:05 AM",
  },
  {
    id: "M004",
    product: "Hydraulic Pump",
    image: "https://placehold.co/64x64.png",
    imageHint: "hydraulic pump",
    sku: "HP-250-004",
    user: "Bob",
    action: "Move",
    location: "Aisle A | Shelf 8",
    date: "2024-07-22 10:20 AM",
  },
  {
    id: "M005",
    product: "Conveyor Belt Roll",
    image: "https://placehold.co/64x64.png",
    imageHint: "conveyor belt",
    sku: "CBR-050-011",
    user: "Charlie",
    action: "Separation",
    location: "Picking Area 2",
    date: "2024-07-22 11:00 AM",
  },
  {
    id: "M006",
    product: "Conveyor Belt Roll",
    image: "https://placehold.co/64x64.png",
    imageHint: "conveyor belt",
    sku: "CBR-050-011",
    user: "Charlie",
    action: "Exit",
    location: "Dispatch Bay 1",
    date: "2024-07-22 11:45 AM",
  },
];

const getBadgeVariant = (action: string) => {
    switch (action) {
        case "Entry": return "default";
        case "Move": return "secondary";
        case "Separation": return "outline";
        case "Exit": return "destructive";
        default: return "default";
    }
}


export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <CardTitle>Movement History</CardTitle>
                <CardDescription>
                Track all inventory movements within the warehouse.
                </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search history..." className="pl-8 w-full sm:w-auto"/>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">User</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movementHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image 
                        src={item.image} 
                        alt={item.product} 
                        width={40} 
                        height={40} 
                        className="rounded-md hidden sm:block bg-muted"
                        data-ai-hint={item.imageHint}
                      />
                      <div>
                        <div>{item.product}</div>
                        <div className="text-xs text-muted-foreground">{item.sku}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(item.action)}>{item.action}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.user}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right hidden sm:table-cell">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
