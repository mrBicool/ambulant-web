<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login | {{ config('app.name') }}</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="assets/images/logo/dsc-logo.ico">

    <!-- plugins css -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="bower_components/PACE/themes/blue/pace-theme-minimal.css" />
    <link rel="stylesheet" href="bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css" />

    <!-- core css -->
    <link href="assets/css/ei-icon.css" rel="stylesheet">
    <link href="assets/css/themify-icons.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/css/animate.min.css" rel="stylesheet">
    <link href="assets/css/app.css" rel="stylesheet">

    <!-- page plugins css -->
    <link rel="stylesheet" href="/css/plugins/iziToast.min.css" />

    @yield('css')
</head>
<body>
    
    {{-- CONTENT  --}}
    <div class="app">
        <div class="layout">
            @include('layouts.sidenav')

                <!-- Page Container START -->
                <div class="page-container">

                    @include('layouts.topnav')

                    @include('layouts.sidepanel')

                    @include('layouts.theme-config')

                    <!-- Theme Toggle Button START -->
                    <button class="theme-toggle btn btn-rounded btn-icon">
                        <i class="ti-palette"></i>
                    </button>
                    <!-- Theme Toggle Button END -->

                    <!-- Content Wrapper START -->
                    <div class="main-content">
                        <div class="container-fluid">
                            @yield('content')
                        </div>
                    </div>
                    
                </div>

            @include('layouts.footer')
        </div>
       
    </div>
    {{-- END OF CONTENT --}}

    <script src="assets/js/vendor.js"></script> 
    <script src="assets/js/app.min.js"></script> 
    <script src="/js/plugins/iziToast.min.js"></script> 
    <script src="js/config.js"></script>
    <!-- page js -->
    @yield('js')
</body>
</html>