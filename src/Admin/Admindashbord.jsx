import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    LayoutDashboard,
    Package,
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Upload,
    Image as ImageIcon,
    Save,
    LogOut,
    Menu,
    Home,
    Eye,
    ExternalLink,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";


// ==========================================================
// DEFAULT SHOP BY CATEGORY
// ==========================================================

const DEFAULT_SHOP_CATEGORIES = [
    { id: "women", number: "01", title: "Women", subtitle: "Dresses, tops & everyday essentials", link: "/women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85", visible: true },
    { id: "men", number: "02", title: "Men", subtitle: "Modern essentials for every day", link: "/men", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", visible: true },
    { id: "accessories", number: "03", title: "Accessories", subtitle: "The finishing touches", link: "/accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=85", visible: true },
    { id: "new-arrivals", number: "04", title: "New Arrivals", subtitle: "Fresh pieces, just in", link: "/women", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85", visible: true },
];


// ==========================================================
// DEFAULT DASHBOARD
// ==========================================================

const DEFAULT_DASHBOARD = {
    announcement:
        "NEW SEASON — TIMELESS ESSENTIALS",

    heroTitle:
        "Designed for everyday life.",

    heroSubtitle:
        "Thoughtful clothing, accessories and essentials made for modern living.",

    heroImage:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",

    primaryButtonText:
        "Shop Women",

    primaryButtonLink:
        "/women",

    secondaryButtonText:
        "Shop Men",

    secondaryButtonLink:
        "/men",

    sectionTitle:
        "Curated essentials",

    sectionSubtitle:
        "A considered collection of timeless pieces designed to be worn again and again.",

    sectionImage:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",

    shopCategories: DEFAULT_SHOP_CATEGORIES,

    footerText:
        "Norden — timeless essentials for everyday life.",
};


// ==========================================================
// EMPTY PRODUCT
// ==========================================================

const EMPTY_PRODUCT = {
    name: "",
    category: "women",
    price: "",
    stock: "",
    image: "",
    brand: "Norden",
    status: "Active",
    description: "",
};


// ==========================================================
// LOCAL STORAGE
// ==========================================================

function readLocalStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        const parsed = JSON.parse(value);

        return parsed ?? fallback;
    } catch (error) {
        console.error(
            `Error reading ${key}:`,
            error
        );

        return fallback;
    }
}


// ==========================================================
// ADMIN DASHBOARD
// ==========================================================

function AdminDashboard() {
    const navigate = useNavigate();

    // ======================================================
    // REFS
    // ======================================================

    const heroFileRef = useRef(null);
    const sectionFileRef = useRef(null);
    const productFileRef = useRef(null);
    const categoryFileRef = useRef(null);


    // ======================================================
    // MAIN STATE
    // ======================================================

    const [activePage, setActivePage] =
        useState("dashboard");

    const [mobileMenu, setMobileMenu] =
        useState(false);

    const [loading, setLoading] =
        useState(true);


    // ======================================================
    // DASHBOARD STATE
    // ======================================================

    const [dashboard, setDashboard] =
        useState({
            ...DEFAULT_DASHBOARD,
        });


    // ======================================================
    // PRODUCT STATE
    // ======================================================

    const [products, setProducts] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [
        showProductForm,
        setShowProductForm,
    ] = useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [productForm, setProductForm] =
        useState({
            ...EMPTY_PRODUCT,
        });

    // ======================================================
    // SHOP CATEGORY STATE
    // ======================================================

    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [categoryForm, setCategoryForm] = useState({
        id: "",
        number: "",
        title: "",
        subtitle: "",
        link: "/women",
        image: "",
        visible: true,
    });
    const [categoryImageError, setCategoryImageError] = useState(false);


    // ======================================================
    // IMAGE ERROR STATE
    // ======================================================

    const [
        heroImageError,
        setHeroImageError,
    ] = useState(false);

    const [
        sectionImageError,
        setSectionImageError,
    ] = useState(false);

    const [
        productImageError,
        setProductImageError,
    ] = useState(false);


    // ======================================================
    // LOAD DASHBOARD
    // ======================================================

    const loadDashboard = () => {
        const saved =
            readLocalStorage(
                "adminDashboard",
                null
            );

        if (saved) {
            setDashboard({
                ...DEFAULT_DASHBOARD,
                ...saved,
                shopCategories: Array.isArray(saved.shopCategories)
                    ? saved.shopCategories
                    : DEFAULT_SHOP_CATEGORIES,
            });
        } else {
            setDashboard({
                ...DEFAULT_DASHBOARD,
            });
        }
    };


    // ======================================================
    // LOAD PRODUCTS FROM SUPABASE
    // ======================================================

    const loadProducts = async () => {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            setProducts(data || []);
        } catch (error) {
            console.error("Failed to load products:", error);
            alert(`Failed to load products: ${error.message}`);
            setProducts([]);
        }
    };


    // ======================================================
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {
        const init = async () => {
            loadDashboard();
            await loadProducts();
            setLoading(false);
        };

        init();
    }, []);


    // ======================================================
    // PRODUCT CHANGE LISTENER
    // ======================================================

    useEffect(() => {
        const handleProductsUpdated = () => {
            loadProducts();
        };

        window.addEventListener(
            "adminProductsUpdated",
            handleProductsUpdated
        );

        return () => {
            window.removeEventListener(
                "adminProductsUpdated",
                handleProductsUpdated
            );
        };
    }, []);


    // ======================================================
    // REFRESH PRODUCTS
    // ======================================================

    const refreshProducts = async () => {
        await loadProducts();
    };


    // ======================================================
    // SAVE DASHBOARD
    // ======================================================

    const saveDashboard = () => {
        localStorage.setItem(
            "adminDashboard",
            JSON.stringify(dashboard)
        );

        window.dispatchEvent(
            new Event("adminDashboardUpdated")
        );

        alert(
            "Home page updated successfully!"
        );
    };


    // ======================================================
    // DASHBOARD INPUT
    // ======================================================

    const handleDashboardChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setDashboard((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // ======================================================
    // GENERIC IMAGE FILE VALIDATION
    // ======================================================

    const validateImageFile = (file) => {
        if (!file) {
            return false;
        }

        if (!file.type.startsWith("image/")) {
            alert(
                "Please select an image file."
            );

            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(
                "Image must be smaller than 5MB."
            );

            return false;
        }

        return true;
    };


    // ======================================================
    // HERO IMAGE UPLOAD
    // ======================================================

    const handleHeroUpload = (event) => {
        const file =
            event.target.files?.[0];

        if (!validateImageFile(file)) {
            event.target.value = "";
            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {
            setDashboard((previous) => ({
                ...previous,
                heroImage:
                    reader.result,
            }));

            setHeroImageError(false);
        };

        reader.readAsDataURL(file);
    };


    // ======================================================
    // SECTION IMAGE UPLOAD
    // ======================================================

    const handleSectionUpload = (event) => {
        const file =
            event.target.files?.[0];

        if (!validateImageFile(file)) {
            event.target.value = "";
            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {
            setDashboard((previous) => ({
                ...previous,
                sectionImage:
                    reader.result,
            }));

            setSectionImageError(false);
        };

        reader.readAsDataURL(file);
    };


    // ======================================================
    // REMOVE HERO IMAGE
    // ======================================================

    const removeHeroImage = () => {
        setDashboard((previous) => ({
            ...previous,
            heroImage: "",
        }));

        setHeroImageError(false);

        if (heroFileRef.current) {
            heroFileRef.current.value = "";
        }
    };


    // ======================================================
    // REMOVE SECTION IMAGE
    // ======================================================

    const removeSectionImage = () => {
        setDashboard((previous) => ({
            ...previous,
            sectionImage: "",
        }));

        setSectionImageError(false);

        if (sectionFileRef.current) {
            sectionFileRef.current.value = "";
        }
    };


    // ======================================================
    // SHOP BY CATEGORY MANAGEMENT
    // ======================================================

    const openAddCategory = () => {
        setEditingCategoryId(null);
        setCategoryImageError(false);
        setCategoryForm({
            id: `category-${Date.now()}`,
            number: String((dashboard.shopCategories?.length || 0) + 1).padStart(2, "0"),
            title: "",
            subtitle: "",
            link: "/women",
            image: "",
            visible: true,
        });
        if (categoryFileRef.current) categoryFileRef.current.value = "";
        setShowCategoryForm(true);
    };

    const openEditCategory = (category) => {
        setEditingCategoryId(category.id);
        setCategoryImageError(false);
        setCategoryForm({
            id: category.id,
            number: category.number || "",
            title: category.title || "",
            subtitle: category.subtitle || "",
            link: category.link || "/women",
            image: category.image || "",
            visible: category.visible !== false,
        });
        setShowCategoryForm(true);
    };

    const closeCategoryForm = () => {
        setShowCategoryForm(false);
        setEditingCategoryId(null);
        setCategoryImageError(false);
        setCategoryForm({ id: "", number: "", title: "", subtitle: "", link: "/women", image: "", visible: true });
        if (categoryFileRef.current) categoryFileRef.current.value = "";
    };

    const handleCategoryChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCategoryForm((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
        if (name === "image") setCategoryImageError(false);
    };

    const handleCategoryImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!validateImageFile(file)) {
            event.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setCategoryForm((previous) => ({ ...previous, image: reader.result }));
            setCategoryImageError(false);
        };
        reader.readAsDataURL(file);
    };

    const saveCategory = (event) => {
        event.preventDefault();
        if (!categoryForm.title.trim()) {
            setCategoryImageError(false);
            return;
        }
        setDashboard((previous) => {
            const categories = Array.isArray(previous.shopCategories) ? [...previous.shopCategories] : [];
            const category = {
                ...categoryForm,
                title: categoryForm.title.trim(),
                subtitle: categoryForm.subtitle.trim(),
                link: categoryForm.link.trim() || "/women",
                number: categoryForm.number.trim() || String(categories.length + 1).padStart(2, "0"),
                visible: Boolean(categoryForm.visible),
            };
            if (editingCategoryId) {
                return { ...previous, shopCategories: categories.map((item) => item.id === editingCategoryId ? category : item) };
            }
            return { ...previous, shopCategories: [...categories, category] };
        });
        closeCategoryForm();
    };

    const deleteCategory = (id) => {
        setDashboard((previous) => ({
            ...previous,
            shopCategories: (previous.shopCategories || []).filter((category) => category.id !== id),
        }));
    };

    const moveCategory = (index, direction) => {
        setDashboard((previous) => {
            const categories = [...(previous.shopCategories || [])];
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= categories.length) return previous;
            [categories[index], categories[newIndex]] = [categories[newIndex], categories[index]];
            return {
                ...previous,
                shopCategories: categories.map((category, categoryIndex) => ({
                    ...category,
                    number: String(categoryIndex + 1).padStart(2, "0"),
                })),
            };
        });
    };


    // ======================================================
    // PRODUCT INPUT
    // ======================================================

    const handleProductChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setProductForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (name === "image") {
            setProductImageError(false);
        }
    };


    // ======================================================
    // PRODUCT IMAGE UPLOAD
    // ======================================================

    const handleProductImageUpload = (event) => {
        const file =
            event.target.files?.[0];

        if (!validateImageFile(file)) {
            event.target.value = "";
            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {
            setProductForm((previous) => ({
                ...previous,
                image:
                    reader.result,
            }));

            setProductImageError(false);
        };

        reader.readAsDataURL(file);
    };


    // ======================================================
    // REMOVE PRODUCT IMAGE
    // ======================================================

    const removeProductImage = () => {
        setProductForm((previous) => ({
            ...previous,
            image: "",
        }));

        setProductImageError(false);

        if (productFileRef.current) {
            productFileRef.current.value = "";
        }
    };


    // ======================================================
    // ADD PRODUCT
    // ======================================================

    const openAddProduct = () => {
        setEditingId(null);

        setProductForm({
            ...EMPTY_PRODUCT,
        });

        setProductImageError(false);

        if (productFileRef.current) {
            productFileRef.current.value = "";
        }

        setShowProductForm(true);
    };


    // ======================================================
    // EDIT PRODUCT
    // ======================================================

    const openEditProduct = (product) => {
        setEditingId(product.id);

        setProductForm({
            name:
                product.title || "",

            category:
                product.category ||
                "women",

            price:
                product.price ?? "",

            stock:
                product.stock ?? "",

            image:
                product.thumbnail || "",

            brand:
                product.brand ||
                "Norden",

            status:
                product.status ||
                "Active",

            description:
                product.description ||
                "",
        });

        setProductImageError(false);

        if (productFileRef.current) {
            productFileRef.current.value = "";
        }

        setShowProductForm(true);
    };


    // ======================================================
    // CLOSE PRODUCT FORM
    // ======================================================

    const closeProductForm = () => {
        setShowProductForm(false);

        setEditingId(null);

        setProductForm({
            ...EMPTY_PRODUCT,
        });

        setProductImageError(false);

        if (productFileRef.current) {
            productFileRef.current.value = "";
        }
    };


    // ======================================================
    // SAVE PRODUCT TO SUPABASE
    // ======================================================

    const handleProductSubmit = async (event) => {
        event.preventDefault();

        const name = productForm.name.trim();
        const price = productForm.price;
        const stock = productForm.stock;
        const image = productForm.image.trim();

        if (!name) {
            alert("Please enter product name.");
            return;
        }

        if (price === "" || Number(price) < 0) {
            alert("Please enter a valid product price.");
            return;
        }

        if (stock === "" || Number(stock) < 0) {
            alert("Please enter valid stock.");
            return;
        }

        if (!image) {
            alert("Please upload an image or paste an image URL.");
            return;
        }

        const category = productForm.category;
        const gender = ["women"].includes(category)
            ? "women"
            : ["men", "mens-shirts", "tops"].includes(category)
                ? "men"
                : "other";

        const payload = {
            title: name,
            brand: productForm.brand.trim() || "Norden",
            category,
            gender,
            price: Number(price),
            stock: Number(stock),
            thumbnail: image,
            status: productForm.status || "Active",
            description: productForm.description.trim(),
        };

        try {
            if (editingId !== null) {
                const { error } = await supabase
                    .from("products")
                    .update(payload)
                    .eq("id", editingId);

                if (error) throw error;

                alert("Product updated successfully!");
            } else {
                const { error } = await supabase
                    .from("products")
                    .insert(payload);

                if (error) throw error;

                alert("Product added successfully!");
            }

            await refreshProducts();
            window.dispatchEvent(new Event("adminProductsUpdated"));
            closeProductForm();
        } catch (error) {
            console.error("Product save error:", error);
            alert(`Failed to save product: ${error.message}`);
        }
    };


    // ======================================================
    // DELETE PRODUCT FROM SUPABASE
    // ======================================================

    const deleteProduct = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await refreshProducts();
            window.dispatchEvent(new Event("adminProductsUpdated"));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Delete product error:", error);
            alert(`Failed to delete product: ${error.message}`);
        }
    };


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredProducts =
        products.filter((product) => {
            const value =
                search
                    .toLowerCase()
                    .trim();

            if (!value) {
                return true;
            }

            return (
                product.title
                    ?.toLowerCase()
                    .includes(value)

                ||

                product.brand
                    ?.toLowerCase()
                    .includes(value)

                ||

                product.category
                    ?.toLowerCase()
                    .includes(value)
            );
        });


    // ======================================================
    // STATS
    // ======================================================

    const totalProducts =
        products.length;

    const activeProducts =
        products.filter(
            (product) =>
                product.status !==
                "Inactive"
        ).length;

    const womenProducts =
        products.filter(
            (product) =>
                product.category ===
                "women"
        ).length;

    const menProducts =
        products.filter(
            (product) =>
                product.category ===
                "men" ||
                product.category ===
                "mens-shirts" ||
                product.category ===
                "tops"
        ).length;

    const accessoryProducts =
        products.filter(
            (product) =>
                product.category ===
                "accessories"
        ).length;


    // ======================================================
    // LOGOUT
    // ======================================================

    const handleLogout = () => {
        localStorage.removeItem(
            "adminLoggedIn"
        );

        navigate("/adminlogin");
    };


    // ======================================================
    // NAVIGATION
    // ======================================================

    const changePage = (page) => {
        setActivePage(page);
        setMobileMenu(false);
    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />

                    <p className="text-gray-600">
                        Loading admin dashboard...
                    </p>

                </div>
            </div>
        );
    }


    // ======================================================
    // RETURN
    // ======================================================

    return (
        <div className="min-h-screen bg-gray-100">

            {/* ==================================================
                MOBILE HEADER
            ================================================== */}

            <header className="lg:hidden bg-gray-950 text-white sticky top-0 z-40">

                <div className="px-4 py-4 flex items-center justify-between">

                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenu(
                                (previous) =>
                                    !previous
                            )
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10"
                    >
                        {mobileMenu ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}
                    </button>

                    <div className="text-center">

                        <h1 className="font-bold">
                            ShopAdmin
                        </h1>

                        <p className="text-[10px] text-gray-400">
                            ADMIN PANEL
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10"
                    >
                        <Home size={20} />
                    </button>

                </div>

            </header>


            {/* ==================================================
                MOBILE SIDEBAR
            ================================================== */}

            {mobileMenu && (
                <div className="lg:hidden fixed inset-0 z-30">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() =>
                            setMobileMenu(false)
                        }
                    />

                    <aside className="relative w-72 h-full bg-gray-950 text-white p-5">

                        <div className="mb-8">

                            <h2 className="text-xl font-bold">
                                ShopAdmin
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                E-commerce Admin
                            </p>

                        </div>

                        <AdminNavigation
                            activePage={
                                activePage
                            }
                            changePage={
                                changePage
                            }
                        />

                    </aside>

                </div>
            )}


            {/* ==================================================
                DESKTOP SIDEBAR
            ================================================== */}

            <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-gray-950 text-white flex-col z-40">

                <div className="px-6 py-7 border-b border-white/10">

                    <h1 className="text-2xl font-bold">
                        ShopAdmin
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        E-commerce Admin Panel
                    </p>

                </div>

                <div className="flex-1 p-4">

                    <AdminNavigation
                        activePage={
                            activePage
                        }
                        changePage={
                            changePage
                        }
                    />

                </div>

                <div className="p-4 border-t border-white/10">

                    <button
                        type="button"
                        onClick={
                            handleLogout
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
                    >
                        <LogOut size={18} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="lg:ml-64 min-h-screen">

                {/* TOP BAR */}

                <div className="hidden lg:flex bg-white border-b px-8 py-5 items-center justify-between sticky top-0 z-20">

                    <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400">
                            Admin
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-1">
                            {activePage ===
                                "dashboard"
                                ? "Dashboard"
                                : "Products"}
                        </h2>

                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                            className="flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm hover:bg-gray-50"
                        >
                            <Eye size={16} />

                            View Store

                            <ExternalLink
                                size={14}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={
                                handleLogout
                            }
                            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                        >
                            <LogOut
                                size={16}
                            />

                            Logout
                        </button>

                    </div>

                </div>


                {/* ==================================================
                    DASHBOARD PAGE
                ================================================== */}

                {activePage ===
                    "dashboard" && (

                        <DashboardEditor
                            dashboard={
                                dashboard
                            }

                            handleDashboardChange={
                                handleDashboardChange
                            }

                            saveDashboard={
                                saveDashboard
                            }

                            heroFileRef={
                                heroFileRef
                            }

                            sectionFileRef={
                                sectionFileRef
                            }

                            handleHeroUpload={
                                handleHeroUpload
                            }

                            handleSectionUpload={
                                handleSectionUpload
                            }

                            removeHeroImage={
                                removeHeroImage
                            }

                            removeSectionImage={
                                removeSectionImage
                            }

                            heroImageError={
                                heroImageError
                            }

                            sectionImageError={
                                sectionImageError
                            }

                            setHeroImageError={
                                setHeroImageError
                            }

                            setSectionImageError={
                                setSectionImageError
                            }
                            openAddCategory={openAddCategory}
                            openEditCategory={openEditCategory}
                            deleteCategory={deleteCategory}
                            moveCategory={moveCategory}
                        />
                    )}


                {/* ==================================================
                    PRODUCTS PAGE
                ================================================== */}

                {activePage ===
                    "products" && (

                        <ProductsPage
                            products={
                                products
                            }

                            filteredProducts={
                                filteredProducts
                            }

                            search={
                                search
                            }

                            setSearch={
                                setSearch
                            }

                            openAddProduct={
                                openAddProduct
                            }

                            openEditProduct={
                                openEditProduct
                            }

                            deleteProduct={
                                deleteProduct
                            }

                            totalProducts={
                                totalProducts
                            }

                            activeProducts={
                                activeProducts
                            }

                            womenProducts={
                                womenProducts
                            }

                            menProducts={
                                menProducts
                            }

                            accessoryProducts={
                                accessoryProducts
                            }
                        />
                    )}

            </main>


            {/* ==================================================
                SHOP CATEGORY MODAL
            ================================================== */}

            {showCategoryForm && (
                <CategoryModal
                    editingCategoryId={editingCategoryId}
                    categoryForm={categoryForm}
                    categoryFileRef={categoryFileRef}
                    categoryImageError={categoryImageError}
                    handleCategoryChange={handleCategoryChange}
                    handleCategoryImageUpload={handleCategoryImageUpload}
                    saveCategory={saveCategory}
                    closeCategoryForm={closeCategoryForm}
                    setCategoryImageError={setCategoryImageError}
                />
            )}


            {/* ==================================================
                PRODUCT MODAL
            ================================================== */}

            {showProductForm && (

                <ProductModal
                    editingId={
                        editingId
                    }

                    productForm={
                        productForm
                    }

                    handleProductChange={
                        handleProductChange
                    }

                    handleProductSubmit={
                        handleProductSubmit
                    }

                    closeProductForm={
                        closeProductForm
                    }

                    productFileRef={
                        productFileRef
                    }

                    handleProductImageUpload={
                        handleProductImageUpload
                    }

                    removeProductImage={
                        removeProductImage
                    }

                    productImageError={
                        productImageError
                    }

                    setProductImageError={
                        setProductImageError
                    }
                />

            )}

        </div>
    );
}


// ==========================================================
// ADMIN NAVIGATION
// ==========================================================

function AdminNavigation({
    activePage,
    changePage,
}) {
    return (
        <nav className="space-y-2">

            <button
                type="button"
                onClick={() =>
                    changePage(
                        "dashboard"
                    )
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activePage ===
                    "dashboard"
                    ? "bg-white text-gray-950"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
            >
                <LayoutDashboard
                    size={19}
                />

                <span>
                    Dashboard
                </span>

            </button>


            <button
                type="button"
                onClick={() =>
                    changePage(
                        "products"
                    )
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activePage ===
                    "products"
                    ? "bg-white text-gray-950"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
            >
                <Package
                    size={19}
                />

                <span>
                    Products
                </span>

            </button>

        </nav>
    );
}


// ==========================================================
// DASHBOARD EDITOR
// ==========================================================

function DashboardEditor({
    dashboard,
    handleDashboardChange,
    saveDashboard,
    heroFileRef,
    sectionFileRef,
    handleHeroUpload,
    handleSectionUpload,
    removeHeroImage,
    removeSectionImage,
    heroImageError,
    sectionImageError,
    setHeroImageError,
    setSectionImageError,
    openAddCategory,
    openEditCategory,
    deleteCategory,
    moveCategory,
}) {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

                <div>

                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Home Page
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
                        Dashboard Editor
                    </h1>

                    <p className="text-gray-500 mt-2 max-w-2xl">
                        Change the content, buttons and images displayed on your customer home page.
                    </p>

                </div>

                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={() =>
                            window.open(
                                "/dashboard",
                                "_blank"
                            )
                        }
                        className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                        <Eye size={17} />

                        Preview
                    </button>

                    <button
                        type="button"
                        onClick={
                            saveDashboard
                        }
                        className="inline-flex items-center gap-2 px-5 py-3 bg-gray-950 text-white rounded-xl hover:bg-gray-800"
                    >
                        <Save size={17} />

                        Save Changes
                    </button>

                </div>

            </div>


            {/* ==================================================
                HERO
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">

                <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Section 01
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                        Hero Section
                    </h2>

                </div>


                <div className="p-5 sm:p-7">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                        <div className="space-y-5">

                            <TextInput
                                label="Announcement"
                                name="announcement"
                                value={
                                    dashboard.announcement
                                }
                                onChange={
                                    handleDashboardChange
                                }
                                placeholder="NEW SEASON..."
                            />

                            <TextInput
                                label="Hero Title"
                                name="heroTitle"
                                value={
                                    dashboard.heroTitle
                                }
                                onChange={
                                    handleDashboardChange
                                }
                                placeholder="Designed for everyday life."
                            />

                            <TextArea
                                label="Hero Subtitle"
                                name="heroSubtitle"
                                value={
                                    dashboard.heroSubtitle
                                }
                                onChange={
                                    handleDashboardChange
                                }
                                rows={4}
                            />


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <TextInput
                                    label="Primary Button"
                                    name="primaryButtonText"
                                    value={
                                        dashboard.primaryButtonText
                                    }
                                    onChange={
                                        handleDashboardChange
                                    }
                                />

                                <TextInput
                                    label="Primary Button Link"
                                    name="primaryButtonLink"
                                    value={
                                        dashboard.primaryButtonLink
                                    }
                                    onChange={
                                        handleDashboardChange
                                    }
                                    placeholder="/women"
                                />

                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <TextInput
                                    label="Secondary Button"
                                    name="secondaryButtonText"
                                    value={
                                        dashboard.secondaryButtonText
                                    }
                                    onChange={
                                        handleDashboardChange
                                    }
                                />

                                <TextInput
                                    label="Secondary Button Link"
                                    name="secondaryButtonLink"
                                    value={
                                        dashboard.secondaryButtonLink
                                    }
                                    onChange={
                                        handleDashboardChange
                                    }
                                    placeholder="/men"
                                />

                            </div>

                        </div>


                        <ImageUploader
                            title="Hero Image"
                            description="Upload an image or paste an image URL."
                            image={
                                dashboard.heroImage
                            }
                            inputRef={
                                heroFileRef
                            }
                            onUpload={
                                handleHeroUpload
                            }
                            onRemove={
                                removeHeroImage
                            }
                            imageError={
                                heroImageError
                            }
                            setImageError={
                                setHeroImageError
                            }
                            onImageUrlChange={(
                                value
                            ) => {
                                setHeroImageError(
                                    false
                                );

                                handleDashboardChange(
                                    {
                                        target: {
                                            name: "heroImage",
                                            value,
                                        },
                                    }
                                );
                            }}
                        />

                    </div>

                </div>

            </section>


            {/* ==================================================
                COLLECTION
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">

                <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Section 02
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                        Curated Collection
                    </h2>

                </div>


                <div className="p-5 sm:p-7">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                        <ImageUploader
                            title="Collection Image"
                            description="Upload an image or paste an image URL."
                            image={
                                dashboard.sectionImage
                            }
                            inputRef={
                                sectionFileRef
                            }
                            onUpload={
                                handleSectionUpload
                            }
                            onRemove={
                                removeSectionImage
                            }
                            imageError={
                                sectionImageError
                            }
                            setImageError={
                                setSectionImageError
                            }
                            onImageUrlChange={(
                                value
                            ) => {
                                setSectionImageError(
                                    false
                                );

                                handleDashboardChange(
                                    {
                                        target: {
                                            name: "sectionImage",
                                            value,
                                        },
                                    }
                                );
                            }}
                        />


                        <div className="space-y-5">

                            <TextInput
                                label="Section Title"
                                name="sectionTitle"
                                value={
                                    dashboard.sectionTitle
                                }
                                onChange={
                                    handleDashboardChange
                                }
                            />

                            <TextArea
                                label="Section Description"
                                name="sectionSubtitle"
                                value={
                                    dashboard.sectionSubtitle
                                }
                                onChange={
                                    handleDashboardChange
                                }
                                rows={7}
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                SHOP BY CATEGORY
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className="px-5 sm:px-7 py-5 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Section 03</p>
                            <h2 className="text-xl font-bold text-gray-900 mt-1">Shop by Category</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage homepage category cards.</p>
                        </div>
                        <button type="button" onClick={openAddCategory} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-950 text-white rounded-xl hover:bg-gray-800">
                            <Plus size={17} /> Add Category
                        </button>
                    </div>
                </div>

                <div className="p-5 sm:p-7">
                    {(dashboard.shopCategories || []).length === 0 ? (
                        <div className="py-14 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                            <ImageIcon size={40} className="mx-auto text-gray-300" />
                            <h3 className="font-semibold text-gray-900 mt-4">No categories added</h3>
                            <p className="text-sm text-gray-500 mt-1">Add a category to show it on your homepage.</p>
                            <button type="button" onClick={openAddCategory} className="mt-5 px-5 py-3 bg-gray-950 text-white rounded-xl">Add Category</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {(dashboard.shopCategories || []).map((category, index) => (
                                <div key={category.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
                                    <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                                        {category.image ? (
                                            <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={40} /></div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-mono bg-gray-200 px-2 py-1 rounded">{category.number || String(index + 1).padStart(2, "0")}</span>
                                                    <h3 className="font-bold text-lg text-gray-900 truncate">{category.title}</h3>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2">{category.subtitle || "No subtitle"}</p>
                                                <p className="text-xs text-gray-400 mt-2 truncate">Link: {category.link || "/women"}</p>
                                            </div>
                                            <span className={`shrink-0 text-[10px] px-2 py-1 rounded-full ${category.visible !== false ? "bg-green-50 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                                                {category.visible !== false ? "Visible" : "Hidden"}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 mt-5">
                                            <button type="button" onClick={() => moveCategory(index, -1)} disabled={index === 0} className="py-2.5 border rounded-xl text-sm disabled:opacity-30">↑</button>
                                            <button type="button" onClick={() => moveCategory(index, 1)} disabled={index === (dashboard.shopCategories || []).length - 1} className="py-2.5 border rounded-xl text-sm disabled:opacity-30">↓</button>
                                            <button type="button" onClick={() => openEditCategory(category)} className="py-2.5 bg-gray-900 text-white rounded-xl text-sm hover:bg-gray-800">Edit</button>
                                            <button type="button" onClick={() => deleteCategory(category.id)} className="py-2.5 bg-red-50 text-red-600 rounded-xl text-sm hover:bg-red-100">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">

                <div className="px-5 sm:px-7 py-5 border-b border-gray-100">

                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Footer
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                        Footer Content
                    </h2>

                </div>


                <div className="p-5 sm:p-7">

                    <TextArea
                        label="Footer Text"
                        name="footerText"
                        value={
                            dashboard.footerText
                        }
                        onChange={
                            handleDashboardChange
                        }
                        rows={4}
                    />

                </div>

            </section>


            <div className="flex justify-end pb-10">

                <button
                    type="button"
                    onClick={
                        saveDashboard
                    }
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-950 text-white rounded-xl hover:bg-gray-800"
                >
                    <Save size={18} />

                    Save Home Page
                </button>

            </div>

        </div>
    );
}


// ==========================================================
// PRODUCTS PAGE
// ==========================================================

function ProductsPage({
    filteredProducts,
    search,
    setSearch,
    openAddProduct,
    openEditProduct,
    deleteProduct,
    totalProducts,
    activeProducts,
    womenProducts,
    menProducts,
    accessoryProducts,
}) {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

                <div>

                    <p className="text-xs uppercase tracking-widest text-gray-400">
                        Store
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
                        Products
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add, edit, remove and manage product images.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={
                        openAddProduct
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-950 text-white rounded-xl hover:bg-gray-800"
                >
                    <Plus size={18} />

                    Add Product
                </button>

            </div>


            {/* STATS */}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

                <StatCard
                    title="All Products"
                    value={
                        totalProducts
                    }
                />

                <StatCard
                    title="Active"
                    value={
                        activeProducts
                    }
                />

                <StatCard
                    title="Women"
                    value={
                        womenProducts
                    }
                />

                <StatCard
                    title="Men"
                    value={
                        menProducts
                    }
                />

                <StatCard
                    title="Accessories"
                    value={
                        accessoryProducts
                    }
                />

            </div>


            {/* SEARCH */}

            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={
                            search
                        }
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search products by name, brand or category..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-gray-900"
                    />

                </div>

            </div>


            {/* PRODUCT GRID */}

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                {filteredProducts.length ===
                    0 ? (

                    <div className="py-20 text-center px-5">

                        <Package
                            size={45}
                            className="mx-auto text-gray-300 mb-5"
                        />

                        <h2 className="text-xl font-bold text-gray-900">
                            No products found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add your first product to your store.
                        </p>

                        <button
                            type="button"
                            onClick={
                                openAddProduct
                            }
                            className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-gray-950 text-white rounded-xl"
                        >
                            <Plus size={17} />

                            Add Product
                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">

                        {filteredProducts.map(
                            (product) => (

                                <div
                                    key={
                                        product.id
                                    }
                                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                                >

                                    {/* IMAGE */}

                                    <div className="aspect-[4/5] bg-gray-100">

                                        {product.thumbnail ? (

                                            <img
                                                src={
                                                    product.thumbnail
                                                }
                                                alt={
                                                    product.title
                                                }
                                                className="w-full h-full object-cover"
                                                onError={(
                                                    event
                                                ) => {
                                                    event.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center">

                                                <ImageIcon
                                                    size={
                                                        40
                                                    }
                                                    className="text-gray-300"
                                                />

                                            </div>

                                        )}

                                    </div>


                                    {/* INFO */}

                                    <div className="p-4">

                                        <div className="flex items-start justify-between gap-3">

                                            <div>

                                                <h3 className="font-semibold text-gray-900">
                                                    {
                                                        product.title
                                                    }
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {
                                                        product.brand
                                                    }
                                                </p>

                                            </div>


                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${product.status ===
                                                    "Inactive"
                                                    ? "bg-red-50 text-red-600"
                                                    : "bg-green-50 text-green-700"
                                                    }`}
                                            >
                                                {
                                                    product.status
                                                }
                                            </span>

                                        </div>


                                        <div className="flex items-center justify-between mt-4">

                                            <span className="font-semibold">
                                                ₹
                                                {Number(
                                                    product.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                Stock:{" "}
                                                {
                                                    product.stock
                                                }
                                            </span>

                                        </div>


                                        <div className="flex gap-2 mt-4">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditProduct(
                                                        product
                                                    )
                                                }
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 rounded-xl text-sm hover:bg-gray-900 hover:text-white"
                                            >
                                                <Pencil
                                                    size={
                                                        15
                                                    }
                                                />

                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteProduct(
                                                        product.id
                                                    )
                                                }
                                                className="px-3 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white"
                                            >
                                                <Trash2
                                                    size={
                                                        15
                                                    }
                                                />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}


// ==========================================================
// SHOP CATEGORY MODAL
// ==========================================================

function CategoryModal({
    editingCategoryId,
    categoryForm,
    categoryFileRef,
    categoryImageError,
    handleCategoryChange,
    handleCategoryImageUpload,
    saveCategory,
    closeCategoryForm,
    setCategoryImageError,
}) {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCategoryForm(); }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
                <div className="sticky top-0 z-20 bg-white border-b px-5 sm:px-7 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400">Homepage</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">{editingCategoryId ? "Edit Category" : "Add Category"}</h2>
                    </div>
                    <button type="button" onClick={closeCategoryForm} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600"><X size={20} /></button>
                </div>

                <form onSubmit={saveCategory} className="p-5 sm:p-7">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Category Image</label>
                            <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                                {categoryForm.image && !categoryImageError ? (
                                    <img src={categoryForm.image} alt="Category preview" className="w-full h-full object-cover" onError={() => setCategoryImageError(true)} />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400"><ImageIcon size={45} /><p className="text-sm mt-3">{categoryImageError ? "Image could not be loaded" : "No image selected"}</p></div>
                                )}
                            </div>
                            <input ref={categoryFileRef} type="file" accept="image/*" onChange={handleCategoryImageUpload} className="hidden" />
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <button type="button" onClick={() => categoryFileRef.current?.click()} className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"><Upload size={17} /> Upload Image</button>
                                {categoryForm.image ? (
                                    <button type="button" onClick={() => handleCategoryChange({ target: { name: "image", value: "", type: "text" } })} className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50"><Trash2 size={17} /> Remove</button>
                                ) : (
                                    <div className="flex items-center justify-center text-sm text-gray-400">JPG / PNG / WEBP</div>
                                )}
                            </div>
                            <div className="mt-5">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Or Paste Image URL</label>
                                <input type="url" name="image" value={categoryForm.image || ""} onChange={handleCategoryChange} placeholder="https://example.com/category.jpg" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-gray-900" />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <TextInput label="Category Name" name="title" value={categoryForm.title} onChange={handleCategoryChange} placeholder="Women" required />
                            <TextArea label="Subtitle" name="subtitle" value={categoryForm.subtitle} onChange={handleCategoryChange} rows={3} placeholder="Dresses, tops & everyday essentials" />
                            <TextInput label="Shop Link" name="link" value={categoryForm.link} onChange={handleCategoryChange} placeholder="/women" />
                            <TextInput label="Number" name="number" value={categoryForm.number} onChange={handleCategoryChange} placeholder="01" />
                            <label className="flex items-center justify-between gap-4 border border-gray-200 rounded-xl p-4 cursor-pointer">
                                <span><span className="block font-semibold text-gray-900">Show category</span><span className="block text-xs text-gray-500 mt-1">Display this card on the homepage.</span></span>
                                <input type="checkbox" name="visible" checked={categoryForm.visible} onChange={handleCategoryChange} className="w-5 h-5" />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t mt-8 pt-6">
                        <button type="button" onClick={closeCategoryForm} className="px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-950 text-white rounded-xl hover:bg-gray-800"><Save size={17} /> {editingCategoryId ? "Update Category" : "Add Category"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


// ==========================================================
// PRODUCT MODAL
// ==========================================================

function ProductModal({
    editingId,
    productForm,
    handleProductChange,
    handleProductSubmit,
    closeProductForm,
    productFileRef,
    handleProductImageUpload,
    removeProductImage,
    productImageError,
    setProductImageError,
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    closeProductForm();
                }
            }}
        >

            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />


            <div
                className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="sticky top-0 z-20 bg-white border-b px-5 sm:px-7 py-5 flex items-center justify-between">

                    <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400">
                            Products
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-1">

                            {editingId !== null
                                ? "Edit Product"
                                : "Add Product"}

                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={
                            closeProductForm
                        }
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* FORM */}

                <form
                    onSubmit={
                        handleProductSubmit
                    }
                    className="p-5 sm:p-7"
                >

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                        {/* ==================================================
                            PRODUCT IMAGE
                        ================================================== */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Product Image
                            </label>


                            {/* PREVIEW */}

                            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">

                                {productForm.image &&
                                    !productImageError ? (

                                    <img
                                        src={
                                            productForm.image
                                        }
                                        alt="Product preview"
                                        className="w-full h-full object-cover"
                                        onError={() =>
                                            setProductImageError(
                                                true
                                            )
                                        }
                                    />

                                ) : (

                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">

                                        <ImageIcon
                                            size={
                                                45
                                            }
                                        />

                                        <p className="text-sm mt-3">
                                            {productImageError
                                                ? "Image could not be loaded"
                                                : "No image selected"}
                                        </p>

                                    </div>

                                )}

                            </div>


                            {/* FILE INPUT */}

                            <input
                                ref={
                                    productFileRef
                                }
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleProductImageUpload
                                }
                                className="hidden"
                            />


                            {/* BUTTONS */}

                            <div className="grid grid-cols-2 gap-3 mt-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        productFileRef.current?.click()
                                    }
                                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    <Upload
                                        size={
                                            17
                                        }
                                    />

                                    Upload Image
                                </button>


                                {productForm.image ? (

                                    <button
                                        type="button"
                                        onClick={
                                            removeProductImage
                                        }
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50"
                                    >
                                        <Trash2
                                            size={
                                                17
                                            }
                                        />

                                        Remove
                                    </button>

                                ) : (

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        JPG / PNG / WEBP
                                    </div>

                                )}

                            </div>


                            {/* ==================================================
                                IMAGE URL
                            ================================================== */}

                            <div className="mt-5">

                                <label
                                    htmlFor="product-image-url"
                                    className="block text-sm font-semibold text-gray-900 mb-2"
                                >
                                    Or Paste Image URL
                                </label>

                                <input
                                    id="product-image-url"
                                    type="url"
                                    name="image"
                                    value={
                                        productForm.image ||
                                        ""
                                    }
                                    onChange={
                                        handleProductChange
                                    }
                                    placeholder="https://example.com/product-image.jpg"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                                />

                                <p className="text-xs text-gray-400 mt-2">
                                    Paste the direct address of the product image.
                                </p>

                            </div>


                            {/* IMAGE ERROR */}

                            {productImageError && (

                                <div className="mt-3 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
                                    The image URL is invalid or the image cannot be loaded.
                                </div>

                            )}

                        </div>


                        {/* ==================================================
                            PRODUCT INFORMATION
                        ================================================== */}

                        <div className="space-y-5">

                            <TextInput
                                label="Product Name"
                                name="name"
                                value={
                                    productForm.name
                                }
                                onChange={
                                    handleProductChange
                                }
                                placeholder="Classic Linen Shirt"
                                required
                            />


                            <div>

                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={
                                        productForm.category
                                    }
                                    onChange={
                                        handleProductChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-gray-900"
                                >

                                    <option value="women">
                                        Women
                                    </option>

                                    <option value="men">
                                        Men
                                    </option>

                                    <option value="mens-shirts">
                                        Men's Shirts
                                    </option>

                                    <option value="tops">
                                        Tops
                                    </option>

                                    <option value="accessories">
                                        Accessories
                                    </option>

                                    <option value="jewellery">
                                        Jewellery
                                    </option>

                                    <option value="footwear">
                                        Footwear
                                    </option>

                                </select>

                            </div>


                            <div className="grid grid-cols-2 gap-4">

                                <TextInput
                                    label="Price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    value={
                                        productForm.price
                                    }
                                    onChange={
                                        handleProductChange
                                    }
                                    placeholder="2499"
                                    required
                                />

                                <TextInput
                                    label="Stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    value={
                                        productForm.stock
                                    }
                                    onChange={
                                        handleProductChange
                                    }
                                    placeholder="20"
                                    required
                                />

                            </div>


                            <TextInput
                                label="Brand"
                                name="brand"
                                value={
                                    productForm.brand
                                }
                                onChange={
                                    handleProductChange
                                }
                                placeholder="Norden"
                            />


                            <div>

                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        productForm.status
                                    }
                                    onChange={
                                        handleProductChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-gray-900"
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            <TextArea
                                label="Description"
                                name="description"
                                value={
                                    productForm.description
                                }
                                onChange={
                                    handleProductChange
                                }
                                rows={5}
                                placeholder="Describe this product..."
                            />

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t mt-8 pt-6">

                        <button
                            type="button"
                            onClick={
                                closeProductForm
                            }
                            className="px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-950 text-white rounded-xl hover:bg-gray-800"
                        >
                            <Save size={17} />

                            {editingId !== null
                                ? "Update Product"
                                : "Add Product"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


// ==========================================================
// TEXT INPUT
// ==========================================================

function TextInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    min,
}) {
    return (
        <div>

            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-900 mb-2"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
            />

        </div>
    );
}


// ==========================================================
// TEXT AREA
// ==========================================================

function TextArea({
    label,
    name,
    value,
    onChange,
    rows = 5,
    placeholder = "",
}) {
    return (
        <div>

            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-900 mb-2"
            >
                {label}
            </label>

            <textarea
                id={name}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-y focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition"
            />

        </div>
    );
}


// ==========================================================
// IMAGE UPLOADER
// ==========================================================

function ImageUploader({
    title,
    description,
    image,
    inputRef,
    onUpload,
    onRemove,
    imageError,
    setImageError,
    onImageUrlChange,
}) {
    return (
        <div>

            <div className="mb-3">

                <label className="block text-sm font-semibold text-gray-900">
                    {title}
                </label>

                <p className="text-xs text-gray-400 mt-1">
                    {description}
                </p>

            </div>


            {/* IMAGE */}

            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">

                {image &&
                    !imageError ? (

                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={() =>
                            setImageError(
                                true
                            )
                        }
                    />

                ) : (

                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">

                        <ImageIcon
                            size={40}
                        />

                        <p className="text-sm mt-3">
                            {imageError
                                ? "Image could not be loaded"
                                : "No image selected"}
                        </p>

                    </div>

                )}

            </div>


            {/* FILE */}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onUpload}
                className="hidden"
            />


            {/* CONTROLS */}

            <div className="flex gap-3 mt-4">

                <button
                    type="button"
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                    <Upload size={17} />

                    Upload Image
                </button>


                {image && (

                    <button
                        type="button"
                        onClick={
                            onRemove
                        }
                        className="px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50"
                    >
                        <Trash2
                            size={17}
                        />
                    </button>

                )}

            </div>


            {/* URL */}

            <div className="mt-4">

                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Or Paste Image URL
                </label>

                <input
                    type="url"
                    value={image || ""}
                    onChange={(event) =>
                        onImageUrlChange(
                            event.target.value
                        )
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-gray-900"
                />

            </div>

        </div>
    );
}


// ==========================================================
// STAT CARD
// ==========================================================

function StatCard({
    title,
    value,
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <p className="text-xs uppercase tracking-wider text-gray-400">
                {title}
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
                {value}
            </p>

        </div>
    );
}


export default AdminDashboard;