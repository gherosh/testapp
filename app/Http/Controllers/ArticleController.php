<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $page = request()->get('page', 1);

        $items = Cache::remember('articles'.$page, 86400, function() {
            return Article::with('categories')->orderBy('id', 'desc')->paginate(10);
        });

        return ArticleResource::collection($items);
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
     * @param StoreArticleRequest $request
     * @return JsonResponse
     */
    public function store(StoreArticleRequest $request)
    {
        $validated = $request->validated();
        try {
            $article = Article::firstOrCreate([
                'title' => $validated['title'],
                'slug' => Str::slug($validated['title']),
                'content' => $validated['content'],
                'user_id' => $validated['userId'],
            ]);
            $article->categories()->sync(json_decode($validated['categoryId']));

            //forget cache
            $count = Article::count();
            $pages = ceil($count/10);
            for ($i = 1; $i <= $pages; $i++) {
                Cache::forget('articles'.$i);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
        return response()->json([
            'error' => false,
            'message' => 'Article added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $slug
     * @return ArticleResource
     */
    public function show($slug)
    {
        $item = Cache::remember('article'.$slug, 86400, function() use ($slug) {
            return Article::with('categories')->whereSlug($slug)->firstOrFail();
        });
        return new ArticleResource($item);
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
     * @param Request $request
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
