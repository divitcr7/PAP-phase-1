// import { Separator } from "@/components/ui/separator";
// import Brands from "@/components/common/Brands";
// import Agents from "@/components/homes/home-3/Agents";
// import Blogs from "@/components/homes/home-3/Blogs";
// import Blogs2 from "@/components/homes/home-3/Blogs2";
// import Categories from "@/components/homes/home-3/Categories";
// import Locations from "@/components/homes/home-3/Locations";
// import Properties from "@/components/homes/home-3/Properties";
// import Services from "@/components/homes/home-3/Services";
// import Testimonials from "@/components/homes/home-3/Testimonials";

import Hero from "@/components/home/Hero";
import MetaComponent from "@/components/seo/MetaComponent";


type Metadata = {
  title: string;
  description: string;
};

const metadata: Metadata = {
  title: "Pick-A-Pad",
  description: "Pick-A-Pad - Find Your Perfect Home",
};

const Home = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Hero />
      {/* 
      <Separator className="my-6" />
      <Locations />
      <Separator className="my-6" />
      <Properties />
      <Separator className="my-6" />
      <Categories />
      <Separator className="my-6" />
      <Services />
      <Separator className="my-6" />
      <Brands />
      <Separator className="my-6" />
      <Testimonials />
      <Separator className="my-6" />
      <Agents />
      <Separator className="my-6" />
      <Blogs />
      <Separator className="my-6" />
      <Blogs2 />
      <Separator className="my-6" />*/}
      Home page
    </>
  );
};

export default Home;