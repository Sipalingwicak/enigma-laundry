import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <header
          className="relative bg-cover bg-center backdrop-blur-sm text-emerald-300 text-center py-20"
          style={{ backgroundImage: "url('/Signup.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold">Welcome to Enigma Laundry</h1>
            <p className="mt-4 text-lg">
              Your one-stop solution for laundry problems.
            </p>
            <Link to={"/register"}>
              <button className="mt-6 bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
                Get Started
              </button>
            </Link>
          </div>
        </header>

        {/* Our Features Section */}
        <section className="py-12 px-6 bg-gray-100 text-center flex-grow">
          <h2 className="text-2xl font-bold text-gray-900">Our Features</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Fast Performance
              </h3>
              <p className="mt-2 text-gray-600">
                Experience lightning-fast speed with our platform.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Secure & Reliable
              </h3>
              <p className="mt-2 text-gray-600">
                Your data is always safe and secure with us.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Easy to Use
              </h3>
              <p className="mt-2 text-gray-600">
                Simple interface that anyone can navigate.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 px-6 text-center bg-gray-100 w-full">
          <h2 className="text-2xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Testimonial Card */}
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
              <p className="italic text-gray-700">
                "This platform is amazing! It changed my life!"
              </p>
              <h4 className="mt-4 font-semibold text-gray-900">- John Doe</h4>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
              <p className="italic text-gray-700">
                "The best service I've ever used. Highly recommended!"
              </p>
              <h4 className="mt-4 font-semibold text-gray-900">- Jane Smith</h4>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-200">
              <p className="italic text-gray-700">
                "Super easy to use and the team is very supportive."
              </p>
              <h4 className="mt-4 font-semibold text-gray-900">- Alex Brown</h4>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
