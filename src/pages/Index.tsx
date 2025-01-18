import ExtensionHeader from "@/components/ExtensionHeader";
import TicTacToeGame from "@/components/TicTacToeGame";

const Index = () => {
  return (
    <div className="w-[350px] min-h-[400px] bg-extension-background">
      <div className="min-h-[400px] border-0">
        <ExtensionHeader />
        <TicTacToeGame />
      </div>
    </div>
  );
};

export default Index;