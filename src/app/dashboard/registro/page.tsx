import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

const registrationLog = [
  {
    id: "REG001",
    productName: "Industrial Gearbox T-800",
    productId: "P-54321",
    sku: "IG-T800-001",
    user: "Alice",
    date: "2024-07-23 10:30 AM",
    fromLocation: "Doca de Recebimento",
    toLocation: "Corredor B | Prateleira 4",
    image: "https://placehold.co/600x400.png",
    imageHint: "industrial gearbox",
  },
  {
    id: "REG002",
    productName: "Hydraulic Pump",
    productId: "P-98765",
    sku: "HP-250-004",
    user: "Bob",
    date: "2024-07-23 11:15 AM",
    fromLocation: "Doca de Recebimento",
    toLocation: "Corredor A | Prateleira 8",
    image: "https://placehold.co/600x400.png",
    imageHint: "hydraulic pump",
  },
  {
    id: "REG003",
    productName: "Conveyor Belt Roll",
    productId: "P-12345",
    sku: "CBR-050-011",
    user: "Charlie",
    date: "2024-07-23 12:00 PM",
    fromLocation: "Corredor C | Prateleira 1",
    toLocation: "Área de Separação 2",
    image: "https://placehold.co/600x400.png",
    imageHint: "conveyor belt",
  },
  {
    id: "REG004",
    productName: "Conveyor Belt Roll",
    productId: "P-12345",
    sku: "CBR-050-011",
    user: "Charlie",
    date: "2024-07-23 01:45 PM",
    fromLocation: "Área de Separação 2",
    toLocation: "Doca de Despacho 1",
    image: "https://placehold.co/600x400.png",
    imageHint: "conveyor belt",
  },
];

export default function RegistroPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registros de Movimentação</h1>
          <p className="text-muted-foreground">
            Visualize os detalhes de cada movimentação de produto com registro fotográfico.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {registrationLog.map((log) => (
          <Card key={log.id} className="flex flex-col">
            <CardHeader className="p-0">
                <Image
                  src={log.image}
                  alt={log.productName}
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover aspect-video bg-muted"
                  data-ai-hint={log.imageHint}
                />
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{log.productName}</CardTitle>
                    <CardDescription>ID: {log.productId} | SKU: {log.sku}</CardDescription>
                  </div>
                  <Badge variant="outline">{log.id}</Badge>
              </div>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <div className="font-semibold text-muted-foreground">Movimentação:</div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{log.fromLocation}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{log.toLocation}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
               <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>{log.user}</span>
               </div>
               <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{log.date}</span>
               </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
