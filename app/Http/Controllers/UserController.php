<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $items = Cache::remember('users', 86400, function() {
            return User::orderBy('id', 'desc')->get();
        });
        return UserResource::collection($items);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        try {
            $user = User::firstOrCreate([
                'name' => $validated['name'],
                'surname' => $validated['surname'],
                'email' => $validated['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($validated['password']),
                'image' => 'https://via.placeholder.com/100x100.png/006600?text=QZ',
                'remember_token' => Str::random(10),
            ]);

            if ($request->hasFile('file')) {
                $image = $request->file('file');
                $filename = 'avatar' . $user->id . time() . '480.jpg';
                $relative_dir = 'uploads/' . date('Y_m');

                $dir = public_path($relative_dir);

                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                $path = $dir . '/' . $filename;
                Image::make($image->getRealPath())->widen(480)->save($path, 90, 'jpg');
                $user->image = $relative_dir . '/' . $filename;
                $user->save();
            }
            Cache::forget('users');
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
        return response()->json([
            'error' => false,
            'message' => 'User added'
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return UserResource
     */
    public function show($id)
    {
        $item = Cache::remember('user'.$id, 86400, function() use ($id) {
            return User::with('articles')->whereId($id)->firstOrFail();
        });
        return new UserResource($item);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
