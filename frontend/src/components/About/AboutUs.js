import { cards } from "../../utils/cards";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-24 sm:py-32 flex flex-col justify-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:text-left">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        About ThinkSpire AI
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        At ThinkSpire AI, we're pioneering the future of content
                        creation with our state-of-the-art AI technology.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.name}
                            className="flex flex-col items-center rounded-xl bg-white/10 p-6 ring-1 ring-inset ring-white/10"
                        >
                            <card.icon
                                className="h-10 w-10 text-indigo-400"
                                aria-hidden="true"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-white">
                                {card.name}
                            </h3>
                            <p className="mt-2 text-center text-gray-300">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
