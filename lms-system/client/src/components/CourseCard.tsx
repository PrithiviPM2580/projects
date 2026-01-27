import { Button } from "./ui/button";
import { Card } from "./ui/card";

const CourseCard = ({ course }: { course: Courses }) => {
  return (
    <Card className="px-2 py-2 shadow-lg">
      <div className="w-full h-48 overflow-hidden border-2 rounded-sm">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-xl md:text-2xl lg:text-3xl">{course.title}</h1>
      <p>{course.description}</p>
      <Button className="bg-jordy-blue-600 hover:bg-jordy-blue-400">
        Learn More
      </Button>
    </Card>
  );
};

export default CourseCard;
