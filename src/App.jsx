import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


// ==========================================
// USER COMPONENTS
// ==========================================

import Dashboard from "./Component/Dashboard";
import Men from "./Component/Men";
import Women from "./Component/Women";
import Accessories from "./Component/Accessories ";
import Journal from "./Component/Journal";
import SearchPage from "./ComonPage/Search";


// ==========================================
// PRODUCT
// ==========================================

import ProductDetail from "./Component/ProductDetails";


// ==========================================
// CART PAGE
// ==========================================

import Cart from "./Component/Cart";


// ==========================================
// ADMIN
// ==========================================

import AdminDashboard from "./Admin/Admindashbord";
import Adminlogin from "./Admin/Adminlogin";


// ==========================================
// CART CONTEXT
// ==========================================

import { CartProvider } from "./Context/CartContext";


function App() {

    return (

        <CartProvider>

            <Routes>

                {/* ==========================================
                    USER ROUTES
                ========================================== */}


                {/* HOME */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                />


                {/* MEN */}

                <Route
                    path="/men"
                    element={
                        <Men />
                    }
                />


                {/* WOMEN */}

                <Route
                    path="/women"
                    element={
                        <Women />
                    }
                />


                {/* ACCESSORIES */}

                <Route
                    path="/accessories"
                    element={
                        <Accessories />
                    }
                />


                {/* JOURNAL */}

                <Route
                    path="/journal"
                    element={
                        <Journal />
                    }
                />


                {/* SEARCH */}

                <Route
                    path="/search"
                    element={
                        <SearchPage />
                    }
                />


                {/* ==========================================
                    PRODUCT DETAILS
                ========================================== */}

                <Route
                    path="/product/:id"
                    element={
                        <ProductDetail />
                    }
                />


                {/* ==========================================
                    CART
                ========================================== */}

                <Route
                    path="/cart"
                    element={
                        <Cart />
                    }
                />


                {/* ==========================================
                    ADMIN ROUTES
                ========================================== */}


                {/* ADMIN LOGIN */}

                <Route
                    path="/adminlogin"
                    element={
                        <Adminlogin />
                    }
                />


                {/* ADMIN DASHBOARD */}

                <Route
                    path="/admindashboard"
                    element={
                        <AdminDashboard />
                    }
                />


                {/* ==========================================
                    404
                ========================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </CartProvider>

    );

}


export default App;