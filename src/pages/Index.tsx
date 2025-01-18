import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExtensionHeader from "@/components/ExtensionHeader";
import ExtensionContent from "@/components/ExtensionContent";

const Index = () => {
  return (
    <div className="w-[350px] min-h-[400px] bg-extension-background">
      <Card className="rounded-none min-h-[400px] border-0">
        <ExtensionHeader />
        <ExtensionContent />
      </Card>
    </div>
  );
};

export default Index;