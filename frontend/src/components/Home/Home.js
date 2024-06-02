import HomeFeatures from "./HomeFeatures";
import FreeTrial from "./FreeTrial";
import aiBackground from "../../assets/ai-background.avif";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Home = () => {
    return (
        <>
            <div className="bg-gray-900 min-h-screen">
                <div className="relative isolate overflow-hidden">
                    <img
                        src={aiBackground}
                        alt="AI Background"
                        className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 -z-10 bg-black bg-opacity-70"></div>
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <div className="container mx-auto px-6 py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <div className="flex justify-center mb-8">
                                <FaRobot className="h-16 w-16 text-white" />
                            </div>
                            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                                Welcome to ThinkSpire AI Content Generator
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                                Generate high-quality content effortlessly with
                                ThinkSpire. Perfect for blogs, websites, and
                                social media. Unlock your creative potential
                                with our cutting-edge AI technology.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link
                                    to="free-plan"
                                    className="rounded-md bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                                >
                                    Start 3-Day Free Trial
                                </Link>
                                <Link
                                    to="learn-more"
                                    className="text-base font-semibold text-white hover:underline"
                                >
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                </div>
            </div>
            <HomeFeatures />
            <FreeTrial />
        </>
    );
};

export default Home;
