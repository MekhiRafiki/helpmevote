import Image from "next/image";

export default function SpectrumDisplay({ position }: { position: number }) {
    const adjustedPosition = ((position + 1) / 2) * 100; // Convert position to percentage
  
    return (
        <div className="flex items-center justify-between bg-base-300 rounded-lg p-4 w-full max-w-lg mx-auto min-w-48 sm:min-w-64 md:min-w-80 lg:min-w-96">
        <Image
          src="/images/harris.png"
          alt="Kamala"
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
          width={48} 
          height={48} 

        />
        <div className="relative flex-1 mx-4">
          <div className="h-2 rounded-full" style={{ background: `linear-gradient(to right, blue, red)`, width: `100%` }}></div>
          <div
            className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-500 w-4 h-4 rounded-full"
            style={{ left: `${adjustedPosition}%` }}
          ></div>
        </div>
        <Image
          src="/images/trump.png"
          alt="Donald"
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
          width={48} 
          height={48} 
        />
      </div>
    );
  }