<?php

namespace App\Http\Controllers;

use App\Repositories\LeverancierRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeverancierController extends Controller
{
    protected LeverancierRepository $leverancierRepository;

    public function __construct(LeverancierRepository $leverancierRepository)
    {
        $this->leverancierRepository = $leverancierRepository;
    }

    /**
     * User Story 01 - Scenario 01 (Wireframe-01):
     * Overzicht van alle verschillende leveranciers met het aantal verschillende producten.
     */
    public function index(): Response
    {
        $leveranciers = $this->leverancierRepository->getLeveranciersOverzicht();

        return Inertia::render('Leverancier/Overzicht', [
            'leveranciers' => $leveranciers,
        ]);
    }

    /**
     * User Story 01 - Scenario 01 (Wireframe-02) & Scenario 02 (Wireframe-03):
     * Detailscherm 'Geleverde producten' van de geselecteerde leverancier.
     */
    public function geleverdeProducten(int $leverancierId): Response|RedirectResponse
    {
        $leverancier = $this->leverancierRepository->getLeverancierById($leverancierId);

        if (! $leverancier) {
            return redirect()->route('leveranciers.index');
        }

        $producten = $this->leverancierRepository->getGeleverdeProducten($leverancierId);

        return Inertia::render('Leverancier/GeleverdeProducten', [
            'leverancier' => [
                'id' => (int) $leverancier->Id,
                'naam' => $leverancier->Naam,
                'contactPersoon' => $leverancier->ContactPersoon ?? '',
                'leverancierNummer' => $leverancier->LeverancierNummer ?? '',
                'mobiel' => $leverancier->Mobiel ?? '',
            ],
            'producten' => $producten,
        ]);
    }

    /**
     * User Story 02 - Detailscherm 'Levering Product' tonen (Wireframe-04).
     */
    public function leveringProductForm(int $leverancierId, int $productId): Response|RedirectResponse
    {
        $details = $this->leverancierRepository->getLeveringProductDetails($leverancierId, $productId);

        if (! $details) {
            return redirect()->route('leveranciers.producten', $leverancierId);
        }

        return Inertia::render('Leverancier/LeveringProduct', [
            'details' => $details,
        ]);
    }

    /**
     * User Story 02 - Scenario 01 & Scenario 02:
     * Nieuwe zending opslaan en voorraad bijwerken.
     */
    public function storeLevering(Request $request, int $leverancierId, int $productId): RedirectResponse
    {
        $validated = $request->validate([
            'aantal' => ['required', 'integer', 'min:1'],
            'datumEerstVolgendeLevering' => ['nullable', 'date'],
        ]);

        $result = $this->leverancierRepository->addProductLevering(
            $leverancierId,
            $productId,
            (int) $validated['aantal'],
            $validated['datumEerstVolgendeLevering'] ?? null
        );

        if (! $result['success']) {
            // Scenario 02: Product wordt niet meer geproduceerd
            return back()->with('errorMessage', $result['message']);
        }

        // Scenario 01: Succesvol toegevoegd
        return redirect()
            ->route('leveranciers.producten', $leverancierId)
            ->with('successMessage', $result['message']);
    }
}
