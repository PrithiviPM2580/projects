import { MATCHES } from "@/constants";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {MATCHES.map((match) => (
        <Card key={match.id} className="card">
          <CardHeader className="flex items-center justify-between">
            <p className="px-3 py-1.2 rounded-xl border-2 border-slate-900 text-slate-600">
              {match.sport}
            </p>
            <div className="flex-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></span>
              <p className="text-red-500  font-medium">Live</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex-between">
              <h1 className="text-xl font-bold theme-text">{match.homeTeam}</h1>
              <span className="theme-text border-2 border-black w-14 h-14 flex-center bg-slate-100 font-bold text-xl rounded-xl">
                {match.homeScore}
              </span>
            </div>
            <div className="flex-between">
              <h1 className="text-xl font-bold theme-text">{match.awayTeam}</h1>
              <span className="theme-text border-2 border-black w-14 h-14 flex-center bg-slate-100 font-bold text-xl rounded-xl">
                {match.awayScore}
              </span>
            </div>
            <div className="w-full border-[0.5px] border-dashed border-slate-900/10 mt-4" />
          </CardContent>
          <CardFooter className="flex-between">
            <p className="text-slate-500 font-medium">
              {new Date(match.startTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <Button className="btn bg-sport-300! font-semibold">
              Watch Live
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
