"use client";

import { useState } from "react";
import { Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
      <div className="flex-1 max-h-1sm:mx-4 lg:mx-6">
        <form onSubmit={handleSearch} className="w-full sm:w-96 lg:w-[300px]">
          <div className="flex items-center bg-white border border-gray-300 focus-within:border-berd-primary-500 rounded-full focus-within:ring-2 focus-within:ring-berd-primary-200 overflow-hidden">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Найти..."
                className="shadow-none py-1.5 sm:py-2 lg:py-2 pr-10 sm:pr-12 lg:pr-11 pl-2 sm:pl-4 lg:pl-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 xs:w-44 sm:w-auto h-auto text-xs sm:text-sm lg:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="top-1/2 right-1 sm:right-2 lg:right-3 absolute w-7 sm:w-8 lg:w-9 h-7 sm:h-8 lg:h-9 text-gray-400 hover:text-orange-500 -translate-y-1/2"
              >
                <Search className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
  );
};