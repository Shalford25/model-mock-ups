export default function AboutUs() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-5">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">About Model Mock-Ups</h1>
                <p className="text-lg text-gray-700">
                    Your one-stop shop for high-quality model kits and collectibles.
                </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl text-left">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    Our Mission
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    At <span className="text-blue-500 font-bold">Model Mock-Ups</span>, our mission is to inspire creativity and passion 
                    by providing the finest selection of model kits and collectibles. We are committed to delivering 
                    exceptional quality, outstanding customer service, and a seamless shopping experience for hobbyists 
                    and collectors alike.
                </p>
            </div>

            <div className="mt-12 max-w-4xl text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    We are a team of passionate model enthusiasts who understand the joy of building and collecting. 
                    Our goal is to bring you the best products from around the world, whether you're a beginner or a seasoned pro.
                </p>
            </div>

            <div className="mt-12 max-w-4xl text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Get in Touch</h2>
                <p className="text-lg text-gray-600 leading-relaxed text-left">
                    Have questions or feedback? We'd love to hear from you! Reach out to us at{" "}
                    <a href="mailto:support@modelmockups.com" className="text-blue-500 underline">
                        support@modelmockups.com
                    </a>{" "}
                    or connect with us on social media.
                </p>
            </div>
        </div>
    );
}