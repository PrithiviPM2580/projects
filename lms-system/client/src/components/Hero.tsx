import { LMS_IMAGE } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="padding flex-center flex-col md:flex-row  gap-4 bg-lms-foreground">
      <div className=" flex-3 flex gap-2 sm:gap-3 md:gap-6 lg:gap-10 flex-col">
        <h1 className="hero-h1 text-white">
          Explore our <span className="text-jordy-blue-700">14000+</span>
          <br />
          Online courses for all
        </h1>
        <p className="text-white para-text w-[80%] md:w-full">
          Learn new skills and advance your career with our extensive library of
          online courses.
        </p>
        <div className="mt-4 max-w-xl  rounded-xl border  bg-white/90 p-[1px]">
          <div className="flex w-full items-stretch overflow-hidden rounded-lg bg-white">
            <Input
              placeholder="Search your course here"
              className="text-gray-700  rounded-none h-16 flex-4 min-w-0 border-0 focus-visible:ring-0 focus-visible:outline-none"
            />
            <Button className="w-full h-16 cursor-pointer rounded-none bg-jordy-blue-600 hover:bg-jordy-blue-400 flex-1">
              Search{" "}
              <span>
                <Search />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-center flex-3">
        <figure className="w-full h-full overflow-hidden">
          <img className="image" src={LMS_IMAGE} alt="LMS Image" />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
