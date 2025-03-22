import { lazy, Suspense } from "react";
import MetaComponent from "@/components/seo/MetaComponent";
import LoadingComponent from "@/components/common/LoadingComponent";

// Lazy-load components
// const Hero = lazy(() => import("@/components/home/Hero"));
const Subscribe = lazy(() => import("./Subscribe"));
const Properties = lazy(() => import("@/components/home/Properties"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));

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
      <Suspense fallback={<LoadingComponent />}>
        <Subscribe />
        {/* <Hero /> */}
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <Properties />
      </Suspense>
      <Suspense fallback={<LoadingComponent />}>
        <Testimonials />
      </Suspense>
      {/*
      <Separator className="my-6" />
      <Locations />
      <Separator className="my-6" />
      <Separator className="my-6" />
      <Categories />
      <Separator className="my-6" />
      <Services />
      <Separator className="my-6" />
      <Brands />
      <Separator className="my-6" />
      <Separator className="my-6" />
      <Agents />
      <Separator className="my-6" />
      <Blogs />
      <Separator className="my-6" />
      <Blogs2 />
      <Separator className="my-6" />*/}
    </>
  );
};

export default Home;
