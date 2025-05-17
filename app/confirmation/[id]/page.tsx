import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ConfirmationHeader from "./ConfirmationHeader";

export default async function DonationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const donation = await prisma.donation.findUnique({
    where: { specialId: id },
  });

  if (!donation) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full py-10 px-4 relative flex justify-center">
      <div className="w-full h-full max-w-2xl flex flex-col justify-center items center gap-8">
        <div className="absolute inset-0 -z-10 content-[''] bg-gradient-to-b from-[#E58D93] to-blue-200 clip-circle-left"></div>
        <div className="absolute inset-0 -z-10 content-[''] bg-gradient-to-b from-white to-[#A80767] clip-circle-right"></div>
        <ConfirmationHeader />
        {/* Titre principal */}
        <Card className="bg-white shadow-md border border-gray-200 rounded-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold uppercase tracking-widest text-input-title-foreground">
              Merci pour votre don 💝
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Numéro de don */}
        <Alert className="bg-pink-50 border-l-4 border-pink-400 text-pink-900 rounded-none">
          <AlertTitle className="uppercase font-semibold text-pink-800 text-sm tracking-wide">
            Important
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2 text-sm leading-relaxed">
            <p>Veuillez noter ce numéro de don :</p>
            <p className="text-lg font-mono font-bold">{donation.specialId}</p>
            <p>
              Écrivez ce numéro clairement sur votre enveloppe ou colis avant
              l’envoi.
            </p>
          </AlertDescription>
        </Alert>

        {/* Confirmation Email */}
        <Alert className="bg-white border border-gray-200 text-gray-900 rounded-none">
          <AlertTitle className="uppercase font-medium text-sm tracking-wide">
            Confirmation par e-mail
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2 text-sm leading-relaxed">
            <p>
              Un e-mail contenant le récapitulatif de votre don a été envoyé à :
            </p>
            <p className="font-medium">{donation.email}</p>
            <p>Vérifiez bien votre boîte mail, y compris vos spams.</p>
          </AlertDescription>
        </Alert>

        {/* Adresse d'expédition */}
        <Alert className="bg-white border border-gray-200 text-gray-900 rounded-none">
          <AlertTitle className="uppercase font-medium text-sm tracking-wide">
            Expédition
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2 text-sm leading-relaxed">
            <p>
              Envoyez votre don <strong>(avec ou sans suivi)</strong> à
              l’adresse suivante :
            </p>
            <address className="not-italic leading-relaxed text-sm">
              Association Fake Hair Don’t Care
              <br />
              BP 10448
              <br />
              94152 Rungis Cedex
              <br />
              <strong>France</strong>
            </address>
            <p>
              Vous pouvez joindre des photos et messages dans votre enveloppe 😊
            </p>
            <p className="text-pink-700 font-semibold">
              ⚠️ Ne joignez aucun moyen de paiement.
            </p>
            <p>
              Pour nous soutenir financièrement :{" "}
              <a
                href="https://www.helloasso.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-pink-700 hover:text-pink-800 font-medium"
              >
                HelloAsso
              </a>
              .
            </p>
          </AlertDescription>
        </Alert>

        {/* Récapitulatif du don */}
        <Card className="bg-white shadow-md border border-gray-200 rounded-none">
          <CardHeader>
            <CardTitle className="text-input-title-foreground text-lg uppercase tracking-wide font-semibold">
              Récapitulatif du Don
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-700 leading-relaxed">
            <ul className="space-y-1">
              <li>
                <strong>Prénom :</strong> {donation.firstName}
              </li>
              <li>
                <strong>Nom :</strong> {donation.lastName}
              </li>
              <li>
                <strong>Email :</strong> {donation.email}
              </li>
              <li>
                <strong>Âge :</strong> {donation.age ?? "Non renseigné"}
              </li>
              <li>
                <strong>Type de cheveux :</strong> {donation.hairTypes}
              </li>
              <li>
                <strong>Message :</strong> {donation.message || "Aucun message"}
              </li>
              <li>
                <strong>Revente autorisée :</strong>{" "}
                {donation.allowResale ? "Oui" : "Non"}
              </li>
              <li>
                <strong>Utilisation pour perruque :</strong>{" "}
                {donation.allowWigUse ? "Oui" : "Non"}
              </li>
              <li>
                <strong>Status :</strong> {donation.status}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
