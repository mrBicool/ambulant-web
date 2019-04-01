@extends('layouts.master')

@section('js')
    <script src="js/pages/index.js"></script>
@endsection

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb"> 
        <li class="breadcrumb-item active" aria-current="page">Category</li>
    </ol>
</nav>
<br>
<div class="container">
    <div class="row" id="container">

        {{-- <div class="col-md-4">
            <a href="#ask-1" class="card mrg-btm-15 scroll-to">
                <div class="card-block padding-25">
                    <ul class="list-unstyled list-info">
                        <li> 
                            <div class="info"  style="padding-left: 0px;">
                                <b class="text-dark font-size-18">Category 1</b>
                            </div>
                        </li>
                    </ul>
                </div>
            </a>
        </div> --}}

    </div>
</div>

@endsection