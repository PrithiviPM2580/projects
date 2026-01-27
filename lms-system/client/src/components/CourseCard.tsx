import { Button } from "./ui/button";
import { Card } from "./ui/card";

const CourseCard = ({ course }: { course: Courses }) => {
  return (
    <Card className="px-4 py-4 shadow-lg flex flex-col gap-3 rounded-sm">
      <div className="w-full h-48 overflow-hidden border-2 rounded-sm">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-base md:text-xl lg:text-xl font-semibold">
        {course.title}
      </h1>
      <p className="text-gray-500 text-sm md:text-base">{course.description}</p>
      <Button className="bg-jordy-blue-600 hover:bg-jordy-blue-400">
        Learn More
      </Button>
    </Card>
  );
};

export default CourseCard;
