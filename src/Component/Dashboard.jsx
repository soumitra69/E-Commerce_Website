import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";
import { supabase } from "../lib/supabase";


// ==========================================================
// DEFAULT HOME PAGE DATA
// ==========================================================

const defaultDashboard = {
    announcement: "NEW SEASON — TIMELESS ESSENTIALS",

    heroTitle: "Designed for everyday life.",

    heroSubtitle:
        "Thoughtful clothing, accessories and essentials made for modern living.",

    heroImage:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",

    primaryButtonText: "Shop Women",
    primaryButtonLink: "/women",

    secondaryButtonText: "Shop Men",
    secondaryButtonLink: "/men",

    sectionTitle: "Curated essentials",

    sectionSubtitle:
        "A considered collection of timeless pieces designed to be worn again and again.",

    sectionImage:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",

    footerText:
        "Norden — timeless essentials for everyday life.",
};


// ==========================================================
// SHOP BY CATEGORY DATA
// ==========================================================

const defaultCategories = [
    { id: "women", number: "01", title: "Women", subtitle: "Dresses, tops & everyday essentials", link: "/women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85", visible: true, sort_order: 0 },
    { id: "men", number: "02", title: "Men", subtitle: "Modern essentials for every day", link: "/men", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", visible: true, sort_order: 1 },
    { id: "accessories", number: "03", title: "Accessories", subtitle: "The finishing touches", link: "/accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=85", visible: true, sort_order: 2 },
    { id: "new-arrivals", number: "04", title: "New Arrivals", subtitle: "Fresh pieces, just in", link: "/women", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85", visible: true, sort_order: 3 },
];

// ==========================================================
// DASHBOARD
// ==========================================================

function Dashboard() {

    const [dashboard, setDashboard] =
        useState(defaultDashboard);

    const [products, setProducts] =
        useState([]);

    const [shopCategories, setShopCategories] =
        useState(defaultCategories);

    const [loading, setLoading] =
        useState(true);


    // ======================================================
    // LOAD HOME PAGE SETTINGS
    // ======================================================

    const loadDashboard = () => {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        "adminDashboard"
                    )
                );

            if (saved) {

                setDashboard({
                    ...defaultDashboard,
                    ...saved,
                });

            } else {

                setDashboard(
                    defaultDashboard
                );

            }

        } catch (error) {

            console.error(
                "Dashboard loading error:",
                error
            );

            setDashboard(
                defaultDashboard
            );
        }
    };


    // ======================================================
    // LOAD PRODUCTS
    // ======================================================

    const loadProducts = () => {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        "adminProducts"
                    )
                ) || [];

            const activeProducts =
                Array.isArray(saved)
                    ? saved.filter(
                        (product) =>
                            product.status !==
                            "Inactive"
                    )
                    : [];

            setProducts(
                activeProducts
            );

        } catch (error) {

            console.error(
                "Products loading error:",
                error
            );

            setProducts([]);
        }
    };


    // ======================================================
    // LOAD SHOP CATEGORIES FROM SUPABASE
    // ======================================================

    const loadShopCategories = async () => {
        try {
            const { data, error } = await supabase.from("shop_categories").select("*").eq("visible", true).order("sort_order", { ascending: true });
            if (error) throw error;
            if (Array.isArray(data) && data.length) {
                setShopCategories(data.map((item, index) => ({ id: item.id, number: item.number || String(index + 1).padStart(2, "0"), title: item.title || "", subtitle: item.subtitle || "", link: item.link || "/women", image: item.image_url || "", visible: item.visible !== false, sort_order: item.sort_order ?? index })));
                return;
            }

            const savedDashboard = JSON.parse(localStorage.getItem("adminDashboard"));
            setShopCategories(Array.isArray(savedDashboard?.shopCategories) ? savedDashboard.shopCategories : defaultCategories);
        } catch (error) { console.error("Shop categories loading error:", error); setShopCategories(defaultCategories); }
    };


    // ======================================================
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {

        loadDashboard();
        loadProducts();
        loadShopCategories();

        setLoading(false);


        // ADMIN HOME PAGE UPDATED

        window.addEventListener(
            "adminDashboardUpdated",
            loadDashboard
        );

        window.addEventListener(
            "adminDashboardUpdated",
            loadShopCategories
        );

        window.addEventListener(
            "storage",
            loadDashboard
        );

        window.addEventListener(
            "storage",
            loadShopCategories
        );

        window.addEventListener(
            "adminShopCategoriesUpdated",
            loadShopCategories
        );


        // ADMIN PRODUCTS UPDATED

        window.addEventListener(
            "adminProductsUpdated",
            loadProducts
        );


        // CLEANUP

        return () => {

            window.removeEventListener(
                "adminDashboardUpdated",
                loadDashboard
            );

            window.removeEventListener(
                "adminDashboardUpdated",
                loadShopCategories
            );

            window.removeEventListener(
                "storage",
                loadDashboard
            );

            window.removeEventListener(
                "storage",
                loadShopCategories
            );

            window.removeEventListener(
                "adminShopCategoriesUpdated",
                loadShopCategories
            );

            window.removeEventListener(
                "adminProductsUpdated",
                loadProducts
            );
        };

    }, []);


    // ======================================================
    // LINK HANDLER
    // ======================================================

    const getLink = (link) => {

        if (!link) {
            return "#";
        }

        return link;
    };


    // ======================================================
    // PRODUCTS FOR HOME
    // ======================================================

    const featuredProducts =
        products.slice(0, 8);


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-[#F1ECE1]
                    text-[#201E1B]
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
                    Loading Norden...
                </p>

            </div>

        );
    }


    // ======================================================
    // PAGE
    // ======================================================

    return (

        <div
            className="min-h-screen"
            style={{
                background: "#F1ECE1",
                color: "#201E1B",
            }}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <Header />


            {/* ==================================================
                ANNOUNCEMENT
            ================================================== */}

            {dashboard.announcement && (

                <div
                    className="
                        bg-[#5F6B4A]
                        text-white
                        text-center
                        py-3
                        px-4
                    "
                >

                    <p
                        className="
                            font-mono
                            text-[10px]
                            sm:text-xs
                            uppercase
                            tracking-[0.2em]
                        "
                    >
                        {dashboard.announcement}
                    </p>

                </div>

            )}


            {/* ==================================================
                HERO
            ================================================== */}

            <section
                className="
                    relative
                    min-h-[75vh]
                    md:min-h-[86vh]
                    overflow-hidden
                "
            >

                {/* HERO IMAGE */}

                {dashboard.heroImage && (

                    <img
                        src={dashboard.heroImage}
                        alt={dashboard.heroTitle}
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                        "
                        onError={(e) => {

                            e.currentTarget.style.display =
                                "none";

                        }}
                    />

                )}


                {/* OVERLAY */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-black/30
                    "
                />


                {/* HERO CONTENT */}

                <div
                    className="
                        relative
                        z-10
                        max-w-7xl
                        mx-auto
                        px-5
                        sm:px-8
                        md:px-10
                        min-h-[75vh]
                        md:min-h-[80vh]
                        flex
                        items-end
                        pb-14
                        md:pb-20
                    "
                >

                    <div
                        className="
                            max-w-3xl
                            text-white
                        "
                    >

                        {/* LABEL */}

                        <p
                            className="
                                font-mono
                                text-xs
                                uppercase
                                tracking-[0.25em]
                                mb-5
                            "
                        >
                            Norden / Collection
                        </p>


                        {/* TITLE */}

                        <h1
                            className="
                                font-display
                                text-5xl
                                sm:text-6xl
                                md:text-8xl
                                leading-[0.95]
                                tracking-tight
                            "
                        >
                            {dashboard.heroTitle}
                        </h1>


                        {/* SUBTITLE */}

                        <p
                            className="
                                mt-6
                                max-w-2xl
                                text-base
                                sm:text-lg
                                md:text-xl
                                leading-relaxed
                                text-white/90
                            "
                        >
                            {dashboard.heroSubtitle}
                        </p>


                        {/* BUTTONS */}

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                                mt-8
                            "
                        >

                            {dashboard.primaryButtonText && (

                                <Link
                                    to={getLink(
                                        dashboard.primaryButtonLink
                                    )}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        bg-white
                                        text-[#201E1B]
                                        px-6
                                        py-3.5
                                        rounded-full
                                        font-semibold
                                        hover:bg-[#F1ECE1]
                                        transition
                                    "
                                >
                                    {
                                        dashboard.primaryButtonText
                                    }
                                </Link>

                            )}


                            {dashboard.secondaryButtonText && (

                                <Link
                                    to={getLink(
                                        dashboard.secondaryButtonLink
                                    )}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        border
                                        border-white/70
                                        text-white
                                        px-6
                                        py-3.5
                                        rounded-full
                                        font-semibold
                                        hover:bg-white
                                        hover:text-[#201E1B]
                                        transition
                                    "
                                >
                                    {
                                        dashboard.secondaryButtonText
                                    }
                                </Link>

                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                SHOP BY CATEGORY
            ================================================== */}

            <section
                className="
                    max-w-7xl
                    mx-auto
                    px-5
                    sm:px-8
                    md:px-10
                    py-20
                    md:py-28
                "
            >

                {/* SECTION HEADER */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-6
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
                            Norden / Explore
                        </p>

                        <h2
                            className="
                                font-display
                                text-4xl
                                sm:text-5xl
                                md:text-6xl
                            "
                        >
                            Shop by category
                        </h2>

                    </div>


                    <p
                        className="
                            max-w-md
                            text-[#5f5a51]
                            leading-relaxed
                            text-sm
                            md:text-base
                        "
                    >
                        Discover carefully selected pieces
                        across clothing, accessories and
                        everyday essentials.
                    </p>

                </div>


                {/* CATEGORY GRID */}

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-4
                    "
                >

                    {shopCategories.map(
                        (category) => (

                            <Link
                                key={category.id}
                                to={category.link}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    bg-[#DED7C8]
                                "
                            >

                                {/* IMAGE */}

                                <div
                                    className="
                                        aspect-[3/4]
                                        overflow-hidden
                                    "
                                >

                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            group-hover:scale-105
                                        "
                                        onError={(e) => {

                                            e.currentTarget.src =
                                                "https://via.placeholder.com/700x900?text=Norden";

                                        }}
                                    />

                                </div>


                                {/* GRADIENT */}

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black/70
                                        via-black/10
                                        to-transparent
                                    "
                                />


                                {/* NUMBER */}

                                <div
                                    className="
                                        absolute
                                        top-5
                                        left-5
                                        text-white/80
                                        font-mono
                                        text-xs
                                        tracking-[0.2em]
                                    "
                                >
                                    {category.number}
                                </div>


                                {/* CONTENT */}

                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        p-5
                                        md:p-6
                                        text-white
                                    "
                                >

                                    <h3
                                        className="
                                            font-display
                                            text-3xl
                                            md:text-4xl
                                            group-hover:translate-x-2
                                            transition-transform
                                            duration-500
                                        "
                                    >
                                        {category.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-2
                                            text-white/75
                                            text-sm
                                            leading-relaxed
                                        "
                                    >
                                        {category.subtitle}
                                    </p>


                                    <div
                                        className="
                                            mt-5
                                            flex
                                            items-center
                                            gap-2
                                            font-mono
                                            text-[10px]
                                            uppercase
                                            tracking-[0.18em]
                                        "
                                    >

                                        <span>
                                            Shop now
                                        </span>

                                        <span
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-2
                                            "
                                        >
                                            →
                                        </span>

                                    </div>

                                </div>

                            </Link>

                        )
                    )}

                </div>

            </section>


            {/* ==================================================
                CURATED SECTION
            ================================================== */}

            <section
                className="
                    border-t
                    border-[#D8D0C2]
                "
            >

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        px-5
                        sm:px-8
                        md:px-10
                        py-20
                        md:py-28
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-10
                            lg:gap-16
                            items-center
                        "
                    >

                        {/* IMAGE */}

                        <div
                            className="
                                order-2
                                lg:order-1
                            "
                        >

                            <div
                                className="
                                    aspect-[4/5]
                                    overflow-hidden
                                    bg-[#E4DED1]
                                "
                            >

                                {dashboard.sectionImage ? (

                                    <img
                                        src={
                                            dashboard.sectionImage
                                        }
                                        alt={
                                            dashboard.sectionTitle
                                        }
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            hover:scale-105
                                            transition-transform
                                            duration-700
                                        "
                                        onError={(e) => {

                                            e.currentTarget.style.display =
                                                "none";

                                        }}
                                    />

                                ) : (

                                    <div
                                        className="
                                            w-full
                                            h-full
                                            flex
                                            items-center
                                            justify-center
                                            text-gray-500
                                        "
                                    >
                                        No image
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* TEXT */}

                        <div
                            className="
                                order-1
                                lg:order-2
                            "
                        >

                            <p
                                className="
                                    font-mono
                                    text-xs
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#5F6B4A]
                                    mb-5
                                "
                            >
                                Norden / Essentials
                            </p>


                            <h2
                                className="
                                    font-display
                                    text-4xl
                                    sm:text-5xl
                                    md:text-6xl
                                    leading-tight
                                "
                            >
                                {dashboard.sectionTitle}
                            </h2>


                            <p
                                className="
                                    mt-6
                                    text-[#4a4740]
                                    text-lg
                                    leading-relaxed
                                    max-w-xl
                                "
                            >
                                {dashboard.sectionSubtitle}
                            </p>


                            <div className="mt-8">

                                <Link
                                    to="/women"
                                    className="
                                        inline-flex
                                        items-center
                                        border-b
                                        border-[#201E1B]
                                        pb-2
                                        font-semibold
                                        hover:opacity-60
                                        transition
                                    "
                                >
                                    Explore collection
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                PRODUCTS
            ================================================== */}

            {featuredProducts.length > 0 && (

                <section
                    className="
                        border-t
                        border-[#D8D0C2]
                    "
                >

                    <div
                        className="
                            max-w-7xl
                            mx-auto
                            px-5
                            sm:px-8
                            md:px-10
                            py-20
                            md:py-24
                        "
                    >

                        {/* TITLE */}

                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-end
                                sm:justify-between
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
                                        mb-3
                                    "
                                >
                                    Norden / New Arrivals
                                </p>


                                <h2
                                    className="
                                        font-display
                                        text-4xl
                                        md:text-5xl
                                    "
                                >
                                    Latest pieces
                                </h2>

                            </div>


                            <div>

                                <Link
                                    to="/men"
                                    className="
                                        text-sm
                                        font-semibold
                                        border-b
                                        border-[#201E1B]
                                        pb-1
                                    "
                                >
                                    View collection
                                </Link>

                            </div>

                        </div>


                        {/* GRID */}

                        <div
                            className="
                                grid
                                grid-cols-2
                                md:grid-cols-4
                                gap-5
                            "
                        >

                            {featuredProducts.map(
                                (product) => (

                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="group"
                                    >

                                        {/* IMAGE */}

                                        <div
                                            className="
                                                aspect-[3/4]
                                                overflow-hidden
                                                bg-[#E4DED1]
                                                mb-4
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
                                                        "https://via.placeholder.com/500x650?text=Product";

                                                }}
                                            />

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


                                        {/* NAME / PRICE */}

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-2
                                            "
                                        >

                                            <h3
                                                className="
                                                    text-sm
                                                    leading-snug
                                                "
                                            >
                                                {
                                                    product.title
                                                }
                                            </h3>


                                            <span
                                                className="
                                                    font-mono
                                                    text-sm
                                                    whitespace-nowrap
                                                "
                                            >
                                                ₹
                                                {Number(
                                                    product.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>

                                    </Link>

                                )
                            )}

                        </div>

                    </div>

                </section>

            )}


            {/* ==================================================
                OFFERS
            ================================================== */}

            <section className="border-t border-[#D8D0C2] bg-[#DED7C8]">
                <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-10 md:py-20">
                    <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                        <div>
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#9C4A2E]">
                                Norden / Limited offers
                            </p>
                            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                                Good pieces, better timing.
                            </h2>
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#4a4740]">
                                Explore this week&apos;s edit and find considered essentials at special seasonal prices.
                            </p>
                            <Link to="/women" className="mt-7 inline-flex border-b border-[#201E1B] pb-2 text-sm font-semibold">
                                Shop the offers
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {featuredProducts.slice(0, 4).map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`} className="group">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F1ECE1]">
                                        <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <span className="absolute left-2 top-2 bg-[#9C4A2E] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#F1ECE1]">
                                            Offer
                                        </span>
                                    </div>
                                    <p className="mt-3 line-clamp-2 text-xs leading-snug">{product.title}</p>
                                    <p className="mt-1 font-mono text-xs text-[#9C4A2E]">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ==================================================
                FINAL CTA
            ================================================== */}

            <section
                className="
                    bg-[#201E1B]
                    text-[#F1ECE1]
                "
            >

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        px-5
                        sm:px-8
                        md:px-10
                        py-20
                        md:py-28
                    "
                >

                    <div
                        className="
                            max-w-3xl
                        "
                    >

                        <p
                            className="
                                font-mono
                                text-xs
                                uppercase
                                tracking-[0.2em]
                                text-white/50
                                mb-5
                            "
                        >
                            Norden / Collections
                        </p>


                        <h2
                            className="
                                font-display
                                text-5xl
                                md:text-7xl
                                leading-[0.95]
                            "
                        >
                            Find your everyday
                            essentials.
                        </h2>


                        <p
                            className="
                                mt-6
                                text-white/60
                                max-w-xl
                                leading-relaxed
                            "
                        >
                            Explore clothing and accessories
                            designed with simplicity, comfort
                            and timeless style in mind.
                        </p>


                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                                mt-8
                            "
                        >

                            <Link
                                to="/women"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    bg-[#F1ECE1]
                                    text-[#201E1B]
                                    px-7
                                    py-3.5
                                    rounded-full
                                    font-semibold
                                    hover:bg-white
                                    transition
                                "
                            >
                                Shop Women
                            </Link>


                            <Link
                                to="/men"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    border
                                    border-white/30
                                    text-white
                                    px-7
                                    py-3.5
                                    rounded-full
                                    font-semibold
                                    hover:bg-white
                                    hover:text-[#201E1B]
                                    transition
                                "
                            >
                                Shop Men
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <Footer />

        </div>
    );
}


export default Dashboard;
