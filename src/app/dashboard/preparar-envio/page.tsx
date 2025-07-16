
"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Truck, Search, PlusCircle, Package, Calendar, User } from "lucide-react";
import Image from "next/image";
import { ScanDialog } from "@/components/scan-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import QRCode from "qrcode.react";

const itemsToShip = [
  {
    id: "P-12345",
    sku: "CBR-050-011",
    product: "Conveyor Belt Roll",
    location: "Área de Separação 2",
    image: "https://placehold.co/64x64.png",
    imageHint: "conveyor belt",
  },
  {
    id: "P-54321",
    sku: "IG-T800-001",
    product: "Industrial Gearbox T-800",
    location: "Área de Separação 1",
    image: "https://placehold.co/64x64.png",
    imageHint: "industrial gearbox",
  },
  {
    id: "P-98765",
    sku: "HP-250-004",
    product: "Hydraulic Pump",
    location: "Área de Separação 2",
    image: "https://placehold.co/64x64.png",
    imageHint: "hydraulic pump",
  },
];

type Item = (typeof itemsToShip)[0];

export default function PrepararEnvioPage() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [destination, setDestination] = useState("");
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(itemsToShip.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    if (checked) {
      newSelectedItems.add(itemId);
    } else {
      newSelectedItems.delete(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const isAllSelected = selectedItems.size > 0 && selectedItems.size === itemsToShip.length;
  const isSomeSelected = selectedItems.size > 0 && !isAllSelected;

  const handleCreateShipment = () => {
    if (selectedItems.size === 0 || !destination) {
        alert("Por favor, selecione ao menos um item e informe o destino.");
        return;
    }
    
    const dispatchedItems = itemsToShip.filter(item => selectedItems.has(item.id));
    
    const shipmentData = {
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
      destination,
      dispatcher: {
        name: "Supervisor",
        registration: "SW-12345"
      },
      items: dispatchedItems.map(item => ({ id: item.id, sku: item.sku, product: item.product })),
    };

    setQrCodeValue(JSON.stringify(shipmentData, null, 2));
    setIsQrCodeOpen(true);
  };


  return (
    <>
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
                <Input placeholder="Buscar produto..." className="pl-8 w-full sm:w-auto" />
              </div>
              <ScanDialog
                trigger={
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Item
                  </Button>
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination">Destino da Carga</Label>
              <Input 
                id="destination" 
                placeholder="Ex: Cliente A - Filial São Paulo" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">
                      <Checkbox 
                        onCheckedChange={handleSelectAll}
                        checked={isAllSelected}
                        aria-label="Selecionar todos"
                      />
                    </TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Localização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsToShip.map((item) => (
                    <TableRow key={item.id} data-state={selectedItems.has(item.id) ? "selected" : ""}>
                      <TableCell className="text-center">
                        <Checkbox 
                            onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                            checked={selectedItems.has(item.id)}
                            aria-label={`Selecionar ${item.product}`}
                        />
                      </TableCell>
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
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button size="lg" className="w-full sm:w-auto" onClick={handleCreateShipment} disabled={selectedItems.size === 0 || !destination}>
            <Truck className="mr-2 h-5 w-5" />
            Criar Carga e Expedir Itens
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isQrCodeOpen} onOpenChange={setIsQrCodeOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Carga de Expedição Gerada</DialogTitle>
                <DialogDescription>
                    O QR Code abaixo contém todas as informações da carga. Imprima ou apresente no momento da coleta.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-4">
                <div className="p-4 bg-white rounded-lg">
                    {qrCodeValue && <QRCode value={qrCodeValue} size={256} />}
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                 <Button type="button" variant="secondary" onClick={() => setIsQrCodeOpen(false)}>
                    Fechar
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
