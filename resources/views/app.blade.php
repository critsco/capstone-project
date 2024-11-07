<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AutoForm</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <style>
        @font-face {
            font-family: 'PoppinsBold';
            src: url("/fonts/Poppins/Poppins-Bold.ttf") format("truetype");
        }

        @font-face {
            font-family: 'PoppinsMedium';
            src: url("/fonts/Poppins/Poppins-Medium.ttf") format("truetype");
        }

        @font-face {
            font-family: 'PoppinsRegular';
            src: url("/fonts/Poppins/Poppins-Regular.ttf") format("truetype");
        }

        *,
        :root,
        html,
        body {
            font-family: "Poppins" !important;
        }
    </style>
</head>

<body>
    <div id="root"></div>

    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>
