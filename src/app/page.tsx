"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const phrases = ["数字创意", "跨界设计", "技术创新", "极致体验"];

const NavigationItem = ({
  href,
  children,
  isMobile = false,
}: {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
}) => (
  <li className="group">
    <a
      href={href}
      className={`relative text-white transition-colors duration-300 hover:text-blue-400 ${
        isMobile ? "block py-2 px-4" : "inline-block"
      }`}
    >
      <span className="relative block pb-1">
        {children}
        <span className="absolute bottom-0 left-0 h-[3px] w-full origin-right scale-x-0 transform bg-blue-400 rounded transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"></span>
      </span>
    </a>
  </li>
);

const MobileNavItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <li>
    <a
      href={href}
      className="block py-2 px-4 text-white hover:bg-gray-800 rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  </li>
);

const Home = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const menuItems = [
    { href: "#about", label: "关于我们" },
    { href: "#services", label: "服务项目" },
    { href: "#contact", label: "联系我们" },
  ];

  useEffect(() => {
    const transitionTimer = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setFadeState("fade-in");
      }, 1000);
    }, 4000);

    return () => clearInterval(transitionTimer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 md:p-5 bg-black bg-opacity-80 z-30 md:rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold text-blue-400">
            Hyfire
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <NavigationItem key={item.href} href={item.href}>
                  {item.label}
                </NavigationItem>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="菜单"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-black transition-all duration-300 overflow-hidden rounded-b-xl ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="p-4">
            <ul className="flex flex-col space-y-4">
              <MobileNavItem href="#about" onClick={closeMenu}>
                关于我们
              </MobileNavItem>
              <MobileNavItem href="#services" onClick={closeMenu}>
                专业服务
              </MobileNavItem>
              <MobileNavItem href="#projects" onClick={closeMenu}>
                项目作品
              </MobileNavItem>
              <MobileNavItem href="#contact" onClick={closeMenu}>
                加入我们
              </MobileNavItem>
              {menuItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </MobileNavItem>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center relative py-12 md:py-24 px-4 md:px-8"
          style={{
            backgroundImage: "url('/background.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 container mx-auto h-full">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
              {/* Left Content */}
              <div className="flex-auto max-w-2xl lg:max-w-none lg:w-1/2 xl:w-2/5">
                <div className="space-y-6 md:space-y-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                    我们专注
                    <span
                      className={`transition-opacity duration-1000 ${
                        fadeState === "fade-out" ? "opacity-0" : "opacity-100"
                      }`}
                      style={{
                        background: "linear-gradient(90deg, #2385FC, #4C23FC)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {phrases[currentPhraseIndex]}
                    </span>
                  </h1>
                  <h3 className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300">
                    从后端到前端，我们以高效、创新的方式应对各种技术挑战。
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="#projects"
                      className="flex-1 px-6 py-3 bg-black rounded-lg hover:bg-opacity-80 transition-all border border-gray-600 text-center"
                    >
                      查看案例
                    </a>
                    <a
                      href="#contact"
                      className="flex-1 px-6 py-3 bg-blue-600 rounded-lg hover:bg-opacity-80 transition-all text-center"
                    >
                      加入我们
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-auto w-full lg:w-1/2 xl:w-2/5 max-w-2xl lg:max-w-none">
                <div className="bg-gray-900 rounded-xl p-6 md:p-8 h-full">
                  <div className="space-y-6">
                    <div className="text-green-400 text-sm md:text-base">
                      <div className="mb-4">
                        <span className="text-gray-400">#</span> 最新动态
                      </div>
                      <div className="mb-4">
                        <span className="text-gray-400">$</span>{" "}
                        当前进行中项目：2
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-6">
                      <div className="text-xs md:text-sm text-gray-400 mb-2">
                        核心优势
                      </div>
                      <div className="text-lg md:text-xl font-mono text-blue-400">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{"{"}</span>
                          <span className="text-green-400">
                            &quot;技术&quot;
                          </span>
                          <span className="text-gray-400">:</span>
                          <span className="text-yellow-400">
                            &quot;创新&quot;
                          </span>
                          <span className="text-gray-400">{"}"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-16">服务项目</h2>
            <div className="grid gap-8">
              {[
                {
                  title: "Minecraft Server",
                  desc: "Minecraft 客制化开发",
                  features: ["Java", "Plugin", "Building"],
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-900 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gray-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-8">联系我们</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-gray-800 rounded-xl">
                <h3 className="text-2xl font-semibold mb-4">加入我们</h3>
                <p className="mb-6 text-gray-400">发送 HR 至 hi@hyfire.cloud</p>
                <a
                  href="mailto:hi@hyfire.cloud"
                  className="inline-block px-6 py-3 bg-blue-600 rounded-lg hover:bg-opacity-80"
                >
                  立即申请
                </a>
              </div>
              <div className="p-8 bg-gray-800 rounded-xl">
                <h3 className="text-2xl font-semibold mb-4">需求咨询</h3>
                <p className="mb-6 text-gray-400">
                  请发送需求至 support@hyfire.cloud
                </p>
                <a
                  href="mailto:support@hyfire.cloud"
                  className="inline-block px-6 py-3 bg-green-600 rounded-lg hover:bg-opacity-80"
                >
                  立即联系
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-4 mt-auto">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
              <span>© 2025 Hyfire Studio</span>
              <span className="hidden md:inline">|</span>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                皖ICP备2025076830号-1
              </a>
            </div>

            <div className="flex items-center">
              <a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=XXXXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center"
              >
                <img
                  src="/beian.png"
                  alt="公安备案图标"
                  className="h-4 w-4 mr-2"
                />
                XXXXXXXXXXXX
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
