import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type Player = "X" | "O" | null;
type Board = Player[];

const TicTacToeGame = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const { toast } = useToast();

  const calculateWinner = (squares: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      toast({
        title: "Game Over!",
        description: `Player ${winner} wins!`,
      });
    } else if (!newBoard.includes(null)) {
      toast({
        title: "Game Over!",
        description: "It's a draw!",
      });
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    return (
      <Button
        variant="outline"
        className={`h-16 w-16 text-2xl font-bold ${
          value === "X" ? "text-blue-500" : "text-red-500"
        }`}
        onClick={() => handleClick(index)}
      >
        {value}
      </Button>
    );
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-4">
        <p className="text-lg font-medium text-extension-text">
          {calculateWinner(board)
            ? `Winner: ${calculateWinner(board)}`
            : board.includes(null)
            ? `Next player: ${isXNext ? "X" : "O"}`
            : "Game Over - Draw!"}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index}>{renderSquare(index)}</div>
          ))}
      </div>
      <Button
        className="w-full bg-extension-primary hover:bg-extension-secondary text-white"
        onClick={resetGame}
      >
        Reset Game
      </Button>
    </Card>
  );
};

export default TicTacToeGame;