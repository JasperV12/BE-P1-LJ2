<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductId', 'Id');
    }
}
