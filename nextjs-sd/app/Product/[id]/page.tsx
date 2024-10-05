"use client";

import { Textarea, Button } from "@/app/components/ui";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@radix-ui/react-avatar";
import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
}

export default function CaseDetails() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Lorem Ipsum",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    },
    {
      id: 2,
      author: "Lorem Ipsum",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    },
    {
      id: 3,
      author: "Lorem Ipsum",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    },
  ]);
  const { toast } = useToast();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: "User",
        content: newComment.trim(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      toast({
        title: "Comment submitted",
        description: "Your comment has been added successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Cases Section */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Lorem Ipsum Title</h1>
          <p className="text-sm text-gray-400 mb-4">Tharshen</p>

          {["A", "B", "C"].map((letter) => (
            <div key={letter} className="mb-4">
              <p className="text-sm text-gray-400 mb-2">
                Conversation {letter}:
              </p>
              <Textarea
                className="w-full bg-gray-700 text-gray-100 border-gray-600"
                rows={3}
                placeholder={letter === "C" ? "Enter Text" : ""}
                readOnly={letter !== "C"}
              />
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-400">Created At: 12/11/24</p>
            <div className="space-x-2">
              <Button
                variant="outline"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              >
                Support Seller
              </Button>
              <Button
                variant="outline"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              >
                Support Merchant
              </Button>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <Textarea
              placeholder="Drop Your Opinion Here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border-gray-600 mb-2"
              rows={4}
            />
            <div className="flex justify-end">
              <Button type="submit">
                Submit
                <span className="ml-2">→</span>
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar className="w-10 h-10 bg-gray-600" />
                <div>
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-gray-400">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
