"use client";

import Cases from "@/app/components/pages/Product/Cases";
import Comments from "@/app/components/pages/Product/Comments";
import TopHeader from "@/app/components/pages/TopHeader";

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
