import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const Welcome = () => {

	const AdminLogin = () => {
		localStorage.setItem("type", "admin");
		// * the most simple & secure algorithm xD
		window.location.reload();
	}

	return (
		<div className="w-full h-full flex items-center justify-center gap-10">
			<Card isFooterBlurred radius="lg" className="border-none">
				<Image
					alt="Woman listing to music"
					className="object-cover"
					height={400}
					src="/images/chat.jpeg"
					width={400}
				/>
				<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
					<p className="text-md text-white/80">Start chat with our bot.</p>
					<Button
						className="text-white bg-blue-500/80"
						variant="flat"
						color="default"
						radius="lg"
						size="md"
					>
						Chat
					</Button>
				</CardFooter>
			</Card>

      <Card isFooterBlurred radius="lg" className="border-none">
				<Image
					alt="Woman listing to music"
					className="object-cover"
					height={400}
					src="/images/craft.jpeg"
					width={400}
				/>
				<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
					<p className="text-md text-white/80">Manage the Bot flow.</p>
					<Button
						className="text-white bg-black/60"
						variant="flat"
						color="default"
						radius="lg"
						size="md"
						onClick={AdminLogin}
					>
						Start
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Welcome;
