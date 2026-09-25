<?php

namespace App\Http\Controllers;

use App\Models\Magazijn;
use App\Models\Product;
use App\Models\ProductPerLeverancier;
use Inertia\Inertia;

class MagazijnController extends Controller
{
    public function index()
    {
        $magazijnItems = Magazijn::with(['product.productPerAllergenen'])
            ->get()
            ->map(function ($item) {
                return [
                    'id'                 => $item->Id,
                    'productId'          => $item->ProductId,
                    'naam'               => $item->product->Naam,
                    'barcode'            => $item->product->Barcode,
                    'verpakkingsEenheid' => $item->VerpakkingsEenheid,
                    'aantalAanwezig'     => $item->AantalAanwezig,
                    'heeftAllergenen'    => $item->product->productPerAllergenen->count() > 0,
                ];
            })
            ->sortBy('naam')
            ->values();

        return Inertia::render('Magazijn/Overzicht', [
            'magazijnItems' => $magazijnItems,
        ]);
    }

    public function leveringsInfo(int $productId)
    {
        $product = Product::findOrFail($productId);

        $eerstelevering = ProductPerLeverancier::where('ProductId', $productId)->first();

        if (!$eerstelevering) {
            return redirect()->route('magazijn.index');
        }

        $leverancier = $eerstelevering->leverancier;

        $leveringen = ProductPerLeverancier::where('LeverancierId', $leverancier->Id)
            ->with('product')
            ->orderBy('DatumLevering', 'asc')
            ->get()
            ->map(function ($levering) {
                return [
                    'id'                        => $levering->Id,
                    'naamProduct'                => $levering->product->Naam,
                    'datumLevering'              => $levering->DatumLevering?->format('Y-m-d'),
                    'aantal'                     => $levering->Aantal,
                    'datumEerstVolgendeLevering' => $levering->DatumEerstVolgendeLevering?->format('Y-m-d'),
                ];
            });

        return Inertia::render('Magazijn/LeveringsInfo', [
            'product' => [
                'id'   => $product->Id,
                'naam' => $product->Naam,
            ],
            'leverancier' => [
                'naam'               => $leverancier->Naam,
                'contactPersoon'     => $leverancier->ContactPersoon,
                'leverancierNummer'  => $leverancier->LeverancierNummer,
                'mobiel'             => $leverancier->Mobiel,
            ],
            'leveringen' => $leveringen,
        ]);
    }

    public function allergeenInfo(int $productId)
    {
        $product = Product::with('allergenen')->findOrFail($productId);

        $allergenen = $product->allergenen
            ->sortBy('Naam')
            ->values()
            ->map(function ($allergeen) {
                return [
                    'id'           => $allergeen->Id,
                    'naam'         => $allergeen->Naam,
                    'omschrijving' => $allergeen->Omschrijving,
                ];
            });

        return Inertia::render('Magazijn/AllergeenInfo', [
            'product' => [
                'id'      => $product->Id,
                'naam'    => $product->Naam,
                'barcode' => $product->Barcode,
            ],
            'allergenen'     => $allergenen,
            'heeftAllergenen' => $allergenen->count() > 0,
        ]);
    }
}
