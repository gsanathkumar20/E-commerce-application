import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900  text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FootwearHub</h3>
            <p className="text-gray-400 mb-4">
              Quality footwear for every occasion. Find your perfect pair with
              us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/?category=sneakers"
                  className="text-gray-400 hover:text-white"
                >
                  Sneakers
                </a>
              </li>
              <li>
                <a
                  href="/?category=athletic"
                  className="text-gray-400 hover:text-white"
                >
                  Athletic Shoes
                </a>
              </li>
              <li>
                <a
                  href="/?category=formal"
                  className="text-gray-400 hover:text-white"
                >
                  Formal Shoes
                </a>
              </li>
              <li>
                <a
                  href="/?category=casual"
                  className="text-gray-400 hover:text-white"
                >
                  Casual Shoes
                </a>
              </li>
              <li>
                <a
                  href="/?category=boots"
                  className="text-gray-400 hover:text-white"
                >
                  Boots
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-400">123 Shoe Street, ABC City</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white"
                >
                  (+91) 123-456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <a
                  href="mailto:info@footwearhub.com"
                  className="text-gray-400 hover:text-white"
                >
                  abc@footwearhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>Made with 💖 by Sanath Kumar</p>
          <p className="text-[10px]">
            © {new Date().getFullYear()} FootwearHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
