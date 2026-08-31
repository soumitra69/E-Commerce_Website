import { useEffect, useState } from "react";
import {
    useSearchParams,
    useNavigate,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";


function Women() {

    // ==========================================
    // STATES
    // ==========================================

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // NAVIGATION
    // ==========================================

    const navigate = useNavigate();


    // ==========================================
    // SEARCH PARAMS
    // ==========================================

    const [searchParams] = useSearchParams();

    const search =
        searchParams.get("search") || "";


    // ==========================================
    // LOAD WOMEN PRODUCTS FROM SUPABASE
    // ==========================================

    const loadWomenProducts = async () => {

        try {

            setLoading(true);
            setError("");


            // Get products from Supabase
            const {
                data,
                error: supabaseError,
            } = await supabase
                .from("products")
                .select("*")
                .order("created_at", {
                    ascending: false,
                });


            if (supabaseError) {
                throw supabaseError;
            }


            // ==========================================
            // FILTER WOMEN PRODUCTS
            //
            // Supports both:
            // gender = "women"
            //
            // AND your old CRM:
            // category = "women"
            // ==========================================

            const womenProducts =
                (data || []).filter((product) => {

                    const gender =
                        product.gender
                            ?.toLowerCase()
                            .trim();

                    const category =
                        product.category
                            ?.toLowerCase()
                            .trim();

                    const status =
                        product.status
                            ?.toLowerCase()
                            .trim();


                    // Don't show inactive products
                    if (status === "inactive") {
                        return false;
                    }


                    return (
                        gender === "women" ||
                        gender === "woman" ||
                        gender === "female" ||
                        category === "women" ||
                        category === "woman" ||
                        category === "women's" ||
                        category === "womens"
                    );

                });


            setProducts(womenProducts);


        } catch (err) {

            console.error(
                "Error loading women products:",
                err
            );

            setError(
                err.message ||
                "Failed to load women products."
            );

            setProducts([]);


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD ON PAGE OPEN
    // ==========================================

    useEffect(() => {

        loadWomenProducts();


        // Optional:
        // If another part of your application
        // triggers this event, refresh products.

        const handleUpdate = () => {
            loadWomenProducts();
        };


        window.addEventListener(
            "adminProductsUpdated",
            handleUpdate
        );


        return () => {

            window.removeEventListener(
                "adminProductsUpdated",
                handleUpdate
            );

        };

    }, []);


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredProducts =
        products.filter((product) => {

            const text =
                search
                    .toLowerCase()
                    .trim();


            // No search
            if (!text) {
                return true;
            }


            return (

                product.title
                    ?.toLowerCase()
                    .includes(text)

                ||

                product.brand
                    ?.toLowerCase()
                    .includes(text)

                ||

                product.category
                    ?.toLowerCase()
                    .includes(text)

                ||

                product.description
                    ?.toLowerCase()
                    .includes(text)

            );

        });


    // ==========================================
    // PRODUCT DETAILS
    // ==========================================

    const handleProductClick = (product) => {

        navigate(
            `/product/${product.id}`
        );

    };


    // ==========================================
    // RETRY
    // ==========================================

    const handleRetry = () => {

        loadWomenProducts();

    };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div
            className="min-h-screen"
            style={{
                background: "#F1ECE1",
                color: "#201E1B",
            }}
        >

            {/* =====================================
                HEADER
            ====================================== */}

            <Header />


            {/* =====================================
                MAIN
            ====================================== */}

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

                {/* =====================================
                    TITLE
                ====================================== */}

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
                        Norden / Women
                    </p>


                    <h1
                        className="
                            font-display
                            text-5xl
                            md:text-7xl
                        "
                    >
                        Women's Collection
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
                        timeless women's clothing,
                        footwear, accessories, and
                        jewellery designed for everyday
                        wear.
                    </p>

                </div>


                {/* =====================================
                    SEARCH RESULT
                ====================================== */}

                {search && !loading && !error && (

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


                        <h2 className="text-2xl mt-2">
                            "{search}"
                        </h2>


                        <p
                            className="
                                text-sm
                                text-[#4a4740]
                                mt-2
                            "
                        >
                            {filteredProducts.length}{" "}
                            product
                            {filteredProducts.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>

                    </div>

                )}


                {/* =====================================
                    LOADING
                ====================================== */}

                {loading && (

                    <div
                        className="
                            py-20
                            text-center
                        "
                    >

                        <p
                            className="
                                font-mono
                                text-sm
                            "
                        >
                            Loading products...
                        </p>

                    </div>

                )}


                {/* =====================================
                    ERROR
                ====================================== */}

                {!loading && error && (

                    <div
                        className="
                            py-20
                            text-center
                        "
                    >

                        <p
                            className="
                                text-[#9C4A2E]
                                mb-5
                            "
                        >
                            {error}
                        </p>


                        <button
                            onClick={handleRetry}
                            className="
                                border
                                border-[#201E1B]
                                px-6
                                py-3
                                text-sm
                                hover:bg-[#201E1B]
                                hover:text-[#F1ECE1]
                                transition
                            "
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* =====================================
                    PRODUCT COUNT
                ====================================== */}

                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (

                        <div className="mb-6">

                            <p
                                className="
                                    font-mono
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-[#5F6B4A]
                                "
                            >
                                {filteredProducts.length}{" "}
                                Women's Products
                            </p>

                        </div>

                    )}


                {/* =====================================
                    PRODUCT GRID
                ====================================== */}

                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (

                        <div
                            className="
                                grid
                                grid-cols-2
                                md:grid-cols-4
                                gap-5
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

                                        {/* =================================
                                            IMAGE
                                        ================================== */}

                                        <div
                                            className="
                                                aspect-[3/4]
                                                mb-4
                                                overflow-hidden
                                                bg-[#E4DED1]
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
                                                    transition-transform
                                                    duration-500
                                                    group-hover:scale-105
                                                "

                                                onError={(e) => {

                                                    e.currentTarget.src =
                                                        "https://via.placeholder.com/500x600?text=Product";

                                                }}
                                            />

                                        </div>


                                        {/* =================================
                                            CATEGORY
                                        ================================== */}

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
                                            WOMEN
                                        </p>


                                        {/* =================================
                                            NAME + PRICE
                                        ================================== */}

                                        <div
                                            className="
                                                flex
                                                items-baseline
                                                justify-between
                                                gap-2
                                            "
                                        >

                                            <h2
                                                className="
                                                    text-sm
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
                                                {Number(
                                                    product.price || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>


                                        {/* =================================
                                            BRAND
                                        ================================== */}

                                        {product.brand && (

                                            <p
                                                className="
                                                    text-xs
                                                    text-[#6b675f]
                                                    mt-2
                                                "
                                            >
                                                {
                                                    product.brand
                                                }
                                            </p>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}


                {/* =====================================
                    NO PRODUCTS
                ====================================== */}

                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (

                        <div
                            className="
                                py-20
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
                                No Women's Products
                            </p>


                            <p
                                className="
                                    text-[#4a4740]
                                "
                            >
                                {search
                                    ? `No women's products match "${search}".`
                                    : "Add a women's product from the Admin Dashboard."
                                }
                            </p>

                        </div>

                    )}

            </main>


            {/* =====================================
                FOOTER
            ====================================== */}

            <Footer />

        </div>

    );

}


export default Women;