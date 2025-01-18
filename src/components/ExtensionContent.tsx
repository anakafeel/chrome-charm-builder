import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ExtensionContent = () => {
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 bg-extension-surface border-extension-border">
        <h2 className="text-sm font-medium text-extension-text mb-2">Welcome!</h2>
        <p className="text-sm text-extension-text-secondary mb-4">
          This is your new Chrome extension. Start customizing it to make it your own!
        </p>
        <Button 
          className="w-full bg-extension-primary hover:bg-extension-secondary text-white"
          onClick={() => console.log("Button clicked!")}
        >
          Get Started
        </Button>
      </Card>
      
      <div className="text-xs text-extension-text-secondary text-center">
        Version 1.0.0
      </div>
    </div>
  );
};

export default ExtensionContent;