import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import { Analytics } from "@vercel/analytics/react"


export default function Home() {
  return (
    <>
      <HomePage />
      <Footer/>      
      <Analytics />
    </>
  );
}
