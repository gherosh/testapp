<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
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
        $users = User::factory()->count(10)->create();
        $categories = Category::factory(20)->create();

        for ($i = 0; $i < 300; $i++) {
            $user = $users->random(2)->firstWhere('id', '>', 1);
            Article::factory()
                ->for($user)
                ->hasAttached($categories->random(rand(1, 3)))
                ->create();
        }
    }
}
