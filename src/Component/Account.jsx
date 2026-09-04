import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag, UserRound } from "lucide-react";
import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";
import { useCart } from "../Context/CartContext";

export default function Account() {
    const navigate = useNavigate();
    const { cartCount, cartTotal } = useCart();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login-signup");
    };

    return (
        <div className="min-h-screen bg-[#F1ECE1] text-[#191817]">
            <Header />
            <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
                <div className="mb-10 flex items-end justify-between gap-5 border-b border-black/10 pb-6">
                    <div>
                        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#9C4A2E]">Your account</p>
                        <h1 className="font-display text-4xl sm:text-5xl">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
                    </div>
                    <UserRound size={30} strokeWidth={1.5} />
                </div>

                {!user ? (
                    <section className="border border-black/10 bg-white/50 p-8">
                        <h2 className="font-display text-2xl">Sign in to view your account</h2>
                        <p className="mt-3 max-w-lg text-sm text-black/60">Create an account to keep your cart, orders and profile details together.</p>
                        <Link to="/login-signup" className="mt-6 inline-flex bg-[#191817] px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#F1ECE1]">Login or sign up</Link>
                    </section>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2">
                        <section className="border border-black/10 bg-white/50 p-7">
                            <p className="font-mono text-xs uppercase tracking-widest text-black/50">Profile</p>
                            <h2 className="mt-5 font-display text-2xl">{user.name || "Norden customer"}</h2>
                            <p className="mt-2 text-sm text-black/60">{user.email || user.phone}</p>
                            <button type="button" onClick={signOut} className="mt-8 inline-flex items-center gap-2 border border-black/20 px-4 py-3 font-mono text-xs uppercase tracking-widest"><LogOut size={15} /> Sign out</button>
                        </section>
                        <section className="border border-black/10 bg-white/50 p-7">
                            <p className="font-mono text-xs uppercase tracking-widest text-black/50">Shopping bag</p>
                            <ShoppingBag className="mt-5" size={26} strokeWidth={1.5} />
                            <p className="mt-4 font-display text-2xl">{cartCount} {cartCount === 1 ? "item" : "items"}</p>
                            <p className="mt-2 text-sm text-black/60">Total: Rs. {cartTotal.toLocaleString("en-IN")}</p>
                            <Link to="/cart" className="mt-7 inline-flex bg-[#9C4A2E] px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#F1ECE1]">View cart</Link>
                        </section>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
