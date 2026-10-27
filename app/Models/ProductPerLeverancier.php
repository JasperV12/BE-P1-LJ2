<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $Id
 * @property int $ProductId
 * @property int $LeverancierId
 * @property Carbon|null $DatumLevering
 * @property int $Aantal
 * @property Carbon|null $DatumEerstVolgendeLevering
 * @property-read Leverancier $leverancier
 * @property-read Product $product
 */
class ProductPerLeverancier extends Model
{
    protected $table = 'ProductPerLeverancier';

    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';

    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
        'DatumLevering' => 'date',
        'DatumEerstVolgendeLevering' => 'date',
    ];

    /** @return BelongsTo<Leverancier, $this> */
    public function leverancier(): BelongsTo
    {
        return $this->belongsTo(Leverancier::class, 'LeverancierId', 'Id');
    }

    /** @return BelongsTo<Product, $this> */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'ProductId', 'Id');
    }
}
