import { useState } from "react";
import img from "../assets/PassDeck Logo/trans_bg.png";
import gitimg from "../assets/Github Logo/github.svg";

const Navbar = () => {
    const [imgActive, setImgActive] = useState(false);
    const [svgActive, setSvgActive] = useState(false);
    const [gitActive, setGitActive] = useState(false);

    const triggerScale = (setter) => {
        setter(true);
        setTimeout(() => setter(false), 200);
    };

    return (
        <nav className="w-full h-[8vh] px-6 flex items-center justify-between relative">
            {/* LEFT: Logo */}
            <div
                className={`main-logo transition-transform duration-200 ease-in-out hover:cursor-pointer ${
                    imgActive ? "scale-110" : ""
                }`}
                onClick={() => triggerScale(setImgActive)}
            >
                <img src={img} alt="Logo" className="h-[10vh] relative top-1 object-contain" />
            </div>

            {/* CENTER: SVG Title */}
            <div
                className={`transition-transform duration-200 ease-in-out hover:cursor-pointer ${
                    svgActive ? "scale-105" : ""
                }`}
                onClick={() => triggerScale(setSvgActive)}
            >
                <svg
                    className="h-[6vh]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 280 64"
                >
                    <g transform="translate(50, 0)">
                        <text
                            x="0"
                            y="50"
                            fontFamily="Segoe UI, sans-serif"
                            fontSize="38"
                            fontWeight="600"
                            letterSpacing="0.5"
                        >
                            <tspan fill="#2A2E43">Pass</tspan>
                            <tspan fill="#4B66FF">Deck</tspan>
                        </text>
                    </g>
                </svg>
            </div>

            {/* RIGHT: GitHub */}
            <div className="flex items-center">
                <a
                    href="https://github.com/Devasheesh2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        e.preventDefault();
                        triggerScale(setGitActive);
                        setTimeout(() => {
                            window.open("https://github.com/Devasheesh2004", "_blank");
                        }, 200);
                    }}
                    className={`transition-transform duration-200 ease-in-out ${
                        gitActive ? "scale-125" : ""
                    }`}
                >
                    <img
                        src={gitimg}
                        alt="GitHub"
                        className="w-[35px] h-[35px] realtive top-2"
                    />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
