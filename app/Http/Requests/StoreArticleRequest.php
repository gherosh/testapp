<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    { //return [];
        return [
            'title' => 'required|min:3|max:100',
            'content' => 'required|min:3|max:255',
            'userId' => 'required|int|min:3|max:255',
            'categoryId' => 'required|json|min:1',
        ];
    }
}
