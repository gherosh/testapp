<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Subscription;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreSubscriptionRequest $request
     * @return JsonResponse
     */
    public function store(StoreSubscriptionRequest $request)
    {
        $validated = $request->validated();

        try {$subscription = Subscription::firstOrCreate([
                'category_id' => $validated['categoryId'],
                'email' => $validated['email'],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
        return response()->json([
            'error' => false,
            'message' => 'Subscription added'
        ]);
    }

}
