import { useProducts } from "hooks";
import { Loading, Menu, ListProducts } from "components";

const Home = () => {
  const { products, isLoading, setFilterBy } = useProducts();

  return isLoading ? (
    <div className="grid grid-cols-1 min-h-screen items-center justify-items-center">
      <Loading />
    </div>
  ) : (
    <>
      <Menu setFilterBy={setFilterBy} />
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10 mx-5 gap-4">
        {(products ?? []).map((product) => {
          return (
            <ListProducts key={product.priceId} className product={product} />
          );
        })}
      </div>
    </>
  );
};

export default Home;
