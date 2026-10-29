<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $Id
 * @property int $ProductId
 * @property string $VerpakkingsEenheid
 * @property int|null $AantalAanwezig
 * @property bool $IsActief
 * @property-read Product $product
 */
class Magazijn extends Model
{
    protected $table = 'Magazijn';

    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';

    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
        'VerpakkingsEenheid' => 'decimal:1',
    ];

    /** @return BelongsTo<Product, $this> */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'ProductId', 'Id');
    }
}
