"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle auth here.
    // For this prototype, we'll just navigate to the dashboard.
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleLogin}>
      <Card>
        <CardHeader className="items-center text-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Compass className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Onde Está</CardTitle>
          <CardDescription>GPS interno para o seu estoque.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="supervisor@stockwise.com" required defaultValue="supervisor@stockwise.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Entrar</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
