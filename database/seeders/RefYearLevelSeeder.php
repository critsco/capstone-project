<?php

namespace Database\Seeders;

use App\Models\RefYearLevel;
use Illuminate\Database\Seeder;

class RefYearLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        RefYearLevel::truncate();

        $data = [
            [
                'year_level' => '1st Year',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'year_level' => '2nd Year',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'year_level' => '3rd Year',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'year_level' => '4th Year',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        RefYearLevel::insert($data);
    }
}