import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <section className="padding flex flex-col gap-4">
      <div className="flex-col md:flex-row flex-center gap-6 rounded-xl px-6 py-4 md:py-12 shadow-lg">
        <div className="img h-60 w-60 rounded-full bg-slate-200"></div>
        <div className="profile-details flex flex-col gap-2">
          <h1 className="text-jordy-blue-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
            Welcome, Rohit
          </h1>
          <div className="profile-email gap-2 md:text-left flex">
            <h4 className="font-semibold">Email:</h4>
            <p>prithivi@example.com</p>
          </div>
          <div className="profile-role gap-2 md:text-left flex">
            <h4 className="font-semibold">Role:</h4>
            <p>Student</p>
          </div>
          <div className="profile-bio gap-2 md:text-left flex">
            <h4 className="font-semibold">Bio:</h4>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <Button className="cursor-pointer bg-jordy-blue-600 hover:bg-jordy-blue-400">
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="shadow-lg">
        <h1>Your Enrolled Courses</h1>
      </div>
    </section>
  );
};

export default ProfilePage;
