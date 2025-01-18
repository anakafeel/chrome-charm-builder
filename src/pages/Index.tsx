import ExtensionHeader from "@/components/ExtensionHeader";
import ExtensionContent from "@/components/ExtensionContent";

const Index = () => {
  return (
    <div className="w-[350px] min-h-[400px] bg-extension-background">
      <div className="min-h-[400px] border-0">
        <ExtensionHeader />
        <ExtensionContent />
      </div>
    </div>
  );
};

export default Index;