import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

const AdminPlaceholder = ({ title }: { title: string }) => (
  <div className="p-6 space-y-6">
    <h1 className="font-display text-2xl font-bold">{title}</h1>
    <Card className="border-border">
      <CardContent className="flex flex-col items-center justify-center p-12 gap-4 text-muted-foreground">
        <Construction className="h-12 w-12" />
        <p className="text-lg font-display">Coming Soon</p>
        <p className="text-sm">This section is under development.</p>
      </CardContent>
    </Card>
  </div>
);

export default AdminPlaceholder;
