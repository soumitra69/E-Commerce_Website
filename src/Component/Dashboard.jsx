import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

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
// DASHBOARD
// ==========================================================

function Dashboard() {
    const [dashboard, setDashboard] =
        useState(defaultDashboard);

    const [products, setProducts] =
        useState([]);

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
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {
        loadDashboard();
        loadProducts();

        setLoading(false);

        // ==============================================
        // ADMIN HOME PAGE UPDATED
        // ==============================================

        window.addEventListener(
            "adminDashboardUpdated",
            loadDashboard
        );

        // ==============================================
        // ADMIN PRODUCTS UPDATED
        // ==============================================

        window.addEventListener(
            "adminProductsUpdated",
            loadProducts
        );

        // ==============================================
        // CLEANUP
        // ==============================================

        return () => {
            window.removeEventListener(
                "adminDashboardUpdated",
                loadDashboard
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

    const getLink = (
        link
    ) => {
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

                <div className="bg-[#5F6B4A] text-white text-center py-3 px-4">

                    <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                        {dashboard.announcement}
                    </p>

                </div>

            )}

            {/* ==================================================
                HERO
            ================================================== */}

            <section className="relative min-h-[75vh] md:min-h-[86vh] overflow-hidden">

                {/* HERO IMAGE */}

                {dashboard.heroImage && (

                    <img
                        src={
                            dashboard.heroImage
                        }
                        alt={
                            dashboard.heroTitle
                        }
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display =
                                "none";
                        }}
                    />

                )}

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-black/30" />

                {/* HERO CONTENT */}

                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 min-h-[75vh] md:min-h-[80vh] flex items-end pb-14 md:pb-20">

                    <div className="max-w-3xl text-white">

                        {/* LABEL */}

                        <p className="font-mono text-xs uppercase tracking-[0.25em] mb-5">
                            Norden / Collection
                        </p>

                        {/* TITLE */}

                        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] tracking-tight">
                            {dashboard.heroTitle}
                        </h1>

                        {/* SUBTITLE */}

                        <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/90">
                            {dashboard.heroSubtitle}
                        </p>

                        {/* BUTTONS */}

                        <div className="flex flex-wrap gap-3 mt-8">

                            {dashboard.primaryButtonText && (

                                <Link
                                    to={getLink(
                                        dashboard.primaryButtonLink
                                    )}
                                    className="inline-flex items-center justify-center bg-white text-[#201E1B] px-6 py-3.5 rounded-full font-semibold hover:bg-[#F1ECE1] transition"
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
                                    className="inline-flex items-center justify-center border border-white/70 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white hover:text-[#201E1B] transition"
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
                CURATED SECTION
            ================================================== */}

            <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-20 md:py-28">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* IMAGE */}

                    <div className="order-2 lg:order-1">

                        <div className="aspect-[4/5] overflow-hidden bg-[#E4DED1]">

                            {dashboard.sectionImage ? (

                                <img
                                    src={
                                        dashboard.sectionImage
                                    }
                                    alt={
                                        dashboard.sectionTitle
                                    }
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        e.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                            ) : (

                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    No image
                                </div>

                            )}

                        </div>

                    </div>

                    {/* TEXT */}

                    <div className="order-1 lg:order-2">

                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5F6B4A] mb-5">
                            Norden / Essentials
                        </p>

                        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
                            {
                                dashboard.sectionTitle
                            }
                        </h2>

                        <p className="mt-6 text-[#4a4740] text-lg leading-relaxed max-w-xl">
                            {
                                dashboard.sectionSubtitle
                            }
                        </p>

                        <div className="mt-8">

                            <Link
                                to="/women"
                                className="inline-flex items-center border-b border-[#201E1B] pb-2 font-semibold hover:opacity-60 transition"
                            >
                                Explore collection
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* ==================================================
                PRODUCTS
            ================================================== */}

            {featuredProducts.length > 0 && (

                <section className="border-t border-[#D8D0C2]">

                    <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-20 md:py-24">

                        {/* TITLE */}

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">

                            <div>

                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5F6B4A] mb-3">
                                    Norden / New Arrivals
                                </p>

                                <h2 className="font-display text-4xl md:text-5xl">
                                    Latest pieces
                                </h2>

                            </div>

                            <div>

                                <Link
                                    to="/men"
                                    className="text-sm font-semibold border-b border-[#201E1B] pb-1"
                                >
                                    View collection
                                </Link>

                            </div>

                        </div>

                        {/* GRID */}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                            {featuredProducts.map(
                                (product) => (

                                    <Link
                                        key={
                                            product.id
                                        }
                                        to={`/product/${product.id}`}
                                        className="group"
                                    >

                                        {/* IMAGE */}

                                        <div className="aspect-[3/4] overflow-hidden bg-[#E4DED1] mb-4">

                                            <img
                                                src={
                                                    product.thumbnail
                                                }
                                                alt={
                                                    product.title
                                                }
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(
                                                    e
                                                ) => {
                                                    e.currentTarget.src =
                                                        "https://via.placeholder.com/500x650?text=Product";
                                                }}
                                            />

                                        </div>

                                        {/* CATEGORY */}

                                        <p className="font-mono text-[10px] uppercase tracking-wide text-[#5F6B4A] mb-1">
                                            {
                                                product.category
                                            }
                                        </p>

                                        {/* NAME / PRICE */}

                                        <div className="flex items-start justify-between gap-2">

                                            <h3 className="text-sm leading-snug">
                                                {
                                                    product.title
                                                }
                                            </h3>

                                            <span className="font-mono text-sm whitespace-nowrap">
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
                COLLECTION LINKS
            ================================================== */}

            <section className="bg-[#201E1B] text-[#F1ECE1]">

                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-20 md:py-24">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* WOMEN */}

                        <Link
                            to="/women"
                            className="group"
                        >

                            <div className="border-t border-white/30 pt-5">

                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                                    01
                                </p>

                                <h3 className="font-display text-4xl mt-3 group-hover:translate-x-2 transition-transform">
                                    Women
                                </h3>

                                <p className="text-white/60 mt-3">
                                    Explore women's
                                    essentials.
                                </p>

                            </div>

                        </Link>

                        {/* MEN */}

                        <Link
                            to="/men"
                            className="group"
                        >

                            <div className="border-t border-white/30 pt-5">

                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                                    02
                                </p>

                                <h3 className="font-display text-4xl mt-3 group-hover:translate-x-2 transition-transform">
                                    Men
                                </h3>

                                <p className="text-white/60 mt-3">
                                    Explore men's
                                    essentials.
                                </p>

                            </div>

                        </Link>

                        {/* ACCESSORIES */}

                        <Link
                            to="/accessories"
                            className="group"
                        >

                            <div className="border-t border-white/30 pt-5">

                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                                    03
                                </p>

                                <h3 className="font-display text-4xl mt-3 group-hover:translate-x-2 transition-transform">
                                    Accessories
                                </h3>

                                <p className="text-white/60 mt-3">
                                    Complete your
                                    everyday look.
                                </p>

                            </div>

                        </Link>

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