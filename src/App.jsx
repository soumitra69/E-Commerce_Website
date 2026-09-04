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
// CART / CHECKOUT
// ==========================================

import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
import OrderSuccess from "./Component/OrderSuccess";
import LoginSignup from "./Component/login-signup";
import Account from "./Component/Account";


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
                    HOME
                ========================================== */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* ==========================================
                    USER ROUTES
                ========================================== */}

                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                />

                <Route
                    path="/men"
                    element={
                        <Men />
                    }
                />

                <Route
                    path="/women"
                    element={
                        <Women />
                    }
                />

                <Route
                    path="/accessories"
                    element={
                        <Accessories />
                    }
                />

                <Route
                    path="/journal"
                    element={
                        <Journal />
                    }
                />

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
                    CHECKOUT
                ========================================== */}

                <Route
                    path="/checkout"
                    element={
                        <Checkout />
                    }
                />


                {/* ==========================================
                    ORDER SUCCESS
                ========================================== */}

                <Route
                    path="/order-success"
                    element={
                        <OrderSuccess />
                    }
                />

                <Route
                    path="/login-signup"
                    element={<LoginSignup />}
                />

                <Route
                    path="/account"
                    element={<Account />}
                />


                {/* ==========================================
                    ADMIN LOGIN
                ========================================== */}

                <Route
                    path="/adminlogin"
                    element={
                        <Adminlogin />
                    }
                />


                {/* ==========================================
                    ADMIN DASHBOARD
                ========================================== */}

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
