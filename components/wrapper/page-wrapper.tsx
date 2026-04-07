import { Header } from "./header";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Header />
        <main className="flex flex-col justify-between items-center pt-16 min-w-full min-h-screen">
            <div className="z-[-99] absolute inset-0 flex justify-center items-center pointer-events-none mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {children}
        </main>
      {/* <Footer /> */}
    </>
  );
}
