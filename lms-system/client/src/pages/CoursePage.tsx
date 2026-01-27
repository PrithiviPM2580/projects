import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/constants";

const CoursePage = () => {
  return (
    <section className="padding w-full min-h-screen flex flex-col gap-4">
      <h1 className="text-center font-semibold text-2xl">Courses</h1>
      <p className="">
        Explore our wide range of courses designed to help you learn and grow.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CoursePage;
