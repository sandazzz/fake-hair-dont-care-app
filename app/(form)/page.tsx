import DonationForm from "./DonationForm";
import DonationHeader from "./DonationHeader";

export default function Form() {
  return (
    <main className="relative flex items-center justify-center min-h-screen w-full px-6 py-16">
      <div className="absolute inset-0 -z-10 content-[''] bg-gradient-to-b from-white to-[#A80767] clip-circle-right"></div>
      <div className="absolute inset-0 -z-10 content-[''] bg-gradient-to-b from-[#E58D93] to-blue-200 clip-circle-left"></div>
      <div className="flex flex-col">
        <div className="bg-card border border-b-0 border-border">
          <DonationHeader />
        </div>

        <div className="bg-card border border-t-0 border-border p-6">
          <DonationForm />
        </div>
      </div>
    </main>
  );
}
