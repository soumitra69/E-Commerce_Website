import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

import { useCart } from "../Context/CartContext";

import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingBag,
} from "lucide-react";


function ProductDetails() {

    // ==========================================
    // ROUTER
    // ==========================================

    const { id } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // CART
    // ==========================================

    const { addToCart } = useCart();


    // ==========================================
    // STATE
    // ==========================================

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    const [added, setAdded] =
        useState(false);


    // ==========================================
    // LOAD PRODUCT
    // ==========================================

    useEffect(() => {

        if (!id) {

            setProduct(null);
            setLoading(false);

            return;

        }


        loadProduct();

    }, [id]);


    // ==========================================
    // GET PRODUCT FROM SUPABASE
    // ==========================================

    const loadProduct = async () => {

        try {

            setLoading(true);
            setError("");


            console.log(
                "Loading product:",
                id
            );


            const {
                data,
                error: supabaseError,
            } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .maybeSingle();


            // ==========================================
            // SUPABASE ERROR
            // ==========================================

            if (supabaseError) {

                console.error(
                    "Supabase product error:",
                    supabaseError
                );

                setError(
                    supabaseError.message ||
                    "Failed to load product."
                );

                setProduct(null);

                return;

            }


            // ==========================================
            // PRODUCT NOT FOUND
            // ==========================================

            if (!data) {

                console.log(
                    "Product not found:",
                    id
                );

                setProduct(null);

                return;

            }


            // ==========================================
            // CHECK PRODUCT STATUS
            // ==========================================

            if (
                data.status &&
                String(data.status)
                    .toLowerCase()
                    .trim() === "inactive"
            ) {

                setProduct(null);

                return;

            }


            // ==========================================
            // PRODUCT FOUND
            // ==========================================

            console.log(
                "Product loaded:",
                data
            );


            console.log(
                "Product image:",
                data.thumbnail
            );


            setProduct(data);


        } catch (err) {

            console.error(
                "Error loading product:",
                err
            );

            setError(
                err.message ||
                "Something went wrong."
            );

            setProduct(null);


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // QUANTITY
    // ==========================================

    const increaseQuantity = () => {

        const stock =
            Number(product?.stock || 0);


        // If stock is available,
        // don't allow quantity above stock.

        if (
            stock > 0 &&
            quantity >= stock
        ) {

            return;

        }


        setQuantity(
            (current) =>
                current + 1
        );

    };


    const decreaseQuantity = () => {

        setQuantity(
            (current) =>
                current > 1
                    ? current - 1
                    : 1
        );

    };


    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart = () => {

        if (!product) {
            return;
        }


        // ==========================================
        // CHECK STOCK
        // ==========================================

        const stock =
            Number(product.stock || 0);


        if (
            stock > 0 &&
            quantity > stock
        ) {

            alert(
                `Only ${stock} items are available.`
            );

            return;

        }


        // ==========================================
        // ADD PRODUCT TO CART
        // ==========================================

        for (
            let i = 0;
            i < quantity;
            i++
        ) {

            addToCart(product);

        }


        setAdded(true);


        // ==========================================
        // GO TO CART
        // ==========================================

        setTimeout(() => {

            navigate("/cart");

        }, 300);

    };


    // ==========================================
    // FORMAT PRICE
    // ==========================================

    const formatPrice = (price) => {

        return Number(
            price || 0
        ).toLocaleString("en-IN");

    };


    // ==========================================
    // IMAGE URL
    // ==========================================

    const getImageUrl = () => {

        if (
            product?.thumbnail &&
            typeof product.thumbnail === "string" &&
            product.thumbnail.trim()
        ) {

            return product.thumbnail.trim();

        }


        return "https://placehold.co/700x900?text=No+Image";

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

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
                        min-h-[60vh]
                        flex
                        items-center
                        justify-center
                    "
                >

                    <p
                        className="
                            font-mono
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-[#5F6B4A]
                        "
                    >
                        Loading product...
                    </p>

                </main>


                <Footer />

            </div>

        );

    }


    // ==========================================
    // PRODUCT NOT FOUND
    // ==========================================

    if (!product) {

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
                        min-h-[65vh]
                        flex
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                    "
                >

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
                        Norden / Product
                    </p>


                    <h1
                        className="
                            font-display
                            text-4xl
                            md:text-6xl
                            mb-5
                        "
                    >
                        Product Not Found
                    </h1>


                    {error && (

                        <p
                            className="
                                text-[#9C4A2E]
                                max-w-md
                                leading-relaxed
                                mb-4
                            "
                        >
                            {error}
                        </p>

                    )}


                    <p
                        className="
                            text-[#4a4740]
                            max-w-md
                            leading-relaxed
                            mb-8
                        "
                    >
                        This product may have been
                        removed or is no longer
                        available.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="
                            px-8
                            py-4
                            bg-[#201E1B]
                            text-[#F1ECE1]
                            uppercase
                            tracking-widest
                            text-xs
                            hover:bg-[#5F6B4A]
                            transition
                        "
                    >
                        Back to Shop
                    </button>

                </main>


                <Footer />

            </div>

        );

    }


    // ==========================================
    // STOCK
    // ==========================================

    const stock =
        Number(product.stock || 0);

    const isOutOfStock =
        stock === 0 &&
        product.stock !== null &&
        product.stock !== undefined;


    // ==========================================
    // MAIN PRODUCT PAGE
    // ==========================================

    return (

        <div
            className="min-h-screen"
            style={{
                background: "#F1ECE1",
                color: "#201E1B",
            }}
        >

            {/* ==================================
                HEADER
            ================================== */}

            <Header />


            {/* ==================================
                MAIN
            ================================== */}

            <main
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    md:px-10
                    py-10
                    md:py-16
                "
            >

                {/* ==================================
                    BACK BUTTON
                ================================== */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(-1)
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        font-mono
                        text-xs
                        uppercase
                        tracking-[0.15em]
                        text-[#5F6B4A]
                        hover:text-[#201E1B]
                        transition
                        mb-10
                    "
                >

                    <ArrowLeft size={15} />

                    Back

                </button>


                {/* ==================================
                    PRODUCT
                ================================== */}

                <div
                    className="
                        grid
                        lg:grid-cols-2
                        gap-8
                        lg:gap-16
                    "
                >

                    {/* ==================================
                        PRODUCT IMAGE
                    ================================== */}

                    <div
                        className="
                            aspect-[3/4]
                            overflow-hidden
                            bg-[#DED7C8]
                        "
                    >

                        <img
                            src={getImageUrl()}
                            alt={
                                product.title ||
                                "Product"
                            }
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                            loading="eager"
                            onError={(e) => {

                                console.error(
                                    "Product image failed:",
                                    product.thumbnail
                                );


                                e.currentTarget.onerror =
                                    null;


                                e.currentTarget.src =
                                    "https://placehold.co/700x900?text=Image+Not+Found";

                            }}
                        />

                    </div>


                    {/* ==================================
                        PRODUCT INFORMATION
                    ================================== */}

                    <div
                        className="
                            flex
                            flex-col
                            justify-center
                            lg:py-10
                        "
                    >

                        {/* ==================================
                            CATEGORY
                        ================================== */}

                        <p
                            className="
                                font-mono
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-[#5F6B4A]
                                mb-4
                            "
                        >
                            {product.category ||
                                "Collection"}
                        </p>


                        {/* ==================================
                            BRAND
                        ================================== */}

                        {product.brand && (

                            <p
                                className="
                                    text-sm
                                    text-[#6b675f]
                                    mb-3
                                "
                            >
                                {product.brand}
                            </p>

                        )}


                        {/* ==================================
                            TITLE
                        ================================== */}

                        <h1
                            className="
                                font-display
                                text-4xl
                                md:text-5xl
                                lg:text-6xl
                                leading-tight
                            "
                        >
                            {product.title}
                        </h1>


                        {/* ==================================
                            PRICE
                        ================================== */}

                        <p
                            className="
                                font-mono
                                text-xl
                                mt-6
                            "
                        >
                            ₹
                            {formatPrice(
                                product.price
                            )}
                        </p>


                        {/* ==================================
                            RATING
                        ================================== */}

                        {product.rating !==
                            null &&
                            product.rating !==
                            undefined && (

                                <p
                                    className="
                                        text-sm
                                        text-[#5F6B4A]
                                        mt-3
                                    "
                                >
                                    ★{" "}
                                    {product.rating}
                                </p>

                            )}


                        {/* ==================================
                            LINE
                        ================================== */}

                        <div
                            className="
                                border-t
                                border-[#C8C0B0]
                                my-8
                            "
                        />


                        {/* ==================================
                            DESCRIPTION
                        ================================== */}

                        <div className="mb-8">

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5F6B4A]
                                    mb-3
                                "
                            >
                                Description
                            </p>


                            <p
                                className="
                                    text-[#4a4740]
                                    leading-7
                                    max-w-xl
                                "
                            >
                                {product.description ||
                                    "A timeless piece designed for everyday wear. Crafted with attention to detail and made to complement your wardrobe."}
                            </p>

                        </div>


                        {/* ==================================
                            STOCK
                        ================================== */}

                        {product.stock !==
                            null &&
                            product.stock !==
                            undefined && (

                                <div className="mb-6">

                                    <p
                                        className="
                                            font-mono
                                            text-[10px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-[#5F6B4A]
                                            mb-2
                                        "
                                    >
                                        Availability
                                    </p>


                                    {stock > 0 ? (

                                        <p
                                            className="
                                                text-sm
                                                text-[#4a4740]
                                            "
                                        >
                                            {stock}{" "}
                                            items available
                                        </p>

                                    ) : (

                                        <p
                                            className="
                                                text-sm
                                                text-[#9C4A2E]
                                            "
                                        >
                                            Out of stock
                                        </p>

                                    )}

                                </div>

                            )}


                        {/* ==================================
                            QUANTITY
                        ================================== */}

                        <div className="mb-6">

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5F6B4A]
                                    mb-3
                                "
                            >
                                Quantity
                            </p>


                            <div
                                className="
                                    inline-flex
                                    items-center
                                    border
                                    border-[#BEB6A6]
                                "
                            >

                                {/* MINUS */}

                                <button
                                    type="button"
                                    onClick={
                                        decreaseQuantity
                                    }
                                    className="
                                        w-11
                                        h-11
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-[#DED7C8]
                                        transition
                                    "
                                    aria-label="Decrease quantity"
                                >

                                    <Minus
                                        size={15}
                                    />

                                </button>


                                {/* NUMBER */}

                                <span
                                    className="
                                        w-12
                                        text-center
                                        font-mono
                                        text-sm
                                    "
                                >
                                    {quantity}
                                </span>


                                {/* PLUS */}

                                <button
                                    type="button"
                                    onClick={
                                        increaseQuantity
                                    }
                                    disabled={
                                        stock > 0 &&
                                        quantity >= stock
                                    }
                                    className="
                                        w-11
                                        h-11
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-[#DED7C8]
                                        disabled:opacity-30
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                    aria-label="Increase quantity"
                                >

                                    <Plus
                                        size={15}
                                    />

                                </button>

                            </div>

                        </div>


                        {/* ==================================
                            ADD TO CART
                        ================================== */}

                        <button
                            type="button"
                            onClick={
                                handleAddToCart
                            }
                            disabled={
                                isOutOfStock
                            }
                            className="
                                w-full
                                py-5
                                px-6
                                flex
                                items-center
                                justify-center
                                gap-3
                                bg-[#201E1B]
                                text-[#F1ECE1]
                                font-mono
                                text-xs
                                uppercase
                                tracking-[0.2em]
                                hover:bg-[#5F6B4A]
                                disabled:bg-[#8b867d]
                                disabled:cursor-not-allowed
                                transition-colors
                                duration-300
                            "
                        >

                            <ShoppingBag
                                size={17}
                            />


                            {isOutOfStock
                                ? "Out of Stock"
                                : added
                                    ? "Added to Cart"
                                    : "Add to Cart"}

                        </button>


                        {/* ==================================
                            BUY INFO
                        ================================== */}

                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-4
                                mt-8
                                pt-6
                                border-t
                                border-[#C8C0B0]
                            "
                        >

                            <div>

                                <p
                                    className="
                                        font-mono
                                        text-[10px]
                                        uppercase
                                        tracking-wide
                                        text-[#5F6B4A]
                                        mb-2
                                    "
                                >
                                    Shipping
                                </p>


                                <p
                                    className="
                                        text-xs
                                        text-[#4a4740]
                                    "
                                >
                                    Free shipping
                                </p>

                            </div>


                            <div>

                                <p
                                    className="
                                        font-mono
                                        text-[10px]
                                        uppercase
                                        tracking-wide
                                        text-[#5F6B4A]
                                        mb-2
                                    "
                                >
                                    Returns
                                </p>


                                <p
                                    className="
                                        text-xs
                                        text-[#4a4740]
                                    "
                                >
                                    Easy returns
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    PRODUCT INFORMATION
                ================================== */}

                <section
                    className="
                        mt-20
                        pt-10
                        border-t
                        border-[#C8C0B0]
                    "
                >

                    <div
                        className="
                            grid
                            md:grid-cols-3
                            gap-8
                        "
                    >

                        {/* DETAILS */}

                        <div>

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5F6B4A]
                                    mb-3
                                "
                            >
                                Product
                            </p>


                            <p
                                className="
                                    text-sm
                                    leading-6
                                    text-[#4a4740]
                                "
                            >
                                {product.title}
                            </p>

                        </div>


                        {/* BRAND */}

                        <div>

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5F6B4A]
                                    mb-3
                                "
                            >
                                Brand
                            </p>


                            <p
                                className="
                                    text-sm
                                    leading-6
                                    text-[#4a4740]
                                "
                            >
                                {product.brand ||
                                    "Norden"}
                            </p>

                        </div>


                        {/* CATEGORY */}

                        <div>

                            <p
                                className="
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5F6B4A]
                                    mb-3
                                "
                            >
                                Category
                            </p>


                            <p
                                className="
                                    text-sm
                                    leading-6
                                    text-[#4a4740]
                                    capitalize
                                "
                            >
                                {product.category ||
                                    "Collection"}
                            </p>

                        </div>

                    </div>

                </section>

            </main>


            {/* ==================================
                FOOTER
            ================================== */}

            <Footer />

        </div>

    );

}


export default ProductDetails;