<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $Id
 * @property string $Naam
 * @property string|null $Omschrijving
 * @property-read BelongsToMany<Product, $this, ProductPerAllergeen, 'pivot'> $producten
 */
class Allergeen extends Model
{
    protected $table = 'Allergeen';

    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';

    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    /** @return BelongsToMany<Product, $this, ProductPerAllergeen, 'pivot'> */
    public function producten(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'ProductPerAllergeen', 'AllergeenId', 'ProductId');
    }
}
