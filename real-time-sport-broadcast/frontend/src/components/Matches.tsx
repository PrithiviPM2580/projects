import Cards from "./Cards";
import Header from "./Header";

const Matches = () => {
  return (
    <div className="flex-2 flex flex-col gap-6">
      <div className="flex-between">
        <h1 className="text-xl font-bold">Current Matches</h1>
        <p className="bg-black text-sm rounded-sm text-white dark:text-black dark:bg-white px-3 py-1">
          API: 11
        </p>
      </div>
      <Header className="header py-4! flex-between rounded-xl!">
        <p className="text-sm font-semibold">4 new match added</p>
        <p className="text-sm btn px-3 py-1 rounded-2xl bg-[#FBFBFB] border-2 border-black dark:bg-slate-800 theme-text">
          Dismiss
        </p>
      </Header>
      <div>
        <Cards />
      </div>
    </div>
  );
};

export default Matches;
