import React from "react";

const About = () => {
  return (
    <div className="mx-auto max-w-6xl py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-8 text-center">About Us</h2>

      <div className="mb-12 text-center">
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Welcome to <span className="font-semibold">e-SHOP</span>, your trusted
          destination for quality products at affordable prices. Our goal is to
          provide a seamless online shopping experience with a wide range of
          products to suit every need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make online shopping simple, reliable, and
            enjoyable. We focus on delivering high-quality products, excellent
            customer service, and fast delivery to our customers.
          </p>   
        </div>    

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            We aim to become a leading e-commerce platform by continuously
            improving our services, expanding our product range, and embracing
            innovation to meet customer expectations.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Why Choose e-SHOP?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="font-semibold mb-2">Quality Products</h4>
            <p className="text-gray-600 text-sm">
              We carefully select products to ensure quality and reliability.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="font-semibold mb-2">Best Prices</h4>
            <p className="text-gray-600 text-sm">
              Competitive pricing without compromising on quality.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="font-semibold mb-2">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">
              Quick and reliable delivery across multiple locations.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="font-semibold mb-2">Customer Support</h4>
            <p className="text-gray-600 text-sm">
              Friendly and responsive support whenever you need help.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500">
          Thank you for choosing <span className="font-semibold">e-SHOP</span>.
          We look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default About;
