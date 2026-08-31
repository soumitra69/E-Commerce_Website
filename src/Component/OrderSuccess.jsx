import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Package } from "lucide-react";

import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

function OrderSuccess() {
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("norden_last_order");

        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("en-IN");
    };

    if (!order) {
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
                    <h1 className="font-display text-4xl mb-6">
                        No Order Found
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
                    max-w-4xl
                    mx-auto
                    px-4
                    sm:px-6
                    py-14
                    md:py-20
                "
            >
                {/* SUCCESS */}

                <div className="text-center">
                    <div
                        className="
                            w-20
                            h-20
                            mx-auto
                            rounded-full
                            bg-[#5F6B4A]
                            text-[#F1ECE1]
                            flex
                            items-center
                            justify-center
                            mb-7
                        "
                    >
                        <Check size={40} />
                    </div>

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
                        Norden / Order Confirmation
                    </p>

                    <h1
                        className="
                            font-display
                            text-5xl
                            md:text-7xl
                            mb-5
                        "
                    >
                        Order Placed
                    </h1>

                    <p
                        className="
                            text-[#4a4740]
                            max-w-lg
                            mx-auto
                            leading-relaxed
                        "
                    >
                        Thank you for shopping with Norden. Your order has
                        been successfully placed.
                    </p>
                </div>

                {/* ORDER INFO */}

                <div
                    className="
                        bg-[#DED7C8]
                        p-6
                        md:p-8
                        mt-12
                    "
                >
                    <div
                        className="
                            grid
                            sm:grid-cols-3
                            gap-6
                            border-b
                            border-[#BEB6A6]
                            pb-6
                        "
                    >
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b675f]">
                                Order Number
                            </p>

                            <p className="font-mono text-sm mt-2">
                                #{order.orderId}
                            </p>
                        </div>

                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b675f]">
                                Payment
                            </p>

                            <p className="text-sm mt-2">
                                {order.paymentMethod === "cod"
                                    ? "Cash on Delivery"
                                    : "Online Payment"}
                            </p>
                        </div>

                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b675f]">
                                Status
                            </p>

                            <p className="text-sm mt-2 text-[#5F6B4A]">
                                {order.status}
                            </p>
                        </div>
                    </div>

                    {/* CUSTOMER */}

                    <div className="py-7 border-b border-[#BEB6A6]">
                        <h2 className="font-display text-2xl mb-4">
                            Delivery Address
                        </h2>

                        <p className="text-sm leading-6">
                            {order.customer.firstName}{" "}
                            {order.customer.lastName}
                            <br />

                            {order.customer.address}
                            <br />

                            {order.customer.city},{" "}
                            {order.customer.state} -{" "}
                            {order.customer.pincode}
                            <br />

                            Phone: {order.customer.phone}
                            <br />

                            Email: {order.customer.email}
                        </p>
                    </div>

                    {/* ITEMS */}

                    <div className="py-7">
                        <h2 className="font-display text-2xl mb-5">
                            Order Items
                        </h2>

                        <div className="space-y-5">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="
                                        flex
                                        gap-4
                                        items-center
                                    "
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="
                                            w-20
                                            h-24
                                            object-cover
                                        "
                                    />

                                    <div className="flex-1">
                                        <p className="text-sm">
                                            {item.title}
                                        </p>

                                        <p className="font-mono text-xs mt-2">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-mono text-sm">
                                        ₹
                                        {formatPrice(
                                            Number(item.price) *
                                                Number(item.quantity)
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TOTAL */}

                    <div
                        className="
                            border-t
                            border-[#BEB6A6]
                            pt-6
                            flex
                            justify-between
                            items-center
                        "
                    >
                        <span className="font-display text-2xl">
                            Total Paid
                        </span>

                        <span className="font-mono text-xl">
                            ₹{formatPrice(order.total)}
                        </span>
                    </div>
                </div>

                {/* TRACKING */}

                <div
                    className="
                        border
                        border-[#C8C0B0]
                        p-6
                        md:p-8
                        mt-8
                        flex
                        gap-5
                    "
                >
                    <Package
                        size={28}
                        strokeWidth={1}
                        className="text-[#5F6B4A] shrink-0"
                    />

                    <div>
                        <h3 className="font-display text-xl">
                            What happens next?
                        </h3>

                        <p
                            className="
                                text-sm
                                text-[#5f5a51]
                                leading-6
                                mt-2
                            "
                        >
                            We'll prepare your order and ship it to the
                            address provided above. You'll receive updates
                            as your order progresses.
                        </p>
                    </div>
                </div>

                {/* BUTTONS */}

                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                        mt-8
                    "
                >
                    <button
                        onClick={() => navigate("/women")}
                        className="
                            flex-1
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

                    <button
                        onClick={() => navigate("/")}
                        className="
                            flex-1
                            py-4
                            border
                            border-[#201E1B]
                            uppercase
                            tracking-widest
                            text-xs
                            hover:bg-[#DED7C8]
                            transition
                        "
                    >
                        Back to Home
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default OrderSuccess;