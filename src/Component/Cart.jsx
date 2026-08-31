import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

import {
    Minus,
    Plus,
    Trash2,
    ArrowLeft,
} from "lucide-react";


function Cart() {

    const navigate = useNavigate();

    const {
        cartItems,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();


    // ==========================================
    // FORMAT PRICE
    // ==========================================

    const formatPrice = (price) => {

        return Number(price || 0).toLocaleString(
            "en-IN"
        );

    };


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cartItems.length === 0) {

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
                        Norden / Cart
                    </p>


                    <h1
                        className="
                            font-display
                            text-4xl
                            md:text-6xl
                            mb-5
                        "
                    >
                        Your Cart Is Empty
                    </h1>


                    <p
                        className="
                            text-[#4a4740]
                            max-w-md
                            leading-relaxed
                            mb-8
                        "
                    >
                        You haven't added anything
                        to your cart yet. Explore
                        our collection and find
                        something you love.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/women")
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
                        Continue Shopping
                    </button>

                </main>


                <Footer />

            </div>

        );
    }


    // ==========================================
    // CART PAGE
    // ==========================================

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
                    py-12
                    md:py-16
                "
            >

                {/* ==================================
                    PAGE HEADER
                ================================== */}

                <div
                    className="
                        flex
                        items-end
                        justify-between
                        gap-5
                        mb-10
                    "
                >

                    <div>

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
                            Norden / Cart
                        </p>


                        <h1
                            className="
                                font-display
                                text-5xl
                                md:text-7xl
                            "
                        >
                            Your Cart
                        </h1>

                    </div>


                    {/* ITEM COUNT */}

                    <p
                        className="
                            font-mono
                            text-xs
                            uppercase
                            tracking-wide
                            text-[#5F6B4A]
                            pb-2
                        "
                    >
                        {cartItems.reduce(
                            (total, item) =>
                                total +
                                Number(
                                    item.quantity || 0
                                ),
                            0
                        )}{" "}
                        Items
                    </p>

                </div>


                {/* ==================================
                    BACK TO SHOP
                ================================== */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/women")
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        font-mono
                        text-xs
                        uppercase
                        tracking-widest
                        text-[#5F6B4A]
                        hover:text-[#201E1B]
                        transition
                        mb-10
                    "
                >

                    <ArrowLeft size={14} />

                    Continue Shopping

                </button>


                {/* ==================================
                    CART LAYOUT
                ================================== */}

                <div
                    className="
                        grid
                        lg:grid-cols-[1fr_380px]
                        gap-10
                        lg:gap-16
                    "
                >

                    {/* ==================================
                        CART PRODUCTS
                    ================================== */}

                    <section>

                        {cartItems.map(
                            (item) => (

                                <div
                                    key={item.id}
                                    className="
                                        border-t
                                        border-[#C8C0B0]
                                        py-6
                                        flex
                                        gap-4
                                        sm:gap-6
                                    "
                                >

                                    {/* PRODUCT IMAGE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/product/${item.id}`
                                            )
                                        }
                                        className="
                                            shrink-0
                                        "
                                    >

                                        <img
                                            src={
                                                item.thumbnail
                                            }
                                            alt={
                                                item.title
                                            }
                                            className="
                                                w-24
                                                h-32
                                                sm:w-32
                                                sm:h-40
                                                object-cover
                                                bg-[#DED7C8]
                                            "
                                            onError={(e) => {

                                                e.currentTarget.src =
                                                    "https://via.placeholder.com/400x500?text=Product";

                                            }}
                                        />

                                    </button>


                                    {/* PRODUCT INFORMATION */}

                                    <div
                                        className="
                                            flex-1
                                            min-w-0
                                            flex
                                            flex-col
                                        "
                                    >

                                        {/* CATEGORY */}

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
                                            {item.category ||
                                                "Women"}
                                        </p>


                                        {/* TITLE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/product/${item.id}`
                                                )
                                            }
                                            className="
                                                text-left
                                                text-base
                                                sm:text-lg
                                                hover:opacity-60
                                                transition
                                            "
                                        >
                                            {item.title}
                                        </button>


                                        {/* PRICE */}

                                        <p
                                            className="
                                                font-mono
                                                text-sm
                                                mt-2
                                            "
                                        >
                                            ₹
                                            {formatPrice(
                                                item.price
                                            )}
                                        </p>


                                        {/* QUANTITY */}

                                        <div
                                            className="
                                                mt-auto
                                                pt-5
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                            "
                                        >

                                            {/* QUANTITY BOX */}

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    border
                                                    border-[#BEB6A6]
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                    className="
                                                        w-8
                                                        h-8
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-[#DED7C8]
                                                        transition
                                                    "
                                                    aria-label="Decrease quantity"
                                                >

                                                    <Minus
                                                        size={13}
                                                    />

                                                </button>


                                                <span
                                                    className="
                                                        w-8
                                                        text-center
                                                        font-mono
                                                        text-xs
                                                    "
                                                >
                                                    {
                                                        item.quantity
                                                    }
                                                </span>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                    className="
                                                        w-8
                                                        h-8
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-[#DED7C8]
                                                        transition
                                                    "
                                                    aria-label="Increase quantity"
                                                >

                                                    <Plus
                                                        size={13}
                                                    />

                                                </button>

                                            </div>


                                            {/* REMOVE */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.id
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    font-mono
                                                    text-[10px]
                                                    uppercase
                                                    tracking-widest
                                                    text-[#9C4A2E]
                                                    hover:opacity-60
                                                    transition
                                                "
                                            >

                                                <Trash2
                                                    size={13}
                                                />

                                                <span className="hidden sm:inline">
                                                    Remove
                                                </span>

                                            </button>

                                        </div>

                                    </div>


                                    {/* ITEM TOTAL */}

                                    <div
                                        className="
                                            hidden
                                            sm:block
                                            font-mono
                                            text-sm
                                            whitespace-nowrap
                                        "
                                    >
                                        ₹
                                        {formatPrice(
                                            Number(
                                                item.price
                                            ) *
                                            Number(
                                                item.quantity
                                            )
                                        )}
                                    </div>

                                </div>

                            )
                        )}

                    </section>


                    {/* ==================================
                        ORDER SUMMARY
                    ================================== */}

                    <aside>

                        <div
                            className="
                                bg-[#DED7C8]
                                p-6
                                md:p-8
                                lg:sticky
                                lg:top-24
                            "
                        >

                            <h2
                                className="
                                    font-display
                                    text-2xl
                                    md:text-3xl
                                    mb-7
                                "
                            >
                                Order Summary
                            </h2>


                            {/* SUBTOTAL */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-[#BEB6A6]
                                    pb-4
                                "
                            >

                                <span className="text-sm">
                                    Subtotal
                                </span>

                                <span
                                    className="
                                        font-mono
                                        text-sm
                                    "
                                >
                                    ₹
                                    {formatPrice(
                                        cartTotal
                                    )}
                                </span>

                            </div>


                            {/* SHIPPING */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    py-4
                                    border-b
                                    border-[#BEB6A6]
                                "
                            >

                                <span className="text-sm">
                                    Shipping
                                </span>

                                <span
                                    className="
                                        font-mono
                                        text-xs
                                        uppercase
                                    "
                                >
                                    Free
                                </span>

                            </div>


                            {/* TOTAL */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    py-5
                                "
                            >

                                <span
                                    className="
                                        font-display
                                        text-xl
                                    "
                                >
                                    Total
                                </span>

                                <span
                                    className="
                                        font-mono
                                        text-lg
                                    "
                                >
                                    ₹
                                    {formatPrice(
                                        cartTotal
                                    )}
                                </span>

                            </div>


                            {/* CHECKOUT */}

                            <button
                                type="button"
                                onClick={() =>
                                    alert(
                                        "Checkout coming soon!"
                                    )
                                }
                                className="
                                    w-full
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
                                Proceed to Checkout
                            </button>


                            {/* CLEAR CART */}

                            <button
                                type="button"
                                onClick={clearCart}
                                className="
                                    w-full
                                    mt-4
                                    py-3
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-widest
                                    text-[#9C4A2E]
                                    hover:opacity-60
                                    transition
                                "
                            >
                                Clear Cart
                            </button>


                            {/* NOTE */}

                            <p
                                className="
                                    text-[11px]
                                    leading-5
                                    text-[#6b675f]
                                    text-center
                                    mt-5
                                "
                            >
                                Taxes and delivery
                                charges are calculated
                                at checkout.
                            </p>

                        </div>

                    </aside>

                </div>

            </main>


            {/* ==================================
                FOOTER
            ================================== */}

            <Footer />

        </div>

    );
}


export default Cart;