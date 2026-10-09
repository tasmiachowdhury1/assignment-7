import AllProducts from "./components/AllProducts";
import Hero from "./components/Hero";
import PriceDecreased from "./components/PriceDecreased";
import PriceIncreased from "./components/PriceIncrease";


export default function Home() {
    return (
        <>
            <Hero />
            <PriceIncreased />
            <PriceDecreased />
            <AllProducts />
        </>
    );
}