<?php

namespace App\Http\Controllers;

use App\Models\DocumentTemplate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function viewDocument($title)
    {
        return $this->document_template([
            'title' => $title,
            'student_id' => 2,
            'faculty_id' => 1,
        ]);
    }

    public function pdf($type)
    {
        // Define the mapping of document types to Blade templates
        $templates = [
            'moa' => 'pdf.memorandum-of-agreement-template',
            'ltp' => 'pdf.letter-to-parent-template',
            'wfp' => 'pdf.waiver-from-parent-template',
            'endorsement' => 'pdf.endorsement-letter-template',
        ];

        if (!array_key_exists($type, $templates)) {
            return response()->json(['error' => 'Document template not found: ' . $type], 404);
        }

        if ($type) {
            $system_logo_bg = base64_encode(file_get_contents(public_path("images/FSUU_Logo.png")));
            $system_logo_bg = 'data:image/png;base64,' . $system_logo_bg;
            $department_logo_bg = base64_encode(file_get_contents(public_path("images/CSP_Logo.png")));
            $department_logo_bg = 'data:image/png;base64,' . $department_logo_bg;
        }

        // Example data to pass to the template (replace with real data)
        $data = [
            'name' => 'John Doe',
            'date' => now()->toFormattedDateString(),
        ];

        // Render the PDF
        $pdf = Pdf::loadView($templates[$type], $data);

        // Option 1: Stream the PDF (display in browser)
        return $pdf->stream($type . '.pdf');

        // Option 2: Download the PDF file
        // return $pdf->download($type . '.pdf');
    }
}