<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leverancier extends Model
{
    protected $table = 'Leverancier';
    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';
    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    public function productPerLeveranciers()
    {
        return $this->hasMany(ProductPerLeverancier::class, 'LeverancierId', 'Id');
    }
}
