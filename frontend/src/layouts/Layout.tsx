import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

type Props = {};

export default function Layout({}: Props) {
  return (
    <>
      <header className="bg-slate-900">
        <Navbar />
      </header>
      <main className="w-full max-w-7xl mx-auto pt-[6%]">
        <Outlet />
      </main>
    </>
  );
}
