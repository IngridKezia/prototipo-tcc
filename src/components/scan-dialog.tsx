"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScanLine, MapPin, CheckCircle, PackagePlus, ArrowDownLeft, ArrowUpRight, Truck } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface ScanDialogProps {
  trigger?: ReactNode;
}

export function ScanDialog({ trigger }: ScanDialogProps) {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const { toast } = useToast();

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedProduct({
        name: "Industrial Gearbox T-800",
        sku: "IG-T800-001",
        location: "Corredor B | Prateleira 4",
        status: "Disponível",
        image: "https://placehold.co/400x400.png",
        imageHint: "industrial gearbox"
      });
      setIsScanning(false);
    }, 1500);
  };

  const handleAction = (actionName: string) => {
    toast({
      title: `Ação: ${actionName}`,
      description: `${scannedProduct.name} foi processado.`,
    });
    setScannedProduct(null);
    setOpen(false);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setScannedProduct(null);
      setIsScanning(false);
    }
  }

  const defaultTrigger = (
      <Button variant="default" className="gap-2 shadow-sm">
        <ScanLine className="h-4 w-4" />
        <span className="hidden sm:inline">Escanear Produto</span>
      </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Escanear Código de Barras</DialogTitle>
          <DialogDescription>
            Centralize o código de barras do produto na visualização para escanear.
          </DialogDescription>
        </DialogHeader>
        
        {!scannedProduct ? (
          <div className="my-4 flex flex-col items-center justify-center gap-4">
            <div className="relative w-64 h-48 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
              <p className="text-white/50 z-10 font-mono">Visualização da Câmera</p>
               <div className="absolute w-full h-[2px] bg-red-500/70 shadow-[0_0_10px_2px_#ef4444] scan-line"></div>
            </div>
            <Button onClick={handleSimulateScan} disabled={isScanning} className="w-64">
              {isScanning ? "Escaneando..." : "Simular Escaneamento"}
            </Button>
          </div>
        ) : (
          <div className="my-4 space-y-4">
            <div className="flex items-center gap-4">
              <Image 
                src={scannedProduct.image}
                alt={scannedProduct.name}
                width={80}
                height={80}
                className="rounded-lg border bg-muted"
                data-ai-hint={scannedProduct.imageHint}
              />
              <div>
                <h3 className="font-semibold text-lg">{scannedProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{scannedProduct.sku}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Localização: <strong>{scannedProduct.location}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Status: <strong className="text-green-600">{scannedProduct.status}</strong></span>
                </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {scannedProduct && (
            <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" onClick={() => handleAction('Receber')}>
                    <ArrowDownLeft className="mr-2 h-4 w-4"/>Receber
                </Button>
                <Button variant="outline" onClick={() => handleAction('Separar')}>
                    <PackagePlus className="mr-2 h-4 w-4"/>Separar
                </Button>
                <Button variant="outline" onClick={() => handleAction('Expedir')}>
                    <ArrowUpRight className="mr-2 h-4 w-4"/>Expedir
                </Button>
                 <Button onClick={() => handleAction('Preparar Envio')}>
                    <Truck className="mr-2 h-4 w-4"/>Preparar Envio
                </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
