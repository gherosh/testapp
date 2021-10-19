<?php

namespace App\Jobs;

use App\Mail\NewArticleNotification;
use App\Models\Article;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendSubscriptionEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $article;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $ids = $this->article->categories()->pluck('categories.id');
        $emails = Subscription::whereIn('category_id', $ids)->groupBy('email')->pluck('email');
        foreach ($emails as $recipient) {
            Mail::to($recipient)->send(new NewArticleNotification($this->article));
        }
    }
}
