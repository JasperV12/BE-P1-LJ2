<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $Id
 * @property int $ProductId
 * @property int $AllergeenId
 * @property-read BelongsTo<Product, $this> $product
 * @property-read BelongsTo<Allergeen, $this> $allergeen
 */
class ProductPerAllergeen extends Model
{
    protected $table = 'ProductPerAllergeen';

    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';

    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    /** @return BelongsTo<Product, $this> */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'ProductId', 'Id');
    }

    /** @return BelongsTo<Allergeen, $this> */
    public function allergeen(): BelongsTo
    {
        return $this->belongsTo(Allergeen::class, 'AllergeenId', 'Id');
    }
}
