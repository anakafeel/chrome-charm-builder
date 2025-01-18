import { Settings } from "lucide-react";
import { Button } from "./ui/button";

const ExtensionHeader = () => {
  return (
    <div className="p-4 border-b border-extension-border flex items-center justify-between">
      <h1 className="text-lg font-semibold text-extension-text">My Extension</h1>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Settings className="h-4 w-4 text-extension-text-secondary" />
      </Button>
    </div>
  );
};

export default ExtensionHeader;