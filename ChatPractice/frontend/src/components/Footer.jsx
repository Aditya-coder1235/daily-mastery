const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-slate-400">
        Copyright © {new Date().getFullYear()} MERN Auth. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
