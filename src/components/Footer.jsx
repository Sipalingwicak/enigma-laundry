const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <a className="flex text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <img
                src="../src/assets/laundry-logo.svg"
                alt="laundry-logo"
                className="w-10 h-10 mr-4"
              />

              <span className="font-bold text-md text-left leading-tight text-emerald-800">
                Enigma <br />
                Laundry
              </span>
            </a>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
