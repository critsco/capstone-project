<?php

namespace Database\Seeders;

use App\Models\DocumentTemplate;
use Illuminate\Database\Seeder;

class DocumentTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DocumentTemplate::truncate();

        $data = [
            [
                'title' => 'Letter to Parent',
                'content' => '<p><span style="font-size: 12pt;">FROM:</span><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{faculty name}</strong></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Practicum Instructor, Computer Studies Program</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Father Saturnino Urios University, San Francisco St,&nbsp;Butuan City</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{faculty email} / csp@urios.edu.ph</p><p><br></p><p>DATE:<span style="font-size: 12pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date now}</span></p><p><br></p><p><span style="font-size: 12pt;">TO:</span><strong style="font-size: 12pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parent name}</strong></p><p><span style="font-size: 12pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{parent address}</span></p><p><br></p><p><strong style="font-size: 12pt;">SUBJECT:</strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OJT Program Requirement and Waiver for CSP Students.</strong></p><p><br></p><p>Dear Parent/Guardian,</p><p><br></p><p>Greetings!</p><p><br></p><p class="ql-align-justify">I am writing to inform you that your child/ward <strong>{student name}</strong> enrolled in the <strong>{student course}</strong>, is required to participate in our On-the-Job Training (OJT) program as part of their academic curriculum. This program provides valuable hands-on experience in their field of study.</p><p><br></p><p class="ql-align-justify">Enclosed, please find a waiver document outlining the terms and conditions of the OJT program. Please review, sign, and return it at your earlist convenience.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">If you have any questions or concerns, please feel free to contact the Computer Studies Program office.</p><p><br></p><p>Sincerely,</p><p><br></p><p><strong>{faculty name}</strong></p><p>Practicum Instructor</p><p><br></p><p>Noted by:</p><p><br></p><p><strong>LAMBERTO C. BOLIGOR, MSIT, MBE</strong></p><p>Dean, Computer Studies Program</p><p>Father Saturnino Urios University</p><p>Butuan City</p>',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Waiver from Parents',
                'content' => `<p class="ql-align-center"><strong style="font-family: &quot;Times New Roman&quot;; font-size: 16pt;">ON-THE-JOB (OJT) PROGRAM WAIVER FROM PARENTS</strong></p><p><br></p><p class="ql-align-justify"><span style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">I, </span><strong style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">{parent name}</strong><span style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">, acknowledge that </span><strong style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">{student name}</strong><span style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">, taking </span><strong style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">{student course}</strong><span style="font-family: &quot;Times New Roman&quot;; font-size: 12pt;">, is required to participate in the On-the-Job Training (OJT) program as part of their academic curriculum at Father Saturnino Urios University.</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="font-family: &quot;Times New Roman&quot;;">I understand the program's objectives and the potential risks involved. In consideration of my child/ward's participation, I waive, release, and discharge Father Saturnino Urios University from any liability.</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="font-family: &quot;Times New Roman&quot;;">I agree to indemnify and hold harmless Father Saturnino Urios University from any claims arising from my child/ward's participation in the OJT program.</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="font-family: &quot;Times New Roman&quot;;">Signature of Parent/Guardian: </span><strong style="font-family: &quot;Times New Roman&quot;;">{parent name}</strong></p><p class="ql-align-justify"><span style="font-family: &quot;Times New Roman&quot;;">Date: ______________________</span></p>`,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DocumentTemplate::insert($data);
    }
}