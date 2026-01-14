"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBoard } from "@/lib/hooks/useBoards";
import { SelectTrigger } from "@radix-ui/react-select";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const { board, updateBoard, columns } = useBoard(id);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  async function handleUpdateBoard(e: React.FormEvent) {
    e.preventDefault();

    if (!newTitle.trim() || !board) return;

    try {
      await updateBoard(board.id, {
        title: newTitle.trim(),
        color: newColor || board.color,
      });
      setIsEditingTitle(false);
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        boardTitle={board?.title}
        onEditBoard={() => {
          setNewTitle(board?.title ?? "");
          setNewColor(board?.color ?? "");
          setIsEditingTitle(true);
        }}
        onFilterClick={() => setIsFilterOpen(true)}
        filterCount={2}
      />

      <Dialog open={isEditingTitle} onOpenChange={setIsEditingTitle}>
        <DialogContent className="w-[95vw] max-w-106.25 mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Board</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleUpdateBoard}>
            <div className="space-y-2">
              <Label htmlFor="boardTitle">Board Title</Label>
              <Input
                id="boardTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter board title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Board Color</Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {[
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-red-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-indigo-500",
                  "bg-gray-500",
                  "bg-orange-500",
                  "bg-teal-500",
                  "bg-cyan-500",
                  "bg-emerald-500",
                ].map((color, key) => (
                  <button
                    key={key}
                    type="button"
                    className={`w-8 h-8 rounded-full ${color} ${
                      color === newColor
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : ""
                    } `}
                    onClick={() => setNewColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditingTitle(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="w-[95vw] max-w-106.25 mx-auto">
          <DialogHeader>
            <DialogTitle>Filter Tasks</DialogTitle>
            <p className="text-sm text-gray-600">
              Filter tasks by priority, assignee, or due date
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex flex-wrap gap-2">
                {["low", "medium", "high"].map((priority, key) => (
                  <Button key={key} variant={"outline"} size="sm">
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assignee</Label>
              <Input
                id="assignee"
                name="assignee"
                placeholder="Who should do this?"
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant={"outline"}>
                Clear Filters
              </Button>
              <Button type="button" onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Board Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Total Tasks: </span>
              {columns.reduce((sum, col) => sum + col.tasks.length, 0)}
            </div>
          </div>

          {/* Add task dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-106.25 mx-auto">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <p className="text-sm text-gray-600">Add a task to the board</p>
              </DialogHeader>

              <form
                className="space-y-4"
                // onSubmit={handleCreateTask}
              >
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Input
                    id="assignee"
                    name="assignee"
                    placeholder="Who should do this?"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select name="priority" defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["low", "medium", "high"].map((priority, key) => (
                        <SelectItem key={key} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" id="dueDate" name="dueDate" />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit">Create Task</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
