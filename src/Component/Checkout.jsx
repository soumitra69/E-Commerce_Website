import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { ArrowLeft, Check } from "lucide-react";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

function Checkout() {
    const navigate = useNavigate();

    const { cartItems, cartTotal, clearCart } = useCart();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [loading, setLoading] = useState(false);

    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("en-IN");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const required = [
            "firstName",
            "lastName",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "pincode",
        ];

        for (const field of required) {
            if (!form[field].trim()) {
                alert("Please fill all address details.");
                return false;
            }
        }

        if (form.phone.length < 10) {
            alert("Please enter a valid phone number.");
            return false;
        }

        if (form.pincode.length !== 6) {
            alert("Please enter a valid 6 digit PIN code.");
            return false;
        }

        return true;
    };

    const placeOrder = () => {
        if (!validateForm()) return;

        setLoading(true);

        const order = {
            orderId:
                "NOR" +
                Date.now().toString().slice(-8),

            customer: form,

            items: cartItems,

            subtotal: cartTotal,

            shipping: 0,

            total: cartTotal,

            paymentMethod,

            status: "Order Placed",

            createdAt: new Date().toISOString(),
        };

        // Save order locally
        localStorage.setItem(
            "norden_last_order",
            JSON.stringify(order)
        );

        // Clear cart
        clearCart();

        setTimeout(() => {
            setLoading(false);
            navigate("/order-success");
        }, 700);
    };

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
                        text-center
                        px-6
                    "
                >
                    <Check
                        size={45}
                        strokeWidth={1}
                        className="mb-6 text-[#5F6B4A]"
                    />

                    <h1 className="font-display text-4xl mb-4">
                        Your cart is empty
                    </h1>

                    <button
                        onClick={() => navigate("/women")}
                        className="
                            px-8
                            py-4
                            bg-[#201E1B]
                            text-[#F1ECE1]
                            uppercase
                            tracking-widest
                            text-xs
                        "
                    >
                        Continue Shopping
                    </button>
                </main>

                <Footer />
            </div>
        );
    }

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
                {/* HEADER */}

                <button
                    onClick={() => navigate("/cart")}
                    className="
                        flex
                        items-center
                        gap-2
                        font-mono
                        text-xs
                        uppercase
                        tracking-widest
                        text-[#5F6B4A]
                        mb-8
                    "
                >
                    <ArrowLeft size={14} />
                    Back to Cart
                </button>

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
                    Norden / Checkout
                </p>

                <h1
                    className="
                        font-display
                        text-5xl
                        md:text-7xl
                        mb-12
                    "
                >
                    Checkout
                </h1>

                <div
                    className="
                        grid
                        lg:grid-cols-[1fr_380px]
                        gap-10
                        lg:gap-16
                    "
                >
                    {/* LEFT */}

                    <section>
                        <div
                            className="
                                border
                                border-[#C8C0B0]
                                p-6
                                md:p-8
                            "
                        >
                            <h2 className="font-display text-2xl mb-7">
                                Delivery Address
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="checkout-input"
                                />

                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="checkout-input"
                                />

                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    type="tel"
                                    maxLength={10}
                                    className="checkout-input"
                                />

                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    type="email"
                                    className="checkout-input"
                                />

                                <textarea
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Full Address"
                                    rows="4"
                                    className="
                                        checkout-input
                                        sm:col-span-2
                                        resize-none
                                    "
                                />

                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="checkout-input"
                                />

                                <input
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="checkout-input"
                                />

                                <input
                                    name="pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    placeholder="PIN Code"
                                    maxLength={6}
                                    className="checkout-input"
                                />
                            </div>
                        </div>

                        {/* PAYMENT */}

                        <div
                            className="
                                border
                                border-[#C8C0B0]
                                p-6
                                md:p-8
                                mt-8
                            "
                        >
                            <h2 className="font-display text-2xl mb-7">
                                Payment Method
                            </h2>

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    border
                                    border-[#BEB6A6]
                                    p-4
                                    cursor-pointer
                                "
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div>
                                    <p className="text-sm">
                                        Cash on Delivery
                                    </p>

                                    <p className="text-xs text-[#6b675f] mt-1">
                                        Pay when your order arrives.
                                    </p>
                                </div>
                            </label>

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    border
                                    border-[#BEB6A6]
                                    p-4
                                    mt-3
                                    cursor-pointer
                                "
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div>
                                    <p className="text-sm">
                                        Online Payment
                                    </p>

                                    <p className="text-xs text-[#6b675f] mt-1">
                                        Demo payment option.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* RIGHT */}

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
                            <h2 className="font-display text-2xl mb-7">
                                Your Order
                            </h2>

                            <div className="space-y-5">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="
                                            flex
                                            gap-4
                                            border-b
                                            border-[#BEB6A6]
                                            pb-5
                                        "
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="
                                                w-16
                                                h-20
                                                object-cover
                                            "
                                        />

                                        <div className="flex-1">
                                            <p className="text-sm">
                                                {item.title}
                                            </p>

                                            <p className="font-mono text-xs mt-2">
                                                Qty: {item.quantity}
                                            </p>

                                            <p className="font-mono text-sm mt-2">
                                                ₹
                                                {formatPrice(
                                                    Number(item.price) *
                                                    Number(item.quantity)
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="
                                    flex
                                    justify-between
                                    border-b
                                    border-[#BEB6A6]
                                    py-5
                                "
                            >
                                <span className="text-sm">
                                    Subtotal
                                </span>

                                <span className="font-mono text-sm">
                                    ₹{formatPrice(cartTotal)}
                                </span>
                            </div>

                            <div
                                className="
                                    flex
                                    justify-between
                                    py-5
                                "
                            >
                                <span className="font-display text-xl">
                                    Total
                                </span>

                                <span className="font-mono text-lg">
                                    ₹{formatPrice(cartTotal)}
                                </span>
                            </div>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={placeOrder}
                                className="
                                    w-full
                                    py-4
                                    bg-[#201E1B]
                                    text-[#F1ECE1]
                                    uppercase
                                    tracking-widest
                                    text-xs
                                    hover:bg-[#5F6B4A]
                                    disabled:opacity-50
                                    transition
                                "
                            >
                                {loading
                                    ? "Placing Order..."
                                    : "Place Order"}
                            </button>

                            <p
                                className="
                                    text-[11px]
                                    leading-5
                                    text-[#6b675f]
                                    text-center
                                    mt-5
                                "
                            >
                                By placing your order, you agree to our
                                terms and conditions.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />

            <style>{`
                .checkout-input {
                    width: 100%;
                    border: 1px solid #BEB6A6;
                    background: transparent;
                    padding: 14px 16px;
                    outline: none;
                    font-size: 14px;
                    color: #201E1B;
                }

                .checkout-input:focus {
                    border-color: #5F6B4A;
                }

                .checkout-input::placeholder {
                    color: #6b675f;
                }
            `}</style>
        </div>
    );
}

export default Checkout;