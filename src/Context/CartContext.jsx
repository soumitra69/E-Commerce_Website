import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";


// ==================================================
// CREATE CART CONTEXT
// ==================================================

const CartContext = createContext();


// ==================================================
// CART PROVIDER
// ==================================================

export function CartProvider({ children }) {

    // ==================================================
    // LOAD CART
    // ==================================================

    const [cartItems, setCartItems] = useState(() => {

        try {

            const savedCart =
                localStorage.getItem("cartItems");

            if (!savedCart) {
                return [];
            }

            const parsedCart =
                JSON.parse(savedCart);

            return Array.isArray(parsedCart)
                ? parsedCart
                : [];

        } catch (error) {

            console.error(
                "Error loading cart:",
                error
            );

            return [];

        }

    });


    // ==================================================
    // SAVE CART
    // ==================================================

    useEffect(() => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);


    // ==================================================
    // ADD TO CART
    // ==================================================

    const addToCart = (product) => {

        if (!product || !product.id) {
            console.error(
                "Invalid product:",
                product
            );

            return;
        }


        setCartItems((currentItems) => {

            const existingItem =
                currentItems.find(
                    (item) =>
                        String(item.id) ===
                        String(product.id)
                );


            // PRODUCT ALREADY IN CART

            if (existingItem) {

                return currentItems.map(
                    (item) => {

                        if (
                            String(item.id) ===
                            String(product.id)
                        ) {

                            return {
                                ...item,
                                quantity:
                                    Number(
                                        item.quantity || 0
                                    ) + 1,
                            };

                        }

                        return item;

                    }
                );

            }


            // NEW PRODUCT

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];

        });

    };


    // ==================================================
    // REMOVE FROM CART
    // ==================================================

    const removeFromCart = (productId) => {

        setCartItems((currentItems) => {

            return currentItems.filter(
                (item) =>
                    String(item.id) !==
                    String(productId)
            );

        });

    };


    // ==================================================
    // INCREASE QUANTITY
    // ==================================================

    const increaseQuantity = (productId) => {

        setCartItems((currentItems) => {

            return currentItems.map(
                (item) => {

                    if (
                        String(item.id) ===
                        String(productId)
                    ) {

                        return {
                            ...item,
                            quantity:
                                Number(
                                    item.quantity || 0
                                ) + 1,
                        };

                    }

                    return item;

                }
            );

        });

    };


    // ==================================================
    // DECREASE QUANTITY
    // ==================================================

    const decreaseQuantity = (productId) => {

        setCartItems((currentItems) => {

            return currentItems
                .map((item) => {

                    if (
                        String(item.id) ===
                        String(productId)
                    ) {

                        return {
                            ...item,
                            quantity:
                                Number(
                                    item.quantity || 0
                                ) - 1,
                        };

                    }

                    return item;

                })
                .filter(
                    (item) =>
                        Number(
                            item.quantity || 0
                        ) > 0
                );

        });

    };


    // ==================================================
    // CLEAR CART
    // ==================================================

    const clearCart = () => {

        setCartItems([]);

    };


    // ==================================================
    // CART COUNT
    // ==================================================

    const cartCount =
        cartItems.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    // ==================================================
    // CART TOTAL
    // ==================================================

    const cartTotal =
        cartItems.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    // ==================================================
    // CONTEXT VALUE
    // ==================================================

    const value = {

        cartItems,

        cartCount,

        cartTotal,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

    };


    // ==================================================
    // PROVIDER
    // ==================================================

    return (

        <CartContext.Provider value={value}>

            {children}

        </CartContext.Provider>

    );

}


// ==================================================
// USE CART
// IMPORTANT: THIS EXPORT FIXES YOUR ERROR
// ==================================================

export function useCart() {

    const context =
        useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }


    return context;

}