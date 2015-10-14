<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class SaveScoreRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize ()
    {
        // return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        return [
		"name"	=> "required|max:3|string",
		"score" => "min:0|integer"
        ];
    }
}
