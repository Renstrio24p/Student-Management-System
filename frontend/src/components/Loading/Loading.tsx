import { useEffect, useState } from "react";

type Props = {};

export default function Loading({}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading && (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <img src="/bg1.png" alt="Loading" className="w-32 h-32 mb-4" />
        <div className="loader flex justify-center">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    )
  );
}
