<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $intern_name = "TRIM(CONCAT_WS(' ', intern.first_name, IF(intern.middle_name='', NULL, intern.middle_name), intern.last_name, IF(intern.suffix='', NULL, intern.suffix)))";
        $instructor_name = "TRIM(CONCAT_WS(' ', instructor.first_name, IF(instructor.middle_name='', NULL, instructor.middle_name), instructor.last_name, IF(instructor.suffix='', NULL, instructor.suffix)))";

        $data = Schedule::select([
            "schedules.*",
            "intern.school_id",
            "companies.company_name",
            "companies.office_head",
            DB::raw("$intern_name intern_name"),
            DB::raw("$instructor_name instructor_name"),
        ])
            ->join('profiles as intern', 'intern.id', '=', 'schedules.profile_id')
            ->join('intern_classes', "intern_classes.id", "=", "intern.intern_class_id")
            ->join('profiles as instructor', "intern_classes.instructor_id", "=", "instructor.id")
            ->join('companies', "companies.id", "=", "intern.company_id")
            ->where("intern_classes.instructor_id", auth()->user()->id);
            // ->with("profile");

        $data->where(function ($query) use ($request) {
            if ($request->search) {
                $query->orWhere('intern_name', 'LIKE', "%$request->search%");
            }
        });

        if ($request->purpose) {
            $data->where("purpose", $request->purpose);
        }

        if ($request->isTrash) {
            $data->onlyTrashed();
        }

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'intern_name', isset($request->sort_order)  ? $request->sort_order : 'asc');
            }
        } else {
            $data = $data->orderBy('intern_name', 'asc');
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
            "message" => "Schedule was not " . ($request->id ? "updated" : "created") . " .",
        ];

        if (!$request->document) {
            $data = [
                "purpose" => $request->purpose,
                "profile_id" => $request->profile_id,
                "note" => "For visitation",
                "date" => $request->date,
                "time" => $request->time,
            ];

            $data += $request->id ? ["updated_by" => auth()->user()->id] : ["created_by" => auth()->user()->id];

            $findArchivedData = Schedule::withTrashed()->find($request->id);

            if ($findArchivedData) {
                Schedule::where('id', $request->id)->restore();
            }

            $schedule = Schedule::updateOrCreate(
                ["id" => $request->id ?? null],
                $data,
            );

            if ($schedule) {
                $ret = [
                    "success" => true,
                    "message" => "Schedule " . ($request->id ? "updated" : "created") . " successfully.",
                ];
            }
        } else {
            $data = [
                "purpose" => $request->purpose,
                "profile_id" => $request->profile_id,
                "document" => $request->document,
                "note" => $request->note,
                "date" => $request->date,
                "time" => $request->time,
            ];

            $data += $request->id ? ["updated_by" => auth()->user()->id] : ["created_by" => auth()->user()->id];

            $findArchivedData = Schedule::withTrashed()->find($request->id);
            
            if ($findArchivedData) {
                Schedule::where('id', $request->id)->restore();
            }

            $schedule = Schedule::updateOrCreate(
                ["id" => $request->id ?? null],
                $data,
            );

            if ($schedule) {
                $ret = [
                    "success" => true,
                    "message" => "Schedule " . ($request->id ? "updated" : "created") . " successfully.",
                ];
            }
        }

        

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ret = [
            "success" => false,
            "message" => "Data not archived"
        ];

        $findData = Schedule::find($id);

        if ($findData) {
            if ($findData->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "Schedule archived successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }
}