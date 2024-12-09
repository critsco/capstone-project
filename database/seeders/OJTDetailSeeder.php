<?php

namespace Database\Seeders;

use App\Models\OJTDetail;
use Illuminate\Database\Seeder;

class OJTDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        OJTDetail::truncate();

        $data = [
            [
                'profile_id' => 2,
                'created_at' => now(),
            ],
        ];

        OJTDetail::insert($data);
    }
}