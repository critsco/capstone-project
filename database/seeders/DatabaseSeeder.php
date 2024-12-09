<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            UserRoleSeeder::class,
            RefDepartmentSeeder::class,
            RefRegionSeeder::class,
            RefYearLevelSeeder::class,
            InternClassSeeder::class,
            OJTDetailSeeder::class,
            DocumentTemplateSeeder::class,
        ]);
    }
}