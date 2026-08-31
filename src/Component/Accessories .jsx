import Header from "../ComonPage/Header";
import Footer from "../ComonPage/Footer";

function Accessories() {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                background: "#F1ECE1",
                color: "#201E1B",
            }}
        >
            {/* Header */}
            <Header />

            {/* Coming Soon */}
            <main className="flex-1 flex items-center justify-center px-6 py-24">

                <div className="text-center max-w-2xl">

                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#9C4A2E] mb-6">
                        Norden / Accessories
                    </p>

                    <h1 className="font-display text-5xl md:text-7xl leading-tight">
                        Accessories
                    </h1>

                    <div className="w-16 h-px bg-[#201E1B]/30 mx-auto my-8" />

                    <h2 className="font-display text-3xl md:text-4xl italic">
                        Service Coming Soon
                    </h2>

                    <p className="mt-6 text-[#4a4740] leading-relaxed max-w-md mx-auto">
                        We're carefully preparing our accessories collection.
                        Bags, belts, scarves and more will be available soon.
                    </p>

                    <p className="mt-8 font-mono text-xs uppercase tracking-wide text-[#5F6B4A]">
                        Check back soon
                    </p>

                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Accessories;