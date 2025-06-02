import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="relative flex justify-center items-center min-h-[40vh] overflow-x-hidden w-full">
      <div className="absolute top-8 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/2 -right-32 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl py-8 lg:py-24 z-10">
        <SignIn />
      </div>
    </section>
  );
}
