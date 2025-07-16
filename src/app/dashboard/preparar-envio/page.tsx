import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Truck, Search, PlusCircle } from "lucide-react";
import Image from "next/image";

const itemsToShip = [
  {
    id: "P-12345",
    sku: "CBR-050-011",
    product: "Conveyor Belt Roll",
    location: "Área de Separação 2",
    image: "https://placehold.co/64x64.png",
    imageHint: "conveyor belt"
  },
  {
    id: "P-54321",
    sku: "IG-T800-001",
    product: "Industrial Gearbox T-800",
    location: "Área de Separação 1",
    image: "https://placehold.co/64x64.png",
    imageHint: "industrial gearbox"
  },
  {
    id: "P-98765",
    sku: "HP-250-004",
    product: "Hydraulic Pump",
    location: "Área de Separação 2",
    image: "https://placehold.co/64x64.png",
    imageHint: "hydraulic pump"
  },
];

export default function PrepararEnvioPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <CardTitle>Preparar Envio</CardTitle>
                <CardDescription>
                Agrupe itens para criar uma nova carga de expedição.
                </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar produto..." className="pl-8 w-full sm:w-auto"/>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Item
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center"><Checkbox /></TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Localização</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemsToShip.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center"><Checkbox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Image 
                            src={item.image} 
                            alt={item.product} 
                            width={40} 
                            height={40} 
                            className="rounded-md hidden sm:block bg-muted"
                            data-ai-hint={item.imageHint}
                        />
                        <span className="font-medium">{item.product}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button size="lg" className="w-full sm:w-auto">
            <Truck className="mr-2 h-5 w-5" />
            Criar Carga e Expedir Itens
        </Button>
      </CardFooter>
    </Card>
  );
}
