import ExtensionHeader from "@/components/ExtensionHeader";
import TaskBoard from "@/components/TaskBoard";
import { useRef } from "react";

const Index = () => {
  const taskBoardRef = useRef<{ resetBoard: () => void } | null>(null);

  const handleReset = () => {
    if (taskBoardRef.current) {
      taskBoardRef.current.resetBoard();
    }
  };

  return (
    <div className="w-[400px] min-h-[500px] bg-extension-background">
      <div className="min-h-[500px] border-0">
        <ExtensionHeader onReset={handleReset} />
        <TaskBoard ref={taskBoardRef} />
      </div>
    </div>
  );
};

export default Index;