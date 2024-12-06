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
        $intern_name = "TRIM(CONCAT_WS(' ', profiles.first_name, IF(profiles.middle_name='', NULL, profiles.middle_name), profiles.last_name, IF(profiles.suffix='', NULL, profiles.suffix)))";

        $data = Schedule::select([
            "*",
            // DB::raw("$intern_name intern_name"),
        ])
            ->join('profiles', 'profiles.id', '=', 'schedules.profile_id')
            ->with("profile");

        $data->where(function ($query) use ($request) {
            if ($request->search) {
                $query->orWhere('intern_name', 'LIKE', "%$request->search%");
            }
        });

        if ($request->purpose == "Visitation") {
            $data->where("purpose", "Visitation");
        } else {
            $data->where("purpose", "Others");
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
            "message" => "Schedule was not created"
        ];

        if (!$request->document) {
            $data = [
                "purpose" => $request->purpose,
                "profile_id" => $request->profile_id,
                "date" => $request->date,
                "time" => date('H:i A', strtotime($request->time)),
            ];

            $schedule = Schedule::updateOrCreate(
                ["id" => $request->id],
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
                "time" => date('H:i A', strtotime($request->time)),
            ];

            $schedule = Schedule::updateOrCreate(
                ["id" => $request->id],
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
        //
    }
}
