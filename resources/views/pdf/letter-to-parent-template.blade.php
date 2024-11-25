<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letter to Parent</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            margin: 0;
            padding: 0;
            line-height: 1.5;
            font-size: 12pt;
        }

        p {
            padding: 0;
            margin: 0;
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

        table tr, td {
            padding: 0;
            margin: 0;
        }

        .address td {
            vertical-align: top;
            padding-bottom: 10px;
            padding-right: 10px;
        }

        .content {
            text-align: justify;
            margin-top: 20px;
        }

        @page {
            margin: 1.27cm 2.54cm;
            size: A4 portrait;
        }
    </style>
</head>

<body>
    <div class="header">
        <table style="width: 100%">
            <tr>
                <td style="text-align: right"><img src="<?php echo public_path('images/FSUU_Logo.png'); ?>" alt="FSUU Logo" /></td>
                <td style="width: 70%;">
                    <div class="header-text">
                        <p>
                            <span style="font-size: 20pt; font-weight: lighter;">Father Saturnino Urios University</span><br>
                            <span style="font-size: 9pt; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">San Francisco, St., Butuan City 8600, Region XIII Caraga, Philippines</span><br>
                            <span style="font-weight: bold; font-size: 14pt">Computer Studies Program</span>
                        </p>
                    </div>
                </td>
                <td style="text-align: left"><img src="<?php echo public_path('images/CSP_Logo.png'); ?>" alt="CSP Logo" /></td>
            </tr>
        </table>
    </div>

    <div class="address">
        <table style="width: 100%; border-bottom: 1px solid black;">
            <tr>
                <td style="line-height: 1">FROM:</td>
                <td>
                    <p style="line-height: 1">
                        <b>REJEENALD M. FLORES, MSCS</b><br>
                        Practicum Instructor, Computer Studies Program<br>
                        Father Saturnino Urios University, San Francisco St., Butuan City<br>
                        rmflores@urios.edu.ph / csp@urios.edu.ph
                    </p>
                </td>
            </tr>
            <tr>
                <td>DATE:</td>
                <td>February 29, 2024</td>
            </tr>
            <tr>
                <td>TO:</td>
                <td>
                    <p>
                        <b>ROSARIO A. PABATANG</b><br>
                        P-6A Sidlakan, Brgy. Sto. Niño, Butuan City
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding-bottom: 0;"><b>SUBJECT:</b></td>
                <td style="padding-bottom: 0;"><b>OJT Program Requirement and Waiver for CSP Students.</b></td>
            </tr>
        </table>
    </div>

    <div class="content">
        <p>Dear Parent/Guardian,</p>
        <br>
        <p>Greetings!</p>
        <br>
        <p>
            I am writing to inform you that your child/ward <b>MARY ROSE A. PABATANG</b> enrolled in the <b>BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</b>, is required to participate in our On-the-Job Training (OJT) program as part of their academic curriculum. This program provides valuable hands-on experience in their field of study.
        </p>
        <br>
        <p>
            Enclosed, please find a waiver document outlining the terms and conditions of the OJT program. Please review, sign, and return it at your earlist convenience.
        </p>
        <br>
        <p>
            If you have ay questions or concerns, please feel free to contact the Computer Studies Program office.
        </p>
        <br>
        <p>Sincerely,</p>
        <br>
        <p style="line-height: 1">
            <b>REJEENALD M. FLORES, MSCS</b><br>
            Practicum Instructor
        </p>
        <br>
        <p>Noted by:</p>
        <br>
        <p style="line-height: 1">
            <b>LAMBERTO C. BOLIGOR, MSIT, MBE</b><br>
            Dean, Computer Studies Program<br>
            Father Saturnino Urios University<br>
            Butuan City
        </p>

        <br>

        <table style="width: 100%; border-top: 1px solid black">
            <tr>
                <td>
                    <p style="line-height: 1">
                        <b>CC:</b> Office of the Computer Studies program<br>
                        <b>ATTACHMENT:</b> On-The-Job (OJT) Program Waiver from Parents
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>