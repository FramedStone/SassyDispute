import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex-1 flex" id="myproject">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold">Home</span>
      </div>
      <section className="w-full bg-[#1e1e1e] text-white py-16 border border-white border-l-0 border-r-0">
        <div className="container mx-auto px-4">
          <h2 className="text-yellow-400 text-2xl font-bold mb-4">
            My Projects
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <p className="text-yellow-400 text-6xl font-bold mb-4">1/6</p>
              <h3 className="text-yellow-400 text-4xl font-bold mb-4">
                Redesign Case Study
              </h3>
              <p className="mb-6 text-gray-300">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
              <Link
                href="#"
                className="inline-block bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-[#1e1e1e] transition-colors duration-300"
              >
                Take A Look
                <span className="ml-2">→</span>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-yellow-400">
                <Image
                  src="/placeholder.svg"
                  alt="White game controller"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-16 border border-white border-r-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold">Home</span>
      </div>
    </div>
  );
}
