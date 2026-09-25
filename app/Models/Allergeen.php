<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allergeen extends Model
{
    protected $table = 'Allergeen';
    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';
    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    public function producten()
    {
        return $this->belongsToMany(Product::class, 'ProductPerAllergeen', 'AllergeenId', 'ProductId');
    }
}
