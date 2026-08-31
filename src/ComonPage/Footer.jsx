import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-black/10 bg-[#EAE3D3]">

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">

                {/* Brand */}
                <div className="col-span-2">

                    <Link
                        to="/dashboard"
                        className="font-display text-xl mb-3 block hover:opacity-60 transition-opacity"
                    >
                        NORDEN
                    </Link>

                    <p className="text-sm text-[#4a4740] max-w-xs leading-relaxed">
                        Slow-made clothing from natural fiber,
                        shipped from Bergen since 2026.
                    </p>

                </div>


                {/* Shop */}
                <div>

                    <p className="font-mono text-xs uppercase tracking-wide mb-4">
                        Shop
                    </p>

                    <ul className="space-y-2.5">

                        <li>
                            <Link
                                to="/women"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Women
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/men"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Men
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/accessories"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Accessories
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/sale"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Sale
                            </Link>
                        </li>

                    </ul>

                </div>


                {/* Company */}
                <div>

                    <p className="font-mono text-xs uppercase tracking-wide mb-4">
                        Company
                    </p>

                    <ul className="space-y-2.5">

                        <li>
                            <Link
                                to="/about"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                About
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/journal"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Journal
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/careers"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Careers
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/adminlogin"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Admin Login
                            </Link>
                        </li>

                    </ul>

                </div>


                {/* Support */}
                <div>

                    <p className="font-mono text-xs uppercase tracking-wide mb-4">
                        Support
                    </p>

                    <ul className="space-y-2.5">

                        <li>
                            <Link
                                to="/shipping"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Shipping
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/returns"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Returns
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/size-guide"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Size guide
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className="text-sm text-[#4a4740] hover:text-[#201E1B]"
                            >
                                Contact
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>


            {/* Bottom */}
            <div className="border-t border-black/10 max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between gap-2 font-mono text-xs text-[#4a4740]">

                <span>
                    © 2026 Norden. All rights reserved.
                </span>

                <span>
                    Made in Bergen, shipped everywhere.
                </span>

            </div>

        </footer>
    );
}

export default Footer;