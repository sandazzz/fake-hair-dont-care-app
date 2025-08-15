"use client";

import type { Donation } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DonorInfo = Pick<
    Donation,
    "firstName" | "lastName" | "civility" | "age" | "email" | "specialId" | "createdAt" | "status"
>;

export function DonorInfoCard({ donation }: { donation: DonorInfo }) {
    const civilityLabel = donation.civility === "madame" ? "Mme" : "M.";
    const formattedDate = new Date(donation.createdAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const isConfirmed = donation.status === "confirmed";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informations du donateur</CardTitle>
                <CardDescription>Détails personnels du donateur</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Nom</p>
                        <p>
                            {civilityLabel} {donation.firstName} {donation.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Âge</p>
                        <p>{donation.age ?? "Non spécifié"}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{donation.email}</p>
                </div>

                <div>
                    <p className="text-sm font-medium text-muted-foreground">ID du don</p>
                    <p>{donation.specialId}</p>
                </div>

                <div>
                    <p className="text-sm font-medium text-muted-foreground">Date du don</p>
                    <p>{formattedDate}</p>
                </div>

                <div>
                    <p className="text-sm font-medium text-muted-foreground">Statut</p>
                    <Badge
                        variant={isConfirmed ? "default" : "secondary"}
                        className={isConfirmed ? "bg-green-500" : undefined}
                    >
                        {isConfirmed ? "Confirmé" : "En attente"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
