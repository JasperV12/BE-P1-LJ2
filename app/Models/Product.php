<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'Product';
    protected $primaryKey = 'Id';

    const CREATED_AT = 'DatumAangemaakt';
    const UPDATED_AT = 'DatumGewijzigd';

    protected $casts = [
        'IsActief' => 'boolean',
    ];

    public function magazijn()
    {
        return $this->hasOne(Magazijn::class, 'ProductId', 'Id');
    }

    public function allergenen()
    {
        return $this->belongsToMany(Allergeen::class, 'ProductPerAllergeen', 'ProductId', 'AllergeenId');
    }

    public function productPerAllergenen()
    {
        return $this->hasMany(ProductPerAllergeen::class, 'ProductId', 'Id');
    }

    public function productPerLeveranciers()
    {
        return $this->hasMany(ProductPerLeverancier::class, 'ProductId', 'Id');
    }
}
