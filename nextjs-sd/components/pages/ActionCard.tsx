import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui";

export default function ActionCard() {
  return (
    <div className="flex-1 flex font-karla" id="actions">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold font-karla">
          Actions
        </span>
      </div>
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card className="bg-zinc-900 text-white flex flex-col">
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
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-lg">
                Comment Now!
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-zinc-900 text-white flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2">
                Dispute Provider
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-lg">
                Are you a Web3 E-commerce service and wants to settle disputes
                at ease? Start the bridging with us!
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-lg">
                Bridge Now!
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
