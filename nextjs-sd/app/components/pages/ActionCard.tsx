import { motion } from "framer-motion"; // Import motion from framer-motion
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui";
import { useRouter } from "next/navigation";

export default function ActionCard() {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const router = useRouter();

  return (
    <div className="flex-1 flex font-karla" id="actions">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold font-karla">
          Actions
        </span>
      </div>
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card 1 with motion */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-zinc-900 text-white flex flex-col h-full">
              {" "}
              {/* Ensure the card takes full height */}
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-2">User</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg mb-4">
                  Start sharing your opinion on dispute cases!
                </p>
                <p className="font-semibold mb-2">Ensure to:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Give constructive opinions</li>
                  <li>Avoid attacking the buyer or the sellers</li>
                  <li>Keep it friendly!</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-yellow-400 text-black font-bold py-3 text-lg hover:bg-yellow-400 hover:opacity-80"
                  onClick={() => {
                    router.push("/Cases");
                  }}
                >
                  Comment Now!
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Card 2 with motion */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-zinc-900 text-white flex flex-col h-full">
              {" "}
              {/* Ensure the card takes full height */}
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-2">
                  Dispute Provider
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg">
                  Are you a Web3 E-commerce service and want to settle disputes
                  at ease? Start the bridging with us!
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-yellow-400 text-black font-bold py-3 text-lg hover:bg-yellow-400 hover:opacity-80"
                  onClick={() => {
                    router.push("/Terms");
                  }}
                >
                  Bridge Now!
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
