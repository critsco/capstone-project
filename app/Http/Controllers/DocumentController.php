<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;

class DocumentController extends Controller
{
    public function viewDocument($type)
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