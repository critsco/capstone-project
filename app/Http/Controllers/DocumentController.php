<?php

namespace App\Http\Controllers;

use App\Models\DocumentTemplate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function viewDocument($title)
    {
        $document = DocumentTemplate::where("title", $title)->first();

        if (!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        $data = [
            'faculty name' => 'Dr. John Doe',
            'faculty email' => 'john.doe@example.com',
            'date now' => now()->format('F d, Y'),
            'parent name' => 'Mr. and Mrs. Smith',
            'parent address' => '123 Elm Street, Springfield',
            'student name' => 'Jane Smith',
            'student course' => 'Bachelor of Science in Computer Science',
        ];

        // Replace placeholders in the content
        $content = $document->content;
        foreach ($data as $key => $value) {
            $content = str_replace("{" . $key . "}", $value, $content);
    }

        // Render the PDF
        $pdf = Pdf::loadView('pdf.document-template', ['content' => $content, 'title' => $title]);

        // Option 1: Stream the PDF (display in browser)
        return $pdf->stream($document->title . '.pdf');

        // Option 2: Download the PDF file
        // return $pdf->download($type . '.pdf');
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