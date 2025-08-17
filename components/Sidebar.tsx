import { CiShoppingCart } from "react-icons/ci";
import { FaStore, FaBlog, FaEnvelope } from "react-icons/fa";
import { MdOutlineStorefront } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="fixed top-1/3 z-40 rounded-2xl left-2 h-fit max-md:top-0 max-md:flex-row max-md:justify-center  md:w-20 flex flex-col items-center md:py-6
      bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-lg">
      
      {/* Logo */}
      <div className="mb-10 cursor-pointer">
        <img
          src="/glitch.png"
          alt="Logo"
          className="w-10 h-10"
        />
      </div>

      {/* Links */}
      <nav className="flex flex-col max-md:flex-row gap-8">
        <a
          href="#shops"
          className="text-black hover:text-blue-400 flex flex-col items-center transition-colors duration-200"
          title="Shops"
        >
          <MdOutlineStorefront size={24} />
          <span className="text-sm">Shops</span>
        </a>
        <a
          href="#blogs"
          className="text-black hover:text-pink-400 flex flex-col items-center transition-colors duration-200"
          title="Blogs"
        >
          <FaBlog size={22} />
          <span>Blogs</span>
        </a>
        <a
          href="#contact"
          className="text-black hover:text-green-400 flex flex-col items-center transition-colors duration-200"
          title="Contact"
        >
          <FaEnvelope size={22} />
          <span>Contact</span>
        </a>

        <a
          href="/cart"
          className="text-black hover:text-green-400 flex flex-col items-center transition-colors duration-200"
          title="Contact"
        >
          <CiShoppingCart size={22}/>
          <span>Cart</span>
        </a>
      </nav>
    </div>
  );
}
