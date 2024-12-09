<?php

namespace App\Http\Controllers;

use App\Models\OJTDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OJTDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $intern_name = "TRIM(CONCAT_WS(' ', profiles.first_name, IF(profiles.middle_name='', NULL, profiles.middle_name), profiles.last_name, IF(profiles.suffix='', NULL, profiles.suffix)))";

        $data = OJTDetail::select([
            "*",
            DB::raw("$intern_name intern_name"),
        ])
            ->join('profiles', "profiles.id", "=", "ojt_details.profile_id")
            ->join('companies', "companies.id", "=", "profiles.company_id");

        $data->where(function ($query) use ($request, $intern_name) {
            if ($request->search) {
                $query->orWhere(DB::raw("($intern_name)"), 'LIKE', "%$request->search%");
            }
        });

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'date_started', isset($request->sort_order)  ? $request->sort_order : 'asc');
            }
        } else {
            $data = $data->orderBy('date_started', 'asc');
        }

        if ($request->page_size) {
            $data = $data->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page)
                ->toArray();
        } else {
            $data = $data->get();
        }

        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Failed to update intern status."
        ];
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OJTDetails  $oJTDetails
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = OJTDetail::where('profile_id', $id)->first();

        return response()->json([
            "success" => true,
            "data" => $data,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OJTDetails  $oJTDetails
     * @return \Illuminate\Http\Response
     */
    public function edit(OJTDetails $oJTDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OJTDetails  $oJTDetails
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ret = [
            "success" => false,
            "message" => "Failed to update intern status."
        ];

        // Find the OJTDetail record by ID
        $ojtDetail = OJTDetail::find($id);

        // Check if the record exists
        if (!$ojtDetail) {
            return response()->json([
                'success' => false,
                'message' => 'Record not found.',
            ], 404);
        } else {
            // Update the fields dynamically from the request
            $fields = $request->only([
                'status',
                'moa_status',
                'moa_note',
                'ltp_status',
                'ltp_note',
                'wfp_status',
                'wfp_note',
                'endorsement_status',
                'endorsement_note',
                'dtr_status',
                'dtr_note',
                'eval_form_status',
                'eval_form_note',
                'term_rep_status',
                'term_rep_note',
            ]);

            foreach ($fields as $field => $value) {
                // Check if it's a "status" field that needs date tracking
                if (strpos($field, '_status') !== false) {
                    $startDateField = str_replace('_status', '_start_date', $field);
                    $updateDateField = str_replace('_status', '_update_date', $field);
    
                    // Set the start date if it's the first time status is non-empty
                    if (empty($ojtDetail->$startDateField) && !empty($value)) {
                        $ojtDetail->$startDateField = now()->format('Y-m-d');
                    }
    
                    // Always update the update_date field when status changes (even to blank)
                    $ojtDetail->$updateDateField = now()->format('Y-m-d');
                }
    
                // Update the field value
                $ojtDetail->$field = $value;
            }

            if ($request->status == "started" && empty($ojtDetail->date_started)) {
                $ojtDetail->date_started = now()->format('Y-m-d');
            }

             // Save updated_by field and save changes
            $ojtDetail->updated_by = auth()->user()->id;
            $ojtDetail->save();

            $ret = [
                "success" => true,
                "message" => "Intern status updated succcessfully.",
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OJTDetails  $oJTDetails
     * @return \Illuminate\Http\Response
     */
    public function destroy(OJTDetails $oJTDetails)
    {
        //
    }

    public function student_status()
    {
        $data = OJTDetail::where('profile_id', auth()->user()->id);

        return response()->json([
            "success" => true,
            "data" => $data,
        ], 200);
    }
}