import { Hero } from "../../components/sections/Hero";
import { Metrics } from "../../components/sections/Metrics";
import { Timeline } from "../../components/sections/Timeline";
// import { ProjectSlider } from "../../components/sections/ProjectSlider";
import { Stack } from "../../components/sections/Stack";
import { Certifications } from "../../components/sections/Certifications";
import { Footer } from "../../components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Timeline />
      {/* <ProjectSlider /> */}
      <Stack />
      <Certifications />
      <Footer />
    </>
  );
}