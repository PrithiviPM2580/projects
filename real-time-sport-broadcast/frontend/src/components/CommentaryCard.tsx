import { COMMENTARY } from "@/constants";
const CommentaryCard = () => {
  return (
    <div className="flex flex-col gap-10 m-4">
      {COMMENTARY.map((commentary, index) => (
        <div className="flex flex-row gap-3" key={index}>
          <div className="flex items-center flex-col gap-2 ">
            <div className="w-2 h-2 rounded-full bg-sport-600" />
            <div className="w-0.75 h-full bg-slate-200" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex-center gap-3">
              <p className="text-slate-500 text-sm">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="px-2 py-0.5 text-sm bg-slate-100 rounded-4xl">
                {commentary.minute}'
              </p>
              <p className="px-2 py-0.5 text-sm bg-slate-100 rounded-4xl">
                seq {commentary.sequence}
              </p>
              <p className="px-2 py-0.5 text-sm bg-slate-100 rounded-4xl">
                {commentary.period}
              </p>
              <p className="px-3 py-0.5 text-sm bg-sport-300 border-2 border-black rounded-4xl">
                {commentary.eventType}
              </p>
            </div>
            <div className="font-bold text-sm">{commentary.actor}</div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h2 className="text-sm font-medium">{commentary.message}</h2>
            </div>
            <div className="flex items-center gap-2">
              {commentary.tags.map((tag, index) => (
                <p
                  key={index}
                  className="px-2 py-0.5 text-sm bg-slate-100 rounded-4xl"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentaryCard;
