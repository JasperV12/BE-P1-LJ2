<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $Id
 * @property string $Naam
 * @property string|null $Barcode
 * @property-read HasOne<Magazijn, $this> $magazijn
 * @property-read BelongsToMany<Allergeen, $this, ProductPerAllergeen, 'pivot'> $allergenen
 * @property-read HasMany<ProductPerAllergeen, $this> $productPerAllergenen
 * @property-read HasMany<ProductPerLeverancier, $this> $productPerLeveranciers
 */
class Product extends Model
{
    protected $table = 'Product';

    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';

    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    /** @return HasOne<Magazijn, $this> */
    public function magazijn(): HasOne
    {
        return $this->hasOne(Magazijn::class, 'ProductId', 'Id');
    }

    /** @return BelongsToMany<Allergeen, $this, ProductPerAllergeen, 'pivot'> */
    public function allergenen(): BelongsToMany
    {
        return $this->belongsToMany(Allergeen::class, 'ProductPerAllergeen', 'ProductId', 'AllergeenId');
    }

    /** @return HasMany<ProductPerAllergeen, $this> */
    public function productPerAllergenen(): HasMany
    {
        return $this->hasMany(ProductPerAllergeen::class, 'ProductId', 'Id');
    }

    /** @return HasMany<ProductPerLeverancier, $this> */
    public function productPerLeveranciers(): HasMany
    {
        return $this->hasMany(ProductPerLeverancier::class, 'ProductId', 'Id');
    }
}
