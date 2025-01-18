import { RotateCcw, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

interface ExtensionHeaderProps {
  onReset: () => void;
}

const ExtensionHeader = ({ onReset }: ExtensionHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleReset = () => {
    onReset();
    toast({
      title: "Board Reset",
      description: "All tasks have been cleared!",
    });
  };

  return (
    <div className="p-4 border-b border-extension-border flex items-center justify-between">
      <h1 className="text-lg font-semibold text-extension-text">Task Tac Toe</h1>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-extension-text-secondary" />
          ) : (
            <Moon className="h-4 w-4 text-extension-text-secondary" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4 text-extension-text-secondary" />
        </Button>
      </div>
    </div>
  );
};

export default ExtensionHeader;