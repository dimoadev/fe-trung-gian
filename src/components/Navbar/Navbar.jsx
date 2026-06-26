import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../../styles";
import { navLinks } from "../../constants";
import { menu, close } from "../../assets";
import Logo from "/logodimoaq.png";

const Navbar = () => {
	const [active, setActive] = useState();
	const [toggle, setToggle] = useState(false);
	useEffect(() => {
		const url = window.location.href.split("#")[1];
		document?.getElementById(url ? url : "home")?.scrollIntoView();
		if (url) {
			document.title = `TerraXcode | ${
				url.charAt(0).toUpperCase() + url.slice(1)
			}`;
			setActive(url);
		}
	}, []);
	return (
		<>
			<nav
				className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-[#0f0908]`}
			>
				<div className="w-full flex justify-between items-center max-w-7xl mx-auto">
					<Link
						to="/"
						className="flex items-center gap-2"
						onClick={() => {
							setActive("");
							window.screenTop(0, 0);
						}}
					>
						<img src="/logo2.png" alt="logo" width="34" height="34" />
						<p className="text-white text-[18px] font-bold cursor-pointer flex">
							<span className="orbitron text-xl">JackpotClub</span>
						</p>
					</Link>
					<ul className="list-none hidden lg:flex flex-row gap-10">
						{navLinks.map((link) => (
							<li
								key={link.id}
								className={`${
									active === link.id ? "text-white" : "text-secondary"
								} hover:text-white text-[18px] font-medium cursor-pointer`}
								onClick={() => {
									setActive(link.id);
									document.title = `JackpotClub | ${link.title}`;
								}}
							>
								<a href={`#${link.id}`}>{link.title}</a>
							</li>
						))}
						<li
							className={`text-white font-poppins font-medium cursor-pointer text-[16px]`}
						>
							<a href={`/auth/login`}>
								<button className="button_downloadcv bg-transparent px-4 py-1 border border-solid border-lime-400 rounded-md hover:border-lime-300 hover:text-orange-100 ">
									Đăng nhập
								</button>
							</a>
						</li>
					</ul>
					<div className="lg:hidden flex flex-1 justify-end items-center">
						<button className="outline-none" onClick={() => setToggle(!toggle)}>
							<img
								src={toggle ? close : menu}
								alt="menu"
								className="w-[28px] h-[28px] object-contain cursor-pointer"
							/>
						</button>
						<div
							className={`${
								!toggle ? "hidden" : "flex"
							} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
						>
							<ul className="list-none flex justify-end items-start flex-col gap-4">
								{navLinks.map((link) => (
									<li
										key={link.id}
										className={`${
											active === link.id ? "text-white" : "text-secondary"
										} font-poppins font-medium cursor-pointer text-[16px]`}
										onClick={() => {
											setToggle(!toggle);
											setActive(link.id);
											document.title = `TerraXcode | ${link.title}`;
										}}
									>
										<a href={`#${link.id}`}>{link.title}</a>
									</li>
								))}
								<li
									className={`text-white font-poppins font-medium cursor-pointer text-[16px]`}
								>
									<a href={`/auth/login`}>
										<button className="px-4 py-1 border border-solid divide-orange-100">
											Đăng nhập
										</button>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
