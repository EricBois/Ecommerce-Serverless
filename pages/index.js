import { useProducts } from "../hooks";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Menu from "../components/Menu";

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
          return <Product key={product.priceId} className product={product} />;
        })}
      </div>
    </>
  );
};

export default Home;
