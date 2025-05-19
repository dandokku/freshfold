import React from 'react';
import Map from './Map';
import ContactImage from '../../Assets/Images/contactus.svg';

const Contact = () => {
  return (
    <section className="pt-20 bg-lightbg">
      <div className="container mx-auto px-5 py-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-headerTextColor mb-10">
          Get in touch with us
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Side Image */}
          <div className="hidden md:flex justify-center flex-1">
            <img
              src={ContactImage}
              alt="Contact illustration"
              className="h-[50vh] lg:h-[70vh] w-full max-w-[300px] object-contain rounded-md"
            />
          </div>

          {/* Contact Form */}
          <div className="w-full flex-1 bg-whiteColor shadow-shadColor p-6 md:p-10 rounded-md">
            <h3 className="text-2xl md:text-3xl font-semibold text-secondaryColor mb-6">
              Write a message
            </h3>

            <form className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm mb-1 text-gray-700">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full p-3 border border-textColor rounded-md outline-none focus:border-secondaryColor"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">Your Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full p-3 border border-textColor rounded-md outline-none focus:border-secondaryColor"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-1 text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Type your message..."
                  className="w-full p-3 border border-textColor rounded-md outline-none focus:border-secondaryColor resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 mt-2 rounded-md bg-textColor text-whiteColor font-medium hover:bg-whiteColor hover:text-textColor border border-headerTextColor transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Embedded Map */}
      <Map />
    </section>
  );
};

export default Contact;
