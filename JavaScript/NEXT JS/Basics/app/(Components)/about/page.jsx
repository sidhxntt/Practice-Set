import Link from "next/link";
const About = () => {
  return (
    <>
      <h3>About</h3>
      <div>
        <Link href={"/about/about-me"}>About me</Link>
      </div>
    </>
  );
};

export default About;
