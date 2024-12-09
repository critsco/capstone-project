<?php

namespace Database\Seeders;

use App\Models\InternClass;
use Illuminate\Database\Seeder;

class InternClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        InternClass::truncate();

        $data = [
            [
                'class_code' => 'BSIT24',
                'instructor_id' => 1,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        InternClass::insert($data);
    }
}