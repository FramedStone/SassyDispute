"use client";

import Cases from "@/components/pages/Cases/Cases";
import Comments from "@/components/pages/Cases/Comments";
import TopHeader from "@/components/pages/TopHeader";

// import { useRouter } from "next/navigation";

export default function CaseDetails() {
  return (
    <>
      <TopHeader />
      <Cases />
      <Comments />
    </>
  );
}
