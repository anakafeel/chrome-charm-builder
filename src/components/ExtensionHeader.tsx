import { RotateCcw, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const ExtensionHeader = () => {
  const { theme, setTheme } = useTheme();

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
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RotateCcw className="h-4 w-4 text-extension-text-secondary" />
        </Button>
      </div>
    </div>
  );
};

export default ExtensionHeader;