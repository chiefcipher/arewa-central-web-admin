import React from "react";
import { Helmet } from "react-helmet";
interface I_SEO_Props {
  title: string;
  description: string;
}
export function Seo({ title, description }: I_SEO_Props): JSX.Element {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
