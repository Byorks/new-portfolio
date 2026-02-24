const Footer = () => {
  return (
    <footer className="bg-background/50 border border-border px-6 sm:px-12 py-4 m-4 sm:m-7 rounded-sm">
      <div className="w-full h-full flex justify-between sm:items-center flex-col sm:flex-row gap-4 ">
        <p>© 2025 Vanessa Byork</p>

        <div className="flex gap-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 14H14V24H24V14Z" fill="white" />
            <path d="M24 0H14V10H24V0Z" fill="white" />
            <path d="M10 0H0V10H10V0Z" fill="white" />
            <path d="M10 14H0V24H10V14Z" fill="white" />
          </svg>

          <p>Built with React · CSS · GSAP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
