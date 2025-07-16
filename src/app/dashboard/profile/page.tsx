import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Key } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Sara Vitoria",
    email: "supervisor@stockwise.com",
    avatar: "https://i.ibb.co/Wp7B2wL/avatar-1.png",
    avatarHint: "person face",
    fallback: "S",
    registration: "SW-12345",
    role: "Supervisor"
  };

  return (
    <div className="flex justify-center items-start pt-0 md:pt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.avatarHint} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-3xl">{user.name}</CardTitle>
              <CardDescription className="mt-1">
                <Badge variant="secondary" className="text-base">{user.role}</Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4 grid gap-4 text-sm">
           <div className="flex items-center gap-4 rounded-lg border p-3">
             <Mail className="h-5 w-5 text-muted-foreground" />
             <div className="flex flex-col">
                <span className="text-muted-foreground">E-mail</span>
                <span className="font-medium">{user.email}</span>
             </div>
           </div>
           <div className="flex items-center gap-4 rounded-lg border p-3">
             <Key className="h-5 w-5 text-muted-foreground" />
             <div className="flex flex-col">
                <span className="text-muted-foreground">Matrícula</span>
                <span className="font-medium">{user.registration}</span>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
