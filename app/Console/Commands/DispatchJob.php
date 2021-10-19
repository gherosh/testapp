<?php

namespace App\Console\Commands;

use App\Jobs\SendSubscriptionEmail;
use App\Models\Article;
use Illuminate\Console\Command;

class DispatchJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dispatch:job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Dispatch SendSubscription job for testing';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        dispatch(new SendSubscriptionEmail(Article::whereId(2)->first()))->delay(now()->addSeconds(2));
        return 0;
    }
}
