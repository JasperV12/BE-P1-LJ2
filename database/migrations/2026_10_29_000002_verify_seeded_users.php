<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const SEEDED_EMAILS = [
        'test@example.com',
        'admin@admin.com',
        'magazijn@medewerker.com',
        'klant@klant.com',
    ];

    public function up(): void
    {
        DB::table('users')
            ->whereIn('email', self::SEEDED_EMAILS)
            ->whereNull('email_verified_at')
            ->update(['email_verified_at' => now()]);
    }

    public function down(): void
    {
        DB::table('users')
            ->whereIn('email', self::SEEDED_EMAILS)
            ->update(['email_verified_at' => null]);
    }
};
