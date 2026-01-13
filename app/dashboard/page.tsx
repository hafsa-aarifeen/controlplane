"use client";

import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Filter, Grid3x3, List, Loader2, Plus, Search } from "lucide-react";
import { useBoards } from "@/lib/hooks/useBoards";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user } = useUser();
  const { createBoard, boards, loading, error } = useBoards();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCreateBoard = async () => {
    await createBoard({ title: "New Board" });
  };

  // if (loading) {
  //   return (
  //     <div>
  //       <Loader2 /> <span>Loading your boards...</span>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div>
        <h2> Error loading boards</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your boards today.
          </p>
          <Button className="w-full sm:w-auto" onClick={handleCreateBoard}>
            <Plus className="h-4 w-4 mr-2" />
            Create Board
          </Button>
        </div>

        {/* Boards */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Your Boards
              </h2>
              <p className="text-gray-600">Manage your projects and tasks</p>
              {/* {isFreeUser && (
                <p className="text-sm text-gray-500 mt-1">
                  Free plan: {boards.length}/1 boards used
                </p>
              )} */}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 rounded bg-white border p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                // onClick={() => setIsFilterOpen(true)}
              >
                <Filter />
                Filter
              </Button>

              <Button onClick={handleCreateBoard}>
                <Plus />
                Create Board
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search boards..."
              className="pl-10"
              // onChange={(e) =>
              //   setFilters((prev) => ({ ...prev, search: e.target.value }))
              // }
            />
          </div>

          {/* Boards Grid/List */}
          {boards.length === 0 ? (
            <div>No boards yet</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {boards.map((board, key) => (
                <Link href={`/boards/${board.id}`} key={key}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-4 h-4 ${board.color} rounded`} />
                        <Badge className="text-xs" variant="secondary">
                          New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {board.title}
                      </CardTitle>
                      <CardDescription className="text-sm mb-4">
                        {board.description}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                        <span>
                          Created{" "}
                          {new Date(board.created_at).toLocaleDateString()}
                        </span>
                        <span>
                          Updated{" "}
                          {new Date(board.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-50">
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">
                    Create new board
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              {boards.map((board, key) => (
                <div key={key} className={key > 0 ? "mt-4" : ""}>
                  <Link href={`/boards/${board.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-4 h-4 ${board.color} rounded`} />
                          <Badge className="text-xs" variant="secondary">
                            New
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {board.title}
                        </CardTitle>
                        <CardDescription className="text-sm mb-4">
                          {board.description}
                        </CardDescription>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                          <span>
                            Created{" "}
                            {new Date(board.created_at).toLocaleDateString()}
                          </span>
                          <span>
                            Updated{" "}
                            {new Date(board.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}

              <Card className="mt-4 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-50">
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">
                    Create new board
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
