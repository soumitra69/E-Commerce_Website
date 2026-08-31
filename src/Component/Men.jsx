import { useEffect, useState } from "react";
import {
    useSearchParams,
    useNavigate,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

import {
    ShoppingBag,
    Loader2,
} from "lucide-react";


function Men() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const search =
        searchParams.get("search") || "";


    // ==========================================
    // LOAD PRODUCTS FROM SUPABASE
    // ==========================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);
                setError("");


                const {
                    data,
                    error: supabaseError,
                } = await supabase
                    .from("products")
                    .select("*")
                    .eq("gender", "men")
                    .order("created_at", {
                        ascending: false,
                    });


                if (supabaseError) {
                    throw supabaseError;
                }


                setProducts(data || []);


            } catch (err) {

                console.error(
                    "Supabase product error:",
                    err
                );

                setError(
                    err.message ||
                    "Failed to load products."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchProducts();

    }, []);


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredProducts =
        products.filter((product) => {

            const searchText =
                search
                    .toLowerCase()
                    .trim();


            if (!searchText) {
                return true;
            }


            return (

                product.title
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                product.category
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                product.brand
                    ?.toLowerCase()
                    .includes(searchText)

            );

        });


    // ==========================================
    // PRODUCT DETAILS
    // ==========================================

    const handleProductClick =
        (product) => {

            navigate(
                `/product/${product.id}`
            );

        };


    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart =
        (e, product) => {

            e.stopPropagation();

            console.log(
                "Add to cart:",
                product
            );

        };


    return (

        <div
            className="min-h-screen"
            style={{
                background: "#F1ECE1",
                color: "#201E1B",
            }}
        >

            <Header />


            <main
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    md:px-10
                    py-16
                "
            >

                {/* PAGE HEADER */}

                <div className="mb-10">

                    <p
                        className="
                            font-mono
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-[#5F6B4A]
                            mb-4
                        "
                    >
                        Norden / Men
                    </p>


                    <h1
                        className="
                            font-display
                            text-5xl
                            md:text-7xl
                        "
                    >
                        Men's Collection
                    </h1>


                    <p
                        className="
                            mt-5
                            max-w-xl
                            text-[#4a4740]
                            leading-relaxed
                        "
                    >
                        Explore our collection of
                        timeless men's clothing
                        made with natural fibers
                        and designed for everyday
                        wear.
                    </p>

                </div>


                {/* SEARCH RESULT */}

                {!loading &&
                    !error &&
                    search && (

                        <div className="mb-8">

                            <p
                                className="
                                    font-mono
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-[#5F6B4A]
                                "
                            >
                                Search results for:
                            </p>


                            <h2
                                className="
                                    text-2xl
                                    mt-2
                                "
                            >
                                "{search}"
                            </h2>


                            <p
                                className="
                                    text-sm
                                    text-[#4a4740]
                                    mt-2
                                "
                            >
                                {
                                    filteredProducts.length
                                }{" "}
                                product
                                {
                                    filteredProducts.length !==
                                    1
                                        ? "s"
                                        : ""
                                }{" "}
                                found
                            </p>

                        </div>

                    )}


                {/* LOADING */}

                {loading && (

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            py-24
                        "
                    >

                        <Loader2
                            size={30}
                            className="
                                animate-spin
                            "
                        />


                        <span
                            className="
                                ml-3
                                font-mono
                                text-sm
                            "
                        >
                            Loading products...
                        </span>

                    </div>

                )}


                {/* ERROR */}

                {!loading &&
                    error && (

                        <div
                            className="
                                text-center
                                py-24
                            "
                        >

                            <p
                                className="
                                    text-[#9C4A2E]
                                    mb-3
                                "
                            >
                                {error}
                            </p>


                            <button
                                onClick={() =>
                                    window.location.reload()
                                }
                                className="
                                    border
                                    border-[#201E1B]
                                    px-5
                                    py-2
                                    text-sm
                                "
                            >
                                Try Again
                            </button>

                        </div>

                    )}


                {/* PRODUCTS */}

                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (

                        <>

                            <div className="mb-6">

                                <p
                                    className="
                                        font-mono
                                        text-xs
                                        uppercase
                                        tracking-wide
                                    "
                                >
                                    {
                                        filteredProducts.length
                                    }{" "}
                                    Products
                                </p>

                            </div>


                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    md:grid-cols-3
                                    lg:grid-cols-4
                                    gap-x-5
                                    gap-y-10
                                "
                            >

                                {filteredProducts.map(
                                    (product) => (

                                        <div
                                            key={product.id}
                                            onClick={() =>
                                                handleProductClick(
                                                    product
                                                )
                                            }
                                            className="
                                                group
                                                cursor-pointer
                                            "
                                        >

                                            {/* IMAGE */}

                                            <div
                                                className="
                                                    relative
                                                    aspect-[3/4]
                                                    mb-4
                                                    overflow-hidden
                                                    bg-[#DED7C8]
                                                "
                                            >

                                                <img
                                                    src={
                                                        product.thumbnail
                                                    }
                                                    alt={
                                                        product.title
                                                    }
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                        group-hover:scale-105
                                                        transition-transform
                                                        duration-500
                                                    "
                                                    onError={(e) => {

                                                        e.currentTarget.src =
                                                            "https://via.placeholder.com/500x650";

                                                    }}
                                                />


                                                {/* CART */}

                                                <button
                                                    type="button"
                                                    aria-label="Add to cart"
                                                    onClick={(e) =>
                                                        handleAddToCart(
                                                            e,
                                                            product
                                                        )
                                                    }
                                                    className="
                                                        absolute
                                                        bottom-3
                                                        right-3
                                                        bg-[#F1ECE1]
                                                        w-10
                                                        h-10
                                                        flex
                                                        items-center
                                                        justify-center
                                                        opacity-0
                                                        group-hover:opacity-100
                                                        transition-opacity
                                                    "
                                                >

                                                    <ShoppingBag
                                                        size={17}
                                                    />

                                                </button>

                                            </div>


                                            {/* CATEGORY */}

                                            <p
                                                className="
                                                    font-mono
                                                    text-[10px]
                                                    uppercase
                                                    tracking-wide
                                                    text-[#5F6B4A]
                                                    mb-1
                                                "
                                            >
                                                {
                                                    product.category
                                                }
                                            </p>


                                            {/* TITLE / PRICE */}

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <h2
                                                    className="
                                                        text-sm
                                                        leading-5
                                                    "
                                                >
                                                    {
                                                        product.title
                                                    }
                                                </h2>


                                                <span
                                                    className="
                                                        font-mono
                                                        text-sm
                                                        whitespace-nowrap
                                                    "
                                                >
                                                    ₹
                                                    {
                                                        product.price
                                                    }
                                                </span>

                                            </div>


                                            {/* RATING */}

                                            {product.rating !==
                                                null &&
                                                product.rating !==
                                                undefined && (

                                                    <p
                                                        className="
                                                            text-xs
                                                            text-[#6b675f]
                                                            mt-2
                                                        "
                                                    >
                                                        ★{" "}
                                                        {
                                                            product.rating
                                                        }
                                                    </p>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        </>

                    )}


                {/* NO PRODUCTS */}

                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (

                        <div
                            className="
                                py-24
                                text-center
                            "
                        >

                            <p
                                className="
                                    font-display
                                    text-3xl
                                    mb-3
                                "
                            >
                                No products found
                            </p>


                            <p
                                className="
                                    text-[#4a4740]
                                "
                            >
                                {search
                                    ? `No men's products match "${search}".`
                                    : "There are no men's products yet."
                                }
                            </p>

                        </div>

                    )}

            </main>


            <Footer />

        </div>

    );

}


export default Men;