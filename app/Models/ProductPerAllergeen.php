<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPerAllergeen extends Model
{
    protected $table = 'ProductPerAllergeen';
    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';
    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductId', 'Id');
    }

    public function allergeen()
    {
        return $this->belongsTo(Allergeen::class, 'AllergeenId', 'Id');
    }
}
