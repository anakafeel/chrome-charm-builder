import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TaskStatus = "PENDING" | "COMPLETED" | "OVERDUE" | null;
type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  dueDate?: Date;
};
type Board = (Task | null)[];

const STORAGE_KEY = "taskTacToeBoard";

const TaskBoard = forwardRef<{ resetBoard: () => void }>((_, ref) => {
  const [board, setBoard] = useState<Board>(() => {
    const savedBoard = localStorage.getItem(STORAGE_KEY);
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });
  
  const { toast } = useToast();
  const [newTask, setNewTask] = useState({ title: "", dueDate: "" });

  useImperativeHandle(ref, () => ({
    resetBoard: () => {
      setBoard(Array(9).fill(null));
      localStorage.removeItem(STORAGE_KEY);
    }
  }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    
    // Check for overdue tasks
    const now = new Date();
    const updatedBoard = board.map((task) => {
      if (task && task.dueDate && new Date(task.dueDate) < now && task.status === "PENDING") {
        return { ...task, status: "OVERDUE" as TaskStatus };
      }
      return task;
    });
    
    if (JSON.stringify(updatedBoard) !== JSON.stringify(board)) {
      setBoard(updatedBoard);
      toast({
        title: "Tasks Updated",
        description: "Some tasks are now overdue!",
        variant: "destructive",
      });
    }
  }, [board]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle2 className="h-8 w-8 text-green-500" />;
      case "PENDING":
        return <Clock className="h-8 w-8 text-yellow-500" />;
      case "OVERDUE":
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Plus className="h-8 w-8 text-gray-400" />;
    }
  };

  const handleAddTask = (index: number) => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      status: "PENDING",
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
    };

    const newBoard = [...board];
    newBoard[index] = task;
    setBoard(newBoard);
    setNewTask({ title: "", dueDate: "" });

    toast({
      title: "Task Added",
      description: "Your new task has been created successfully!",
    });
  };

  const toggleTaskStatus = (index: number) => {
    if (!board[index]) return;

    const newBoard = [...board];
    const task = newBoard[index] as Task;
    task.status = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    setBoard(newBoard);

    if (task.status === "COMPLETED") {
      toast({
        title: "Task Completed! 🎉",
        description: "Keep up the great work!",
      });
      
      // Check for winning condition
      checkWinningCondition(newBoard);
    }
  };

  const checkWinningCondition = (currentBoard: Board) => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (
        currentBoard[a]?.status === "COMPLETED" &&
        currentBoard[b]?.status === "COMPLETED" &&
        currentBoard[c]?.status === "COMPLETED"
      ) {
        toast({
          title: "Congratulations! 🎉",
          description: "You've completed a full line of tasks!",
        });
        return;
      }
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setNewTask({ title: "", dueDate: "" });
    localStorage.removeItem(STORAGE_KEY);
  };

  const renderCell = (index: number) => {
    const task = board[index];
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={`h-28 w-full p-2 flex flex-col items-center justify-center gap-2 ${
              task?.status === "COMPLETED"
                ? "bg-green-50 dark:bg-green-900/20"
                : task?.status === "OVERDUE"
                ? "bg-red-50 dark:bg-red-900/20"
                : task?.status === "PENDING"
                ? "bg-yellow-50 dark:bg-yellow-900/20"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            onClick={() => task && toggleTaskStatus(index)}
          >
            {task ? (
              <>
                {getStatusIcon(task.status)}
                <span className="text-sm font-medium truncate w-full text-center">
                  {task.title}
                </span>
              </>
            ) : (
              <Plus className="h-8 w-8 text-gray-400" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{task ? "Task Details" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
            <Button onClick={() => handleAddTask(index)} className="w-full">
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-extension-text mb-2">Task Board</h2>
        <p className="text-sm text-extension-text-secondary">
          Complete tasks in a row to win!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index}>{renderCell(index)}</div>
          ))}
      </div>
    </Card>
  );
});

TaskBoard.displayName = "TaskBoard";

export default TaskBoard;