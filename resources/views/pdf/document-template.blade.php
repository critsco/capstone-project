<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{!! $data["title"] !!}</title>

    <style>
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
            padding: 0;
        }

        .ql-align-center {
            text-align: center !important;
        }

        .ql-align-right {
            text-align: right !important;
        }

        .ql-align-left {
            text-align: left !important;
        }

        .ql-align-justify {
            text-align: justify !important;
        }

        .ql-indent-1 {
            padding-left: 3em;
        }

        .ql-indent-2 {
            padding-left: 6em;
        }

        .ql-indent-3 {
            padding-left: 9em;
        }

        .ql-indent-4 {
            padding-left: 12em;
        }

        .header {
            text-align: center;
            margin-bottom: 24px;
        }

        .header img {
            width: 100px;
            height: auto;
        }

        .header .header-text {
            line-height: 1;
            text-align: center;
        }

        table tr,
        td {
            padding: 0;
            margin: 0;
        }
    </style>
</head>

<body>
    <div class="header">
        <table style="width: 100%">
            <tr>
                <td style="text-align: right"><img src="{{ $data["system_logo_bg"] }}" alt="FSUU Logo" /></td>
                <td style="width: 70%;">
                    <div class="header-text">
                        <p>
                            <span style="font-size: 20pt; font-weight: lighter;">Father Saturnino Urios
                                University</span><br>
                            <span
                                style="font-size: 9pt; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">San
                                Francisco, St., Butuan City 8600, Region XIII Caraga, Philippines</span><br>
                            <span style="font-weight: bold; font-size: 14pt">Computer Studies Program</span>
                        </p>
                    </div>
                </td>
                <td style="text-align: left"><img src="{{ $data["department_logo_bg"] }}" alt="CSP Logo" /></td>
            </tr>
        </table>
    </div>

    <div class="content">
        {!! $data["content"] !!}
    </div>
</body>

</html>