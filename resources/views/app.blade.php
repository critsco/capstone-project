<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AutoForm</title>
    <link rel="icon" href="{{ asset("favicon.ico") }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ mix("css/app.css") }}">

    <style>
        *,
        :root,
        html,
        body {
            font-family: "Poppins";
            font-size: 1rem;
            margin: 0;
        }

        .splash-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100px !important;
        }

        .splash-loader {
            /* position: absolute;
            top: calc(51% - 32px);
            left: calc(50% - 32px); */
            margin-top: 10px !important;
            margin-left: 63px !important;
            margin: auto;
            width: 64px;
            height: 64px !important;
            border-radius: 50%;
            perspective: 800px;
        }

        .splash-inner {
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        .splash-inner.one {
            left: 0;
            top: 0;
            animation: rotate-one 1s linear infinite;
            border-bottom: 3px solid #2c3d8f;
        }

        .splash-inner.two {
            right: 0;
            top: 0;
            animation: rotate-two 1s linear infinite;
            border-right: 3px solid #2c3d8f;
        }

        .splash-inner.three {
            right: 0;
            bottom: 0;
            animation: rotate-three 1s linear infinite;
            border-top: 3px solid #2c3d8f;
        }

        @keyframes rotate-one {
            0% {
                transform: rotateX(35deg) rotateY(-45deg) rotateZ(0);
            }

            100% {
                transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
            }
        }

        @keyframes rotate-two {
            0% {
                transform: rotateX(50deg) rotateY(10deg) rotateZ(0);
            }

            100% {
                transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
            }
        }

        @keyframes rotate-three {
            0% {
                transform: rotateX(35deg) rotateY(55deg) rotateZ(0);
            }

            100% {
                transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
            }
        }
    </style>
</head>

<body>
    <div id="root"></div>

    <script src="{{ mix("js/app.js") }}"></script>
</body>

</html>
