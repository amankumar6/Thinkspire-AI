import { features } from "../../utils/features";

const Features = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-24 sm:py-32 flex flex-col justify-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-lg font-semibold leading-7 text-indigo-500">
                        Deploy Faster
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Everything You Need for Seamless Deployment
                    </p>
                    <p className="mt-6 text-xl leading-8 text-gray-400">
                        Simplify your development process and focus on building
                        great apps.
                    </p>
                </div>
                <div className="mx-auto mt-20 max-w-2xl lg:mt-28 lg:max-w-none">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <feature.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-white">
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-400">
                                    {feature.description}
                                    <a
                                        href={feature.href}
                                        className="block mt-4 text-sm font-semibold text-indigo-400"
                                    >
                                        Learn more{" "}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Features;
