import Image from "next/image";

interface SpectrumDisplayProps {
    position: number;
    demCandidate: {
        name: string;
        image: string;
    };
    repCandidate: {
        name: string;
        image: string;
    };
}

export default function SpectrumDisplay({ position, demCandidate, repCandidate }: SpectrumDisplayProps) {
    const adjustedPosition = ((position + 1) / 2) * 100; // Convert position to percentage
  
    return (
        <div className="flex items-center justify-between bg-base-300 rounded-lg p-4 w-full max-w-lg mx-auto min-w-48 sm:min-w-64 md:min-w-80 lg:min-w-96">
            <div className="flex flex-col items-center max-w-24 text-center">
                <Image
                    src={demCandidate.image}
                    alt={demCandidate.name}
                    className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
                    width={48} 
                    height={48} 
                />
                <span className="mt-2 text-sm font-medium break-words">{demCandidate.name}</span>
            </div>

            <div className="relative flex-1 mx-4">
                <div className="h-2 rounded-full" style={{ background: `linear-gradient(to right, blue, red)`, width: `100%` }}></div>
                <div
                    className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-500 w-4 h-4 rounded-full"
                    style={{ left: `${adjustedPosition}%` }}
                ></div>
            </div>

            <div className="flex flex-col items-center max-w-24 text-center">
                <Image
                    src={repCandidate.image}
                    alt={repCandidate.name}
                    className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
                    width={48} 
                    height={48} 
                />
                <span className="mt-2 text-sm font-medium break-words">{repCandidate.name}</span>
            </div>
        </div>
    );
  }