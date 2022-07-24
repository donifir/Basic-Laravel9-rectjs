<?php

namespace Database\Seeders;

use App\Models\Suplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Suplier::create([
            'nama_suplier'=>'doni suplier',
            'alamat_suplier'=>'malang',
            'telp_suplier'=>'08222',
        ]);
    }
}
