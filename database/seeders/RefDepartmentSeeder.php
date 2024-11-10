<?php

namespace Database\Seeders;

use App\Models\RefCourse;
use App\Models\RefDepartment;
use Illuminate\Database\Seeder;

class RefDepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            [
                "department" => "AP - Accountancy Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Accounting Information System"
                    ],
                    [
                        "course" => "Bachelor of Science in Internal Audit"
                    ],
                    [
                        "course" => "Bachelor of Science in Managerial Accounting"
                    ],
                    [
                        "course" => "Bachelor of Science in Management Accounting"
                    ],
                    [
                        "course" => "Bachelor of Science in Accountancy"
                    ],
                    [
                        "course" => "Bachelor of Science in Accounting Technology"
                    ],
                ]
            ],
            [
                "department" => "ASP - Arts and Sciences Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Arts in Economics"
                    ],
                    [
                        "course" => "Bachelor of Arts in Filipino Language"
                    ],
                    [
                        "course" => "Bachelor of Arts in Applied Mathematics"
                    ],
                    [
                        "course" => "Bachelor of Science in Biology"
                    ],
                    [
                        "course" => "Bachelor Of Arts"
                    ],
                    [
                        "course" => "Bachelor of Arts in English Language"
                    ],
                    [
                        "course" => "Bachelor of Arts - Major in Political Science"
                    ],
                    [
                        "course" => "Bachelor of Arts - Major in Communication"
                    ],
                    [
                        "course" => "Bachelor in Human Services"
                    ],
                    [
                        "course" => "Bachelor of Arts in English Language Studies"
                    ],
                    [
                        "course" => "Bachelor of Arts - Major in English Language"
                    ],
                    [
                        "course" => "Bachelor of Arts in Guidance and Counseling"
                    ],
                    [
                        "course" => "Batsilyer ng Sining sa Filipino"
                    ],
                    [
                        "course" => "Bachelor of Arts in Human Service"
                    ],
                    [
                        "course" => "Bachelof of Science in Psychology"
                    ],
                ]
            ],
            [
                "department" => "BAP - Business Administration Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Office Administration"
                    ],
                    [
                        "course" => "Bachelor of Science in Office Administration-With Specialization in Legal Office Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Hotel and Restaurant Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Business Administration-Major in Human Resource Development Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Hospitality Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Business Administration-Major in Operations Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Business Administration-Major in Marketing Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Business Administration-Major in Human Resource Management"
                    ],
                    [
                        "course" => "Bachelor of Science in Social Entrepreneurship-With Specialization in Agri-Aqua Business"
                    ],
                    [
                        "course" => "Bachelor of Science in Social Entrepreneurship-With Specialization in Arts and Crafts Business"
                    ],
                    [
                        "course" => "Bachelor of Science in Business Administration-Major in Financial Management"
                    ],
                ]
            ],
            [
                "department" => "CJEP - Criminal Justice Education Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Criminology"
                    ]
                ]
            ],
            [
                "department" => "CSP - Computer Studies Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Information Technology"
                    ],
                    [
                        "course" => "Bachelor of Science in Computer Science"
                    ],
                    [
                        "course" => "Bachelor of Science in Information Technology - Major in Computer Animation"
                    ],
                    [
                        "course" => "Bachelor of Library and Information Science"
                    ],
                    [
                        "course" => "Computer Programming NC IV"
                    ],
                    [
                        "course" => "Computer Hardware Servicing NC II"
                    ],
                ]
            ],
            [
                "department" => "ETP - Engineering and Technology Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Industrial Engineering"
                    ],
                    [
                        "course" => "Bachelor of Science in Civil Engineering"
                    ]
                ]
            ],
            [
                "department" => "NP - Nursing Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Nursing"
                    ]
                ]
                    ],
            [
                "department" => "TEP - Teachers Education Program",
                "courses" => [
                    [
                        "course" => "Bachelor of Science in Applied Mathematics"
                    ],
                    [
                        "course" => "Bachelor of Special Needs Education"
                    ],
                    [
                        "course" => "Bachelor in Secondary Education Major in Physical Science"
                    ],
                    [
                        "course" => "Bachelor of Secondary Education - Major in Filipino"
                    ],
                    [
                        "course" => "Bachelor of Secondary Education - Major in English"
                    ],
                    [
                        "course" => "Bachelor of Technical Teacher Education Major in Drafting Technology"
                    ],
                    [
                        "course" => "Bachelor of Secondary Education - Major in Social Studies"
                    ],
                    [
                        "course" => "Bachelor of Secondary Education - Major in Science"
                    ],
                    [
                        "course" => "Bachelor in Secondary Education Major in MAPEH"
                    ],
                    [
                        "course" => "Bachelor of Elementary Education"
                    ],
                    [
                        "course" => "Bachelor in Elementary Education Major in Special Education"
                    ],
                    [
                        "course" => "Bachelor of Physical Education"
                    ],
                    [
                        "course" => "Bachelor of Secondary Education - Major in Mathematics"
                    ],
                    [
                        "course" => "Bachelor of Early Childhood Education"
                    ],
                    [
                        "course" => "Bachelor of Science in Physical Education"
                    ],
                    [
                        "course" => "Bachelor of Technical Teacher Education Major in Food and Service Management"
                    ],
                ]
            ],
        ];

        RefDepartment::truncate();
        RefCourse::truncate();

        foreach ($departments as $department) {
            $departmentCreated = RefDepartment::create([
                "department" => $department["department"],
                "created_by" => 1,
            ]);

            foreach ($department["courses"] as $course) {
                RefCourse::create([
                    "department_id" => $departmentCreated->id,
                    "course" => $course["course"],
                    "created_by" => 1,
                ]);
            }
        }
    }
}