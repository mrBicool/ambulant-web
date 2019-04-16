<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login',                'PagesController@login');
Route::get('/',                     'PagesController@home');
Route::get('/sub-category',         'PagesController@subCategory');
Route::get('/sub-category/products','PagesController@products');
Route::get('/product',              'PagesController@product');
Route::get('/my-order',             'PagesController@myOrder');
Route::get('/my-order/edit',        'PagesController@editOrder'); 
Route::get('/pending-order',        'PagesController@pendingOrder');
Route::get('/completed-order',      'PagesController@completedOrder');