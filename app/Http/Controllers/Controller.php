<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\DocumentTemplate;
use App\Models\DocumentTemplateVariable;
use App\Models\Profile;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function document_template($options)
    {
        $title = array_key_exists("title", $options) ? $options["title"] : null;
        $student_id = array_key_exists("student_id", $options) ? $options["student_id"] : null;
        $faculty_id = array_key_exists("faculty_id", $options) ? $options["faculty_id"] : null;

        if ($title) {
            $dataDocumentTemplate = DocumentTemplate::where("title", $title)->first();

            if ($dataDocumentTemplate) {
                $content = $dataDocumentTemplate->content;

                $dataDocumentVariable = DocumentTemplateVariable::get();
                foreach ($dataDocumentVariable as $dataDocumentVariableKey => $dataDocumentVariableVal) {
                    $value_to_replace = "";

                    $value_to_replace = $this->query_field_name([
                        "field_name" => $dataDocumentVariableVal->field_name,
                        "student_id" => $student_id,
                        "faculty_id" => $faculty_id,
                    ]);

                    $content = str_replace($dataDocumentVariableVal->variable_name, $value_to_replace, $content);
                }

                $system_logo_bg = base64_encode(file_get_contents(public_path("images/FSUU_Logo.png")));
                $system_logo_bg = 'data:image/png;base64,' . $system_logo_bg;
                $department_logo_bg = base64_encode(file_get_contents(public_path("images/CSP_Logo.png")));
                $department_logo_bg = 'data:image/png;base64,' . $department_logo_bg;

                $data = [
                    "title" => $title,
                    "content" => $content,
                    "system_logo_bg" => $system_logo_bg,
                    "department_logo_bg" => $department_logo_bg,
                ];

                $pdf = Pdf::loadView('pdf.document-template', ["data" => $data]);
                $pdf->getDomPDF()->setHttpContext(
                    stream_context_create([
                        'ssl' => [
                            'allow_self_signed' => TRUE,
                            'verify_peer' => FALSE,
                            'verify_peer_name' => FALSE,
                        ]
                    ])
                );
                $pdf->setPaper('A4', 'portrait');
                // $pdf->setPaper('LEGAL', 'portrait');
                // // return $pdf->download('payslip.pdf');
                return $pdf->stream($dataDocumentTemplate->title . '-' . date("Y") . '.pdf');
            }
        } else {
            return false;
        }
    }

    private function query_field_name($options)
    {
        $field_name = array_key_exists("field_name", $options) ? $options["field_name"] : null;
        $student_id = array_key_exists("student_id", $options) ? $options["student_id"] : null;
        $faculty_id = array_key_exists("faculty_id", $options) ? $options["faculty_id"] : null;

        switch ($field_name) {
            case "student_firstName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    return $dataStudent->profiles->first_name;
                } else {
                    return "student_firstName";
                }

            case "student_middleName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    return $dataStudent->profiles->middle_name;
                } else {
                    return "student_middleName";
                }

            case "student_middleInitial":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $middleName = $dataStudent->profiles->middle_name;

                    return strtoupper(substr($middleName, 0, 1)) . '.';
                } else {
                    return "student_middleInitial";
                }

            case "student_lastName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    return $dataStudent->profiles->last_name;
                } else {
                    return "student_lastName";
                }

            case "student_suffix":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    return $dataStudent->profiles->first_name;
                } else {
                    return "student_suffix";
                }

            case "student_fullName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $firstName = $dataStudent->profiles->first_name;
                    $middleName = $dataStudent->profiles->middle_name;
                    $lastName = $dataStudent->profiles->last_name;
                    $suffix = $dataStudent->profiles->suffix;

                    $middleInitial = strtoupper(substr($middleName, 0, 1)) . '.';

                    return trim("$firstName $middleInitial $lastName") . trim(" $suffix");
                } else {
                    return "student_fullName";
                }

            case "student_email":
                $dataStudent = User::where("id", $student_id)->first();

                if ($dataStudent) {
                    return $dataStudent->email;
                } else {
                    return "student_email";
                }

            case "student_course":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $studentProfile = Profile::with(['ref_course'])->where("user_id", $student_id)->first();

                    return $studentProfile->ref_course->course;
                } else {
                    return "student_course";
                }

            case "student_address":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $studentProfile = Profile::with(['profile_address'])->where("user_id", $student_id)->first();
                    $street_address = strtoupper($studentProfile->profile_address->street_address);
                    $barangay = $studentProfile->profile_address->ref_barangay->barangay;
                    $municipality = $studentProfile->profile_address->ref_municipality->municipality;

                    return trim("$street_address, $barangay, $municipality");
                } else {
                    return "student_address";
                }

            case "student_schoolId":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    return $dataStudent->profiles->school_id;
                } else {
                    return "student_schoolId";
                }

            case "faculty_firstName":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    return $dataFaculty->profiles->first_name;
                } else {
                    return "faculty_firstName";
                }

            case "faculty_middleName":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    return $dataFaculty->profiles->middle_name;
                } else {
                    return "faculty_middleName";
                }

            case "faculty_middleInitial":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    $middleName = $dataFaculty->profiles->middle_name;

                    return strtoupper(substr($middleName, 0, 1)) . '.';
                } else {
                    return "faculty_middleInitial";
                }

            case "faculty_lastName":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    return $dataFaculty->profiles->last_name;
                } else {
                    return "faculty_lastName";
                }

            case "faculty_suffix":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    return $dataFaculty->profiles->first_name;
                } else {
                    return "faculty_suffix";
                }

            case "faculty_fullName":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    $firstName = $dataFaculty->profiles->first_name;
                    $middleName = $dataFaculty->profiles->middle_name;
                    $lastName = $dataFaculty->profiles->last_name;
                    $suffix = $dataFaculty->profiles->suffix;

                    $middleInitial = strtoupper(substr($middleName, 0, 1)) . '.';

                    return trim("$firstName $middleInitial $lastName") . trim(" $suffix");
                } else {
                    return "faculty_fullName";
                }

            case "faculty_email":
                $dataFaculty = User::where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    return $dataFaculty->email;
                } else {
                    return "faculty_email";
                }

            case "faculty_schoolId":
                $dataFaculty = User::with(['profiles'])->where("id", $faculty_id)->first();

                if ($dataFaculty) {
                    return $dataFaculty->profiles->school_id;
                } else {
                    return "faculty_schoolId";
                }

            case "parent_firstName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataParent = Profile::with(['profile_parent'])->where("id", $student_id)->first();

                    return $dataParent->profile_parent->first_name;
                } else {
                    return "parent_firstName";
                }

            case "parent_middleName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataParent = Profile::with(['profile_parent'])->where("id", $student_id)->first();

                    return $dataParent->profile_parent->middle_name;
                } else {
                    return "parent_middleName";
                }

            case "parent_middleInitial":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataParent = Profile::with(['profile_parent'])->where("id", $student_id)->first();
                    $middleName = $dataParent->profile_parent->middle_name;

                    return strtoupper(substr($middleName, 0, 1)) . '.';
                } else {
                    return "parent_middleInitial";
                }

            case "parent_lastName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataParent = Profile::with(['profile_parent'])->where("id", $student_id)->first();

                    return $dataParent->profile_parent->last_name;
                } else {
                    return "parent_lastName";
                }

            case "parent_suffix":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataParent = Profile::with(['profile_parent'])->where("id", $student_id)->first();

                    return $dataParent->profile_parent->suffix;
                } else {
                    return "parent_suffix";
                }

            case "parent_fullName":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataParent = Profile::with(['profile_parent'])->where("id", $student_id)->first();
                    $firstName = $dataParent->profile_parent->first_name;
                    $middleName = $dataParent->profile_parent->middle_name;
                    $lastName = $dataParent->profile_parent->last_name;
                    $suffix = $dataParent->profile_parent->suffix;

                    $middleInitial = strtoupper(substr($middleName, 0, 1)) . '.';

                    return trim("$firstName $middleInitial $lastName") . trim(" $suffix");
                } else {
                    return "parent_fullName";
                }

            case "company_name":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataCompany = Profile::with(['company'])->where("id", $student_id)->first();

                    return $dataCompany->company->company_name;
                } else {
                    return "company_name";
                }

            case "company_office":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataCompany = Profile::with(['company'])->where("id", $student_id)->first();

                    return $dataCompany->company->office;
                } else {
                    return "company_office";
                }

            case "company_officeHead":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataCompany = Profile::with(['company'])->where("id", $student_id)->first();

                    return $dataCompany->company->office_head;
                } else {
                    return "company_officeHead";
                }

            case "company_email":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataCompany = Profile::with(['company'])->where("id", $student_id)->first();

                    return $dataCompany->company->email;
                } else {
                    return "company_email";
                }

            case "company_address":
                $dataStudent = User::with(['profiles'])->where("id", $student_id)->first();

                if ($dataStudent) {
                    $dataCompany = Profile::with(['company'])->where("id", $student_id)->first();
                    $dataAddress = Company::with(['profile_address'])->where("id", $dataCompany->id)->first();

                    $street_address = strtoupper($dataAddress->profile_address->street_address);
                    $barangay = $dataAddress->profile_address->ref_barangay->barangay;
                    $municipality = $dataAddress->profile_address->ref_municipality->municipality;

                    return trim("$street_address, $barangay, $municipality");
                } else {
                    return "company_address";
                }

            case "date_now":
                return now()->format('F d, Y');

            default:
                return "";
        }
    }
}