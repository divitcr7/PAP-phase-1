import { Helmet, HelmetProvider } from "react-helmet-async";

interface MetaProps {
  meta: {
    title?: string;
    description?: string;
  };
}

export default function MetaComponent({ meta }: MetaProps) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title || "Default Title"}</title>
        <meta
          name="description"
          content={meta?.description || "Default Description"}
        />
      </Helmet>
    </HelmetProvider>
  );
}
