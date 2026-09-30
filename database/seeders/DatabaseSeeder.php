<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        DB::unprepared(file_get_contents(database_path('create_script.sql')));

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('Password'),
            'rolename' => 'Admin',
        ]);

        User::factory()->create([
            'name' => 'Magazijn Medewerker',
            'email' => 'magazijn@medewerker.com',
            'password' => bcrypt('Password'),
            'rolename' => 'Magazijn Medewerker',
        ]);

        User::factory()->create([
            'name' => 'Klant',
            'email' => 'klant@klant.com',
            'password' => bcrypt('Password'),
            'rolename' => 'Klant',
        ]);
    }
}
