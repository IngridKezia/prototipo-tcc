"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const aisles = Array.from({ length: 5 }, (_, i) => `Aisle ${String.fromCharCode(65 + i)}`);
const shelvesPerAisle = 10;
const products = [
  { id: "p1", name: "Heavy-Duty Bearings", aisle: 0, shelf: 2, status: 'available' },
  { id: "p2", name: "Hydraulic Pump", aisle: 0, shelf: 7, status: 'available' },
  { id: "p3", name: "Conveyor Belt Roll", aisle: 1, shelf: 4, status: 'in-separation' },
  { id: "p4", name: "Safety Goggles Pack", aisle: 3, shelf: 8, status: 'expedited' },
  { id: "p5", name: "Industrial Gearbox T-800", aisle: 1, shelf: 3, status: 'available' },
  { id: "p6", name: "Pressure Valve", aisle: 4, shelf: 1, status: 'available' },
  { id: "p7", name: "Sensor Array", aisle: 2, shelf: 9, status: 'in-separation' },
];

const statusColors = {
  available: "bg-green-500",
  "in-separation": "bg-yellow-500",
  expedited: "bg-blue-500",
};

export function WarehouseMap() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Warehouse Floor Plan</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for a product..."
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-5 gap-4 bg-muted/50 p-4 rounded-lg overflow-x-auto">
            {aisles.map((aisle, aisleIndex) => (
              <div key={aisle} className="flex flex-col gap-2 min-w-[120px]">
                <h3 className="text-center font-bold text-sm text-muted-foreground">{aisle}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: shelvesPerAisle }).map((_, shelfIndex) => {
                    const productOnShelf = filteredProducts.find(
                      (p) => p.aisle === aisleIndex && p.shelf === shelfIndex
                    );
                    const locationKey = `${aisleIndex}-${shelfIndex}`;
                    return (
                      <Tooltip key={locationKey} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "h-12 w-full rounded flex items-center justify-center transition-colors",
                              productOnShelf ? "bg-primary/20 border-2 border-primary" : "bg-secondary"
                            )}
                          >
                            {productOnShelf && (
                              <div className={cn(
                                "w-4 h-4 rounded-full",
                                statusColors[productOnShelf.status as keyof typeof statusColors]
                              )} />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold">
                            {String.fromCharCode(65 + aisleIndex)}{shelfIndex + 1}: {productOnShelf ? productOnShelf.name : "Empty"}
                          </p>
                          {productOnShelf && <p>Status: {productOnShelf.status}</p>}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
            <span className="font-semibold">Legend:</span>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" />Available</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" />In Separation</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" />Expedited</div>
        </div>
      </CardContent>
    </Card>
  );
}
