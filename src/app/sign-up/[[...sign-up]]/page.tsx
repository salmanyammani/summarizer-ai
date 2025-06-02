import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex relative justify-center items-center overflow-x-hidden">
     <div className="absolute top-8 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute top-1/2 -right-32 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="mx-auto max-w-5xl lg:py-24 ">
        <SignUp />
      </div>
    </section>
  );
}
