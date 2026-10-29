<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('Leverancier')) {
            return;
        }

        DB::table('Leverancier')->updateOrInsert(
            ['Id' => 6],
            [
                'Naam' => 'Quality Street',
                'ContactPersoon' => 'Johan Nooij',
                'LeverancierNummer' => 'L1029234586',
                'Mobiel' => '06-23458456',
                'IsActief' => true,
                'Opmerking' => null,
            ],
        );
    }

    public function down(): void
    {
        if (! Schema::hasTable('Leverancier')) {
            return;
        }

        DB::table('Leverancier')
            ->where('Id', 6)
            ->where('Naam', 'Quality Street')
            ->delete();
    }
};
