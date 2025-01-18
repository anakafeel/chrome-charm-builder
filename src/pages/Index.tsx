import ExtensionHeader from "@/components/ExtensionHeader";
import TaskBoard from "@/components/TaskBoard";

const Index = () => {
  return (
    <div className="w-[400px] min-h-[500px] bg-extension-background">
      <div className="min-h-[500px] border-0">
        <ExtensionHeader />
        <TaskBoard />
      </div>
    </div>
  );
};

export default Index;