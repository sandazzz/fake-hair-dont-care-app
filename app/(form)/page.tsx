import DonationForm from "./DonationForm";

export default function Form() {
  return (
    <main className="relative flex items-center justify-center min-h-screen w-full px-4">
      <div className="absolute inset-0 -z-10 content-[''] bg-gradient-to-b from-blue-100 to-[#A80767] clip-circle-right"></div>
      <div className="absolute inset-0 -z-10 content-[''] bg-gradient-to-b from-[#E58D93] to-blue-200 clip-circle-left"></div>
      <div className="bg-card border rounded-md border-border p-4">
        <DonationForm />
      </div>
    </main>
  );
}
