import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Avatar, Button, Textarea } from "../../ui";
interface Comment {
  id: number;
  author: string;
  content: string;
}
const Comments = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Lorem Ipsum",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    },
  ]);
  const { toast } = useToast();
  // const router = useRouter();

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
    <div className="flex min-h-screen bg-primary text-gray-100">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold font-karla">
          Comments
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <section className="bg-primary p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <Textarea
              placeholder="Drop Your Opinion Here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full  mb-2"
              rows={4}
            />
            <div className="flex justify-end">
              <Button type="submit" variant={"ghost"} className="text-black">
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
};

export default Comments;
