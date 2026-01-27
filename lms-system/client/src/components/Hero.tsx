import lmsImage from "../assets/lms.png";

const Hero = () => {
  return (
    <section className="padding flex flex-col gap-4 bg-lms-foreground">
      <div>
        <h1 className="hero-h1 text-white">
          Explore our <span className="text-jordy-blue-700">14000+</span>
          <br />
          Online courses for all
        </h1>
        <p className="text-white para-text">
          Learn new skills and advance your career with our extensive library of
          online courses.
        </p>
      </div>
      <div>
        <figure>
          <img src={lmsImage} alt="LMS Image" />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
