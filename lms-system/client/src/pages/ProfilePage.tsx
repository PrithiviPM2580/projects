import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <section className="padding flex flex-col gap-4 md:gap-12">
      <div className="flex-col md:flex-row flex-center gap-6 rounded-xl px-6 py-4 md:py-12 shadow-lg">
        <div className="img h-60 w-60 rounded-full bg-slate-200">
          <img src={user?.picture} alt={user?.name || "User Picture"} />
        </div>
        <div className="profile-details flex flex-col gap-2">
          <h1 className="text-jordy-blue-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
            Welcome, {user?.name || "User"}!
          </h1>
          <div className="profile-email gap-2 md:text-left flex">
            <h4 className="font-semibold">Email:</h4>
            <p>{user?.email || "No email provided"}</p>
          </div>
          <div className="profile-role gap-2 md:text-left flex">
            <h4 className="font-semibold">Role:</h4>
            <p>{user?.role || "No role provided"}</p>
          </div>
          <div className="profile-bio gap-2 md:text-left flex">
            <h4 className="font-semibold">Bio:</h4>
            <p>{user?.description || "No description provided"}</p>
          </div>
          <Dialog>
            <DialogTrigger className="cursor-pointer px-4 py-3 rounded-xl text-white bg-jordy-blue-600 hover:bg-jordy-blue-400">
              Edit Profile
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle className="text-center">Edit Profile</DialogTitle>
                <DialogDescription className="text-center">
                  Profile editing form goes here.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue={user?.name} />
              </div>
              <div className="flex gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  defaultValue={user?.description}
                />
              </div>
              <div className="flex gap-2">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" accept="image/*" />
              </div>
              <DialogFooter>
                <Button className="bg-jordy-blue-600 hover:bg-jordy-blue-400 py-3">
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="shadow-lg p-4 md:p-6 lg:p-10">
        <h1 className="font-semibold text-base md:text-xl">
          Your Enrolled Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
