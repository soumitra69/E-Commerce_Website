import { useState } from "react";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    Menu,
    X,
    Search,
    ShoppingBag,
    UserRound,
    LogOut,
    Plus,
    Minus,
} from "lucide-react";

import { useCart } from "../Context/CartContext";


function Header() {

    // ==================================================
    // CART
    // ==================================================

    const {
        cartItems,
        cartCount,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartTotal,
    } = useCart();


    // ==================================================
    // STATES
    // ==================================================

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [searchOpen, setSearchOpen] =
        useState(false);

    const [cartOpen, setCartOpen] =
        useState(false);


    // ==================================================
    // SEARCH PARAMS
    // ==================================================

    const [searchParams, setSearchParams] =
        useSearchParams();


    const navigate = useNavigate();


    const search =
        searchParams.get("search") || "";


    // ==================================================
    // FORMAT PRICE
    // ==================================================

    const formatPrice = (price) => {

        return Number(
            price || 0
        ).toLocaleString("en-IN");

    };


    // ==================================================
    // LOGOUT
    // ==================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setMenuOpen(false);

        setSearchOpen(false);

        setCartOpen(false);


        const params =
            new URLSearchParams(
                searchParams
            );

        params.delete("search");

        setSearchParams(params);

        navigate("/");

    };


    // ==================================================
    // TOGGLE MOBILE MENU
    // ==================================================

    const handleMenuToggle = () => {

        setMenuOpen(
            (previous) => !previous
        );

        setSearchOpen(false);

        setCartOpen(false);

    };


    // ==================================================
    // TOGGLE SEARCH
    // ==================================================

    const handleSearchToggle = () => {

        setSearchOpen(
            (previous) => !previous
        );

        setMenuOpen(false);

        setCartOpen(false);

    };


    // ==================================================
    // TOGGLE CART
    // ==================================================

    const handleCartToggle = () => {

        setCartOpen(
            (previous) => !previous
        );

        setMenuOpen(false);

        setSearchOpen(false);

    };


    // ==================================================
    // GO TO CART
    // ==================================================

    const goToCart = () => {

        setCartOpen(false);

        setMenuOpen(false);

        navigate("/cart");

    };


    // ==================================================
    // LIVE SEARCH
    // ==================================================

    const handleSearch = (e) => {

        const value =
            e.target.value;


        const params =
            new URLSearchParams(
                searchParams
            );


        if (value.trim() === "") {

            params.delete("search");

        } else {

            params.set(
                "search",
                value
            );

        }


        setSearchParams(params);

    };


    // ==================================================
    // CLEAR SEARCH
    // ==================================================

    const clearSearch = () => {

        const params =
            new URLSearchParams(
                searchParams
            );

        params.delete("search");

        setSearchParams(params);

    };


    // ==================================================
    // CLOSE SEARCH
    // ==================================================

    const closeSearch = () => {

        setSearchOpen(false);

        const params =
            new URLSearchParams(
                searchParams
            );

        params.delete("search");

        setSearchParams(params);

    };


    // ==================================================
    // NAVIGATION
    // ==================================================

    const handleNavigation = () => {

        setMenuOpen(false);

        setSearchOpen(false);

        setCartOpen(false);

    };


    // ==================================================
    // HEADER
    // ==================================================

    return (

        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-black/10
                bg-[#F1ECE1]/95
                backdrop-blur
            "
        >

            {/* ==================================================
                MAIN HEADER
            ================================================== */}

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    md:px-10
                    h-14
                    sm:h-16
                    flex
                    items-center
                    justify-between
                "
            >

                {/* ==================================================
                    MOBILE MENU
                ================================================== */}

                <button
                    type="button"
                    className="
                        md:hidden
                        hover:opacity-60
                        transition-opacity
                    "
                    onClick={handleMenuToggle}
                    aria-label="Toggle menu"
                >

                    {menuOpen ? (
                        <X size={20} />
                    ) : (
                        <Menu size={20} />
                    )}

                </button>


                {/* ==================================================
                    LOGO
                ================================================== */}

                <Link
                    to="/dashboard"
                    onClick={handleNavigation}
                    className="
                        font-display
                        text-lg
                        sm:text-xl
                        tracking-tight
                        select-none
                        hover:opacity-60
                        transition-opacity
                    "
                >
                    NORDEN
                </Link>


                {/* ==================================================
                    DESKTOP NAVIGATION
                ================================================== */}

                <nav
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-6
                        lg:gap-8
                        text-sm
                        font-mono
                        uppercase
                        tracking-wide
                    "
                >

                    <Link
                        to="/men"
                        onClick={handleNavigation}
                        className="
                            hover:opacity-60
                            transition-opacity
                        "
                    >
                        Men
                    </Link>


                    <Link
                        to="/women"
                        onClick={handleNavigation}
                        className="
                            hover:opacity-60
                            transition-opacity
                        "
                    >
                        Women
                    </Link>


                    <Link
                        to="/accessories"
                        onClick={handleNavigation}
                        className="
                            hover:opacity-60
                            transition-opacity
                        "
                    >
                        Accessories
                    </Link>


                    <Link
                        to="/journal"
                        onClick={handleNavigation}
                        className="
                            hover:opacity-60
                            transition-opacity
                        "
                    >
                        Journal
                    </Link>

                </nav>


                {/* ==================================================
                    RIGHT SIDE
                ================================================== */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        sm:gap-5
                    "
                >

                    {/* ==================================================
                        SEARCH
                    ================================================== */}

                    <button
                        type="button"
                        aria-label={
                            searchOpen
                                ? "Close search"
                                : "Open search"
                        }
                        onClick={
                            searchOpen
                                ? closeSearch
                                : handleSearchToggle
                        }
                        className="
                            hover:opacity-60
                            transition-opacity
                        "
                    >

                        {searchOpen ? (
                            <X size={18} />
                        ) : (
                            <Search size={18} />
                        )}

                    </button>


                    {/* ==================================================
                        SHOPPING BAG
                    ================================================== */}

                    <button
                        type="button"
                        aria-label="Account"
                        onClick={() => navigate("/account")}
                        className="hover:opacity-60 transition-opacity"
                    >
                        <UserRound size={18} />
                    </button>

                    <div className="relative">

                        <button
                            type="button"
                            aria-label="Shopping cart"
                            onClick={handleCartToggle}
                            className="
                                relative
                                hover:opacity-60
                                transition-opacity
                            "
                        >

                            <ShoppingBag
                                size={19}
                            />


                            {/* CART COUNT */}

                            {cartCount > 0 && (

                                <span
                                    className="
                                        absolute
                                        -top-2
                                        -right-2
                                        min-w-4
                                        h-4
                                        px-1
                                        text-[9px]
                                        font-mono
                                        bg-[#9C4A2E]
                                        text-[#F1ECE1]
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    {cartCount}
                                </span>

                            )}

                        </button>


                        {/* ==================================================
                            CART PREVIEW
                        ================================================== */}

                        {cartOpen && (

                            <div
                                className="
                                    absolute
                                    right-0
                                    top-10
                                    w-[320px]
                                    sm:w-[380px]
                                    bg-[#F1ECE1]
                                    border
                                    border-black/10
                                    shadow-xl
                                    z-[100]
                                "
                            >

                                {/* ==========================================
                                    CART HEADER
                                ========================================== */}

                                <div
                                    className="
                                        px-5
                                        py-4
                                        border-b
                                        border-black/10
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <div>

                                        <p
                                            className="
                                                font-mono
                                                text-[10px]
                                                uppercase
                                                tracking-[0.2em]
                                                text-[#5F6B4A]
                                            "
                                        >
                                            Norden
                                        </p>


                                        <h3
                                            className="
                                                font-display
                                                text-xl
                                                mt-1
                                            "
                                        >
                                            Your Cart
                                        </h3>

                                    </div>


                                    <span
                                        className="
                                            font-mono
                                            text-xs
                                            text-[#5F6B4A]
                                        "
                                    >
                                        {cartCount}{" "}
                                        {cartCount === 1
                                            ? "item"
                                            : "items"}
                                    </span>

                                </div>


                                {/* ==========================================
                                    EMPTY CART
                                ========================================== */}

                                {cartItems.length === 0 && (

                                    <div
                                        className="
                                            px-5
                                            py-10
                                            text-center
                                        "
                                    >

                                        <ShoppingBag
                                            size={28}
                                            className="
                                                mx-auto
                                                mb-4
                                                opacity-40
                                            "
                                        />


                                        <p
                                            className="
                                                font-display
                                                text-xl
                                                mb-2
                                            "
                                        >
                                            Cart is empty
                                        </p>


                                        <p
                                            className="
                                                text-xs
                                                text-[#6b675f]
                                            "
                                        >
                                            Add something
                                            from our
                                            collection.
                                        </p>

                                    </div>

                                )}


                                {/* ==========================================
                                    CART PRODUCTS
                                ========================================== */}

                                {cartItems.length > 0 && (

                                    <>

                                        <div
                                            className="
                                                max-h-[360px]
                                                overflow-y-auto
                                            "
                                        >

                                            {cartItems.map(
                                                (item) => (

                                                    <div
                                                        key={
                                                            item.id
                                                        }
                                                        className="
                                                            px-5
                                                            py-4
                                                            border-b
                                                            border-black/10
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                gap-3
                                                            "
                                                        >

                                                            {/* PRODUCT IMAGE */}

                                                            <button
                                                                type="button"
                                                                onClick={() => {

                                                                    setCartOpen(
                                                                        false
                                                                    );

                                                                    navigate(
                                                                        `/product/${item.id}`
                                                                    );

                                                                }}
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
                                                                        w-16
                                                                        h-20
                                                                        object-cover
                                                                        bg-[#DED7C8]
                                                                    "
                                                                    onError={(
                                                                        e
                                                                    ) => {

                                                                        e.currentTarget.src =
                                                                            "https://via.placeholder.com/100x120?text=Product";

                                                                    }}
                                                                />

                                                            </button>


                                                            {/* PRODUCT INFO */}

                                                            <div
                                                                className="
                                                                    flex-1
                                                                    min-w-0
                                                                "
                                                            >

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {

                                                                        setCartOpen(
                                                                            false
                                                                        );

                                                                        navigate(
                                                                            `/product/${item.id}`
                                                                        );

                                                                    }}
                                                                    className="
                                                                        text-left
                                                                        w-full
                                                                        text-sm
                                                                        truncate
                                                                        hover:opacity-60
                                                                    "
                                                                >
                                                                    {
                                                                        item.title
                                                                    }
                                                                </button>


                                                                <p
                                                                    className="
                                                                        font-mono
                                                                        text-xs
                                                                        mt-1
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
                                                                        flex
                                                                        items-center
                                                                        justify-between
                                                                        mt-3
                                                                    "
                                                                >

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
                                                                                w-6
                                                                                h-6
                                                                                flex
                                                                                items-center
                                                                                justify-center
                                                                                hover:bg-[#DED7C8]
                                                                            "
                                                                        >
                                                                            <Minus
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        </button>


                                                                        <span
                                                                            className="
                                                                                w-7
                                                                                text-center
                                                                                font-mono
                                                                                text-[10px]
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
                                                                                w-6
                                                                                h-6
                                                                                flex
                                                                                items-center
                                                                                justify-center
                                                                                hover:bg-[#DED7C8]
                                                                            "
                                                                        >
                                                                            <Plus
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        </button>

                                                                    </div>


                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            removeFromCart(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="
                                                                            font-mono
                                                                            text-[9px]
                                                                            uppercase
                                                                            tracking-wide
                                                                            text-[#9C4A2E]
                                                                            hover:opacity-60
                                                                        "
                                                                    >
                                                                        Remove
                                                                    </button>

                                                                </div>

                                                            </div>


                                                            {/* ITEM TOTAL */}

                                                            <div
                                                                className="
                                                                    hidden
                                                                    sm:block
                                                                    font-mono
                                                                    text-xs
                                                                    whitespace-nowrap
                                                                "
                                                            >
                                                                ₹
                                                                {formatPrice(
                                                                    Number(
                                                                        item.price ||
                                                                        0
                                                                    ) *
                                                                    Number(
                                                                        item.quantity ||
                                                                        0
                                                                    )
                                                                )}
                                                            </div>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>


                                        {/* ==========================================
                                            CART TOTAL
                                        ========================================== */}

                                        <div
                                            className="
                                                px-5
                                                py-4
                                                border-b
                                                border-black/10
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                "
                                            >

                                                <span
                                                    className="
                                                        font-display
                                                        text-lg
                                                    "
                                                >
                                                    Total
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

                                        </div>


                                        {/* ==========================================
                                            CART BUTTONS
                                        ========================================== */}

                                        <div
                                            className="
                                                p-5
                                                grid
                                                grid-cols-2
                                                gap-3
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={
                                                    goToCart
                                                }
                                                className="
                                                    py-3
                                                    border
                                                    border-[#201E1B]
                                                    text-[#201E1B]
                                                    font-mono
                                                    text-[10px]
                                                    uppercase
                                                    tracking-widest
                                                    hover:bg-[#DED7C8]
                                                    transition
                                                "
                                            >
                                                View Cart
                                            </button>


                                            <button
                                                type="button"
                                                onClick={
                                                    goToCart
                                                }
                                                className="
                                                    py-3
                                                    bg-[#201E1B]
                                                    text-[#F1ECE1]
                                                    font-mono
                                                    text-[10px]
                                                    uppercase
                                                    tracking-widest
                                                    hover:bg-[#5F6B4A]
                                                    transition
                                                "
                                            >
                                                Checkout
                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        )}

                    </div>


                    {/* ==================================================
                        LOGOUT
                    ================================================== */}

                    {/*
                    <button
                        type="button"
                        onClick={handleLogout}
                        aria-label="Logout"
                        className="
                            hover:opacity-60
                            transition-opacity
                        "
                    >
                        <LogOut size={18} />
                    </button>
                    */}

                </div>

            </div>


            {/* ==================================================
                SEARCH BAR
            ================================================== */}

            {searchOpen && (

                <div
                    className="
                        border-t
                        border-black/10
                        bg-[#F1ECE1]
                    "
                >

                    <div
                        className="
                            max-w-7xl
                            mx-auto
                            px-4
                            sm:px-6
                            md:px-10
                            py-4
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                border-b
                                border-black
                                pb-2
                            "
                        >

                            <Search
                                size={19}
                                className="shrink-0"
                            />


                            <input
                                type="text"
                                autoFocus
                                value={search}
                                onChange={
                                    handleSearch
                                }
                                placeholder="Search products..."
                                aria-label="Search products"
                                className="
                                    flex-1
                                    min-w-0
                                    bg-transparent
                                    outline-none
                                    text-sm
                                    sm:text-base
                                "
                            />


                            {search && (

                                <button
                                    type="button"
                                    onClick={
                                        clearSearch
                                    }
                                    aria-label="Clear search"
                                    className="
                                        shrink-0
                                        hover:opacity-60
                                    "
                                >

                                    <X size={16} />

                                </button>

                            )}

                        </div>


                        {search && (

                            <p
                                className="
                                    mt-2
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-wide
                                    text-[#5F6B4A]
                                "
                            >
                                Searching: "{search}"
                            </p>

                        )}

                    </div>

                </div>

            )}


            {/* ==================================================
                MOBILE NAVIGATION
            ================================================== */}

            {menuOpen && (

                <nav
                    className="
                        md:hidden
                        border-t
                        border-black/10
                        bg-[#F1ECE1]
                        px-4
                        sm:px-6
                        py-5
                        flex
                        flex-col
                        gap-5
                        text-sm
                        font-mono
                        uppercase
                        tracking-wide
                    "
                >

                    <Link
                        to="/men"
                        onClick={
                            handleNavigation
                        }
                        className="
                            hover:opacity-60
                        "
                    >
                        Men
                    </Link>


                    <Link
                        to="/women"
                        onClick={
                            handleNavigation
                        }
                        className="
                            hover:opacity-60
                        "
                    >
                        Women
                    </Link>


                    <Link
                        to="/accessories"
                        onClick={
                            handleNavigation
                        }
                        className="
                            hover:opacity-60
                        "
                    >
                        Accessories
                    </Link>


                    <Link
                        to="/journal"
                        onClick={
                            handleNavigation
                        }
                        className="
                            hover:opacity-60
                        "
                    >
                        Journal
                    </Link>

                    {/* MOBILE CART */}

                    <button
                        type="button"
                        onClick={goToCart}
                        className="
                            flex
                            items-center
                            justify-between
                            text-left
                            hover:opacity-60
                        "
                    >

                        <span>
                            Cart
                        </span>


                        <span
                            className="
                                font-mono
                                text-xs
                                text-[#5F6B4A]
                            "
                        >
                            {cartCount}
                        </span>

                    </button>


                    {/* MOBILE LOGOUT */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            flex
                            items-center
                            gap-2
                            text-left
                            hover:opacity-60
                        "
                    >

                        <LogOut size={16} />

                        Logout

                    </button>

                </nav>

            )}

        </header>

    );

}


export default Header;
