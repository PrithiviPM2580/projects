import { Video } from "lucide-react";
import Header from "./Header";
import CommentaryCard from "./CommentaryCard";

const Commentary = () => {
  const ismatchSelected = true;
  if (!ismatchSelected) {
    return (
      <div className="flex-1 flex-center w-full h-svh rounded-4xl border-2 border-dotted border-black">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-20 h-20 flex-center rounded-full border-2 border-black bg-sport-300">
            <Video className="size-8" />
          </div>
          <h1 className="text-2xl font-bold">No Match Selected</h1>
          <p className="w-[60%] text-center text-slate-500">
            Select a match from the list to view live commentary and real-time
            updates.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 card overflow-hidden">
      <Header className="flex-between bg-[#B4E5FB] p-4 border-b-2 border-black">
        <h1 className="font-bold text-xl">Live Commentary</h1>
        <p className="px-3 py-0.5 bg-slate-100 rounded-2xl border-2 border-black btn">
          Real Time
        </p>
      </Header>
      <CommentaryCard />
    </div>
  );
};

export default Commentary;
