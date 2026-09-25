<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function leverancier()
    {
        return $this->belongsTo(Leverancier::class, 'LeverancierId', 'Id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductId', 'Id');
    }
}
