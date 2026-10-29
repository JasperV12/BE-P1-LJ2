<?php

namespace App\Repositories;

use App\Models\Leverancier;
use App\Models\Magazijn;
use App\Models\Product;
use App\Models\ProductPerLeverancier;
use Illuminate\Support\Facades\DB;
use PDO;

class LeverancierRepository
{
    /**
     * Verkrijg de actieve PDO connectie.
     */
    protected function getPdo(): PDO
    {
        return DB::connection()->getPdo();
    }

    /**
     * User Story 01 - Wireframe-01:
     * Informatieoverzicht van de verschillende leveranciers met het aantal verschillende
     * producten dat zij aan Jamin leveren, gesorteerd op 'Aantal verschillende producten' aflopend.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getLeveranciersOverzicht(): array
    {
        try {
            $pdo = $this->getPdo();
            $stmt = $pdo->prepare('CALL spGetLeveranciersOverzicht()');
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_OBJ);
            $stmt->closeCursor();

            return array_map(function ($row): array {
                return [
                    'id' => (int) $row->Id,
                    'naam' => (string) $row->Naam,
                    'contactPersoon' => (string) $row->ContactPersoon,
                    'leverancierNummer' => (string) $row->LeverancierNummer,
                    'mobiel' => (string) $row->Mobiel,
                    'aantalVerschillendeProducten' => (int) $row->AantalVerschillendeProducten,
                ];
            }, $results);
        } catch (\Throwable $e) {
            // Betrouwbare Eloquent / Query Builder fallback voor sqlite of ontbrekende stored procedures
            return Leverancier::with('productPerLeveranciers')
                ->get()
                ->map(function (Leverancier $l): array {
                    $uniqueProductCount = $l->productPerLeveranciers
                        ->pluck('ProductId')
                        ->unique()
                        ->count();

                    return [
                        'id' => $l->Id,
                        'naam' => $l->Naam,
                        'contactPersoon' => $l->ContactPersoon ?? '',
                        'leverancierNummer' => $l->LeverancierNummer ?? '',
                        'mobiel' => $l->Mobiel ?? '',
                        'aantalVerschillendeProducten' => $uniqueProductCount,
                    ];
                })
                ->sort(function (array $a, array $b): int {
                    if ($a['aantalVerschillendeProducten'] === $b['aantalVerschillendeProducten']) {
                        return strcmp($a['naam'], $b['naam']);
                    }

                    return $b['aantalVerschillendeProducten'] <=> $a['aantalVerschillendeProducten'];
                })
                ->values()
                ->all();
        }
    }

    /**
     * Ophalen van een specifieke leverancier.
     */
    public function getLeverancierById(int $leverancierId): ?object
    {
        try {
            $pdo = $this->getPdo();
            $stmt = $pdo->prepare('SELECT Id, Naam, ContactPersoon, LeverancierNummer, Mobiel FROM Leverancier WHERE Id = ?');
            $stmt->execute([$leverancierId]);
            $leverancier = $stmt->fetch(PDO::FETCH_OBJ);
            $stmt->closeCursor();

            if ($leverancier) {
                return $leverancier;
            }
        } catch (\Throwable $e) {
            // Fallback via Eloquent
            $l = Leverancier::find($leverancierId);
            if ($l) {
                return (object) [
                    'Id' => $l->Id,
                    'Naam' => $l->Naam,
                    'ContactPersoon' => $l->ContactPersoon,
                    'LeverancierNummer' => $l->LeverancierNummer,
                    'Mobiel' => $l->Mobiel,
                ];
            }
        }

        return null;
    }

    /**
     * User Story 01 - Scenario 01 (Wireframe-02) & Scenario 02 (Wireframe-03):
     * Ophalen van geleverde verschillende producten van een leverancier,
     * inclusief voorraad in het magazijn en datum van de laatst geleverde zending,
     * gesorteerd op 'Aantal in Magazijn' aflopend.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getGeleverdeProducten(int $leverancierId): array
    {
        try {
            $pdo = $this->getPdo();
            $stmt = $pdo->prepare('CALL spGetGeleverdeProductenByLeverancier(?)');
            $stmt->execute([$leverancierId]);
            $results = $stmt->fetchAll(PDO::FETCH_OBJ);
            $stmt->closeCursor();

            return array_map(function ($row): array {
                return [
                    'productId' => (int) $row->ProductId,
                    'naamProduct' => (string) $row->NaamProduct,
                    'isActief' => (bool) $row->IsActief,
                    'aantalInMagazijn' => $row->AantalAanwezig !== null ? (int) $row->AantalAanwezig : null,
                    'verpakkingsEenheid' => $row->VerpakkingsEenheid !== null ? (float) $row->VerpakkingsEenheid : null,
                    'laatsteLevering' => $row->LaatsteLevering ? date('d-m-Y', strtotime($row->LaatsteLevering)) : null,
                ];
            }, $results);
        } catch (\Throwable $e) {
            // Fallback via Eloquent / Query Builder
            $leveringen = ProductPerLeverancier::where('LeverancierId', $leverancierId)
                ->with(['product.magazijn'])
                ->get()
                ->groupBy('ProductId')
                ->map(function ($group) {
                    $first = $group->first();
                    $product = $first->product;
                    $magazijn = $product?->magazijn;

                    $laatsteLeveringDatum = $group->max(function ($item) {
                        return $item->DatumLevering ? $item->DatumLevering->format('Y-m-d') : null;
                    });

                    return [
                        'productId' => $product->Id,
                        'naamProduct' => $product->Naam,
                        'isActief' => (bool) $product->IsActief,
                        'aantalInMagazijn' => $magazijn?->AantalAanwezig,
                        'verpakkingsEenheid' => $magazijn?->VerpakkingsEenheid ? (float) $magazijn->VerpakkingsEenheid : null,
                        'laatsteLevering' => $laatsteLeveringDatum ? date('d-m-Y', strtotime($laatsteLeveringDatum)) : null,
                    ];
                })
                ->sort(function ($a, $b) {
                    $valA = $a['aantalInMagazijn'] ?? -1;
                    $valB = $b['aantalInMagazijn'] ?? -1;

                    return $valB <=> $valA;
                })
                ->values()
                ->all();

            return $leveringen;
        }
    }

    /**
     * User Story 02 - Wireframe-04:
     * Ophalen details voor het detailscherm 'Levering product'.
     *
     * @return array<string, mixed>|null
     */
    public function getLeveringProductDetails(int $leverancierId, int $productId): ?array
    {
        try {
            $pdo = $this->getPdo();
            $stmt = $pdo->prepare('CALL spGetLeveringProductDetails(?, ?)');
            $stmt->execute([$leverancierId, $productId]);
            $row = $stmt->fetch(PDO::FETCH_OBJ);
            $stmt->closeCursor();

            if (! $row) {
                return null;
            }

            return [
                'productId' => (int) $row->ProductId,
                'productNaam' => (string) $row->ProductNaam,
                'isActief' => (bool) $row->IsActief,
                'leverancierId' => (int) $row->LeverancierId,
                'leverancierNaam' => (string) $row->LeverancierNaam,
                'contactPersoon' => (string) ($row->ContactPersoon ?? ''),
                'mobiel' => (string) ($row->Mobiel ?? ''),
                'aantalAanwezig' => $row->AantalAanwezig !== null ? (int) $row->AantalAanwezig : null,
                'verpakkingsEenheid' => $row->VerpakkingsEenheid !== null ? (float) $row->VerpakkingsEenheid : null,
            ];
        } catch (\Throwable $e) {
            $product = Product::with('magazijn')->find($productId);
            $leverancier = Leverancier::find($leverancierId);

            if (! $product || ! $leverancier) {
                return null;
            }

            return [
                'productId' => $product->Id,
                'productNaam' => $product->Naam,
                'isActief' => (bool) $product->IsActief,
                'leverancierId' => $leverancier->Id,
                'leverancierNaam' => $leverancier->Naam,
                'contactPersoon' => $leverancier->ContactPersoon ?? '',
                'mobiel' => $leverancier->Mobiel ?? '',
                'aantalAanwezig' => $product->magazijn?->AantalAanwezig,
                'verpakkingsEenheid' => $product->magazijn?->VerpakkingsEenheid ? (float) $product->magazijn->VerpakkingsEenheid : null,
            ];
        }
    }

    /**
     * User Story 02 - Scenario 01 & Scenario 02:
     * Toevoegen nieuwe levering en bijwerken van voorraad in Magazijn.
     * Controleert IsActief op het product.
     *
     * @return array{success: bool, message: string}
     */
    public function addProductLevering(int $leverancierId, int $productId, int $aantal, ?string $datumEerstVolgendeLevering): array
    {
        try {
            $pdo = $this->getPdo();
            $stmt = $pdo->prepare('CALL spAddProductLevering(?, ?, ?, ?)');
            $stmt->execute([$leverancierId, $productId, $aantal, $datumEerstVolgendeLevering]);
            $res = $stmt->fetch(PDO::FETCH_OBJ);
            $stmt->closeCursor();

            if ($res) {
                return [
                    'success' => (bool) ($res->Success ?? false),
                    'message' => (string) ($res->Message ?? ''),
                ];
            }
        } catch (\Throwable $e) {
            // Val terug op PDO fallback
        }

        // PDO transaction fallback
        $product = Product::find($productId);
        $leverancier = Leverancier::find($leverancierId);

        if (! $product || ! $leverancier) {
            return [
                'success' => false,
                'message' => 'Product of leverancier niet gevonden',
            ];
        }

        // Scenario 02: Als IsActief op false staat
        if (! $product->IsActief) {
            return [
                'success' => false,
                'message' => "Het product {$product->Naam} van de leverancier {$leverancier->Naam} wordt niet meer geproduceerd",
            ];
        }

        // Scenario 01: Voorraad verhogen en levering toevoegen
        $magazijn = Magazijn::where('ProductId', $productId)->first();
        if ($magazijn) {
            $magazijn->AantalAanwezig = ($magazijn->AantalAanwezig ?? 0) + $aantal;
            $magazijn->save();
        }

        $nieuweLevering = new ProductPerLeverancier;
        $nieuweLevering->LeverancierId = $leverancierId;
        $nieuweLevering->ProductId = $productId;
        $nieuweLevering->DatumLevering = now()->toDateString();
        $nieuweLevering->Aantal = $aantal;
        $nieuweLevering->DatumEerstVolgendeLevering = $datumEerstVolgendeLevering;
        $nieuweLevering->IsActief = true;
        $nieuweLevering->save();

        return [
            'success' => true,
            'message' => 'Levering succesvol toegevoegd',
        ];
    }
}
