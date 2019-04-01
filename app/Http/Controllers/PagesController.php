<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    //
    public function login(){
        return view('pages.login');
    }

    public function home(){
        return view('pages.home');
    }

    public function subCategory(){
        return view('pages.sub-category');
    }

    public function products(){
        return view('pages.products');
    }
}
