import { useEffect, useState } from "react";
import {
	About,
	Footer,
	Hero,
	LoadingPage,
	Navbar,
	ScrollIndicator,
	Services,
	Tech,
} from "../../components";
import Servic from "../../components/Servic/Servic";

const HomePage = () => {
	const [hideLoading, setHideLoading] = useState(false);
	useEffect(() => {
		const loader = document.querySelector(".loader");

		const hide = () => {
			if (loader) {
				loader.classList.add("loader-hidden");

				const onTransitionEnd = () => {
					setHideLoading(true);
					loader.removeEventListener("transitionend", onTransitionEnd);
				};

				loader.addEventListener("transitionend", onTransitionEnd);
			} else {
				setHideLoading(true);
			}
		};

		const timeoutId = setTimeout(hide, 2000); // fallback sau 3s

		window.addEventListener("load", hide);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("load", hide);
		};
	}, []);

	return (
		<div>
			{!hideLoading && <LoadingPage />}
			<ScrollIndicator />
			<div className="relative z-0 bg-primary">
				<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
					<Navbar />
					
				</div>
				<Servic />
				<Services />
				<Tech />
				<About />
				<div className="relative -z-10">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
