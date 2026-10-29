<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $Id
 * @property string $Naam
 * @property string|null $ContactPersoon
 * @property string|null $LeverancierNummer
 * @property string|null $Mobiel
 * @property bool $IsActief
 * @property-read HasMany<ProductPerLeverancier, $this> $productPerLeveranciers
 */
class Leverancier extends Model
{
    protected $table = 'Leverancier';

    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';

    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    /** @return HasMany<ProductPerLeverancier, $this> */
    public function productPerLeveranciers(): HasMany
    {
        return $this->hasMany(ProductPerLeverancier::class, 'LeverancierId', 'Id');
    }
}
