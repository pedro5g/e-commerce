import { Container } from "./components/Container";
import { HomeBanner } from "./components/HomeBanner";
import { ProductCard } from "./components/products/ProductCard";
import { getProducts, IProductParams } from "@/actions/getProducts";
import { NullData } from "./components/NullData";
import { ProductWithReviews } from "@/@types/product-types";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (!products.length) {
    return (
      <NullData title="Oops! No products found. Click 'All' to clear filters" />
    );
  }
  const shuffleArray = (array: ProductWithReviews[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array as ProductWithReviews[];
  };

  const shuffledProducts = shuffleArray(products);

  return (
    <div className=" p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
