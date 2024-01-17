import React from "react";

interface Props {
  params: {
    slug: string[];
    searchParams: { sortOrder: string };
  };
}

const ProductPage = ({ params: { slug }, searchParams }: Props) => {
  return <div>ProductPage</div>;
};

export default ProductPage;
