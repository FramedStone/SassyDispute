"use client";

import { useState } from "react";
import { Search, Filter, ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";
import TopHeader from "../TopHeader";
import { Switch } from "@radix-ui/react-switch";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../ui";

interface DisputeCase {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author: string;
  trending: boolean;
}

const disputeCases: DisputeCase[] = [
  {
    id: "1",
    title: "Dispute Case A",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
    createdAt: "12/11/24",
    author: "Tharshen",
    trending: true,
  },
  {
    id: "2",
    title: "Dispute Case B",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
    createdAt: "12/10/24",
    author: "John Doe",
    trending: false,
  },
];

export default function Component() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "trending">("latest");
  const [showArchived, setShowArchived] = useState(false);

  const filteredCases = disputeCases.filter(
    (disputeCase) =>
      disputeCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disputeCase.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCases = filteredCases.sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return b.trending ? -1 : 1;
    }
  });

  return (
    <div>
      <TopHeader />

      <div className="flex h-screen bg-primary border border-white border-l-0 border-r-0 text-white">
        <aside className="w-64 p-6 border-r border-white">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Filter className="mr-2" />
            Filter
          </h2>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Sort By</h3>
            <div className="space-x-2">
              <Button
                variant={sortBy === "latest" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSortBy("latest")}
              >
                Latest
              </Button>
              <Button
                variant={sortBy === "trending" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSortBy("trending")}
              >
                Trending
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Show Archived</span>
            <Switch checked={showArchived} onCheckedChange={setShowArchived} />
          </div>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10  text-white"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            {sortedCases.map((disputeCase) => (
              <Card key={disputeCase.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{disputeCase.title}</CardTitle>
                    <span className="text-sm text-gray-400">
                      {disputeCase.author}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{disputeCase.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Created At: {disputeCase.createdAt}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/Cases/${disputeCase.id}`)}
                  >
                    Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
