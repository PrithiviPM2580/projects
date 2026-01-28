import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <section className="padding">
      <div className="div">
        <div className="img"></div>
        <div className="profile-details">
          <h1>Welcome, Rohit</h1>
          <div className="profile-email"></div>
          <div className="profile-role"></div>
          <div className="profile-bio"></div>
          <Button>Edit Profile</Button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
