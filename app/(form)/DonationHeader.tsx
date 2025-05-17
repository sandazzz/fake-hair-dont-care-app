import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function DonationHeader() {
  return (
    <div className="relative bg-white py-6 flex flex-col sm:flex-row items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0 mb-4 sm:mb-0">
        <Image
          src="/logo-fakehairdontcare-1920px.png"
          alt="Fake Hair Don't Care Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Texte Formulaire de don */}
      <div className="text-center sm:text-right md:pr-4">
        <Separator className="w-10 h-1 bg-input-title-foreground mx-auto sm:ml-auto sm:mr-0 mb-2" />
        <h1 className="text-2xl font-medium tracking-widest text-input-title-foreground leading-tight">
          FORMULAIRE
          <br />
          DE DON
        </h1>
      </div>
    </div>
  );
}
