<?php

namespace App\Http\Controllers;

use App\Models\InternClass;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class InternClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = InternClass::where('instructor_id', $request->instructor_id)->get();

        return response()->json([
            "success" => true,
            "data" => $data
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
            "success" => true,
            "message" => "Data not saved",
        ];

        $internClassData = [
            "class_code" => $request->class_code,
            "instructor_id" => $request->instructor_id,
        ];

        $internClassData += $request->id ? ["updated_by" => auth()->user()->id] : ["created_by" => auth()->user()->id];

        $internClassDetail = InternClass::updateOrCreate(
            ["id" => $request->id ?? null],
            $internClassData
        );

        if ($internClassData) {
            $ret = [
                "success" => true,
                "message" => "Data ceated successfully"
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InternClass  $internClass
     * @return \Illuminate\Http\Response
     */
    public function show($instructor_id)
    {
        $data = InternClass::where("instructor_id", $instructor_id)->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InternClass  $internClass
     * @return \Illuminate\Http\Response
     */
    public function edit(InternClass $internClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InternClass  $internClass
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InternClass $internClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InternClass  $internClass
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ret = [
            "success" => false,
            "message" => "Data not archived"
        ];

        $findData = InternClass::find($id);

        if ($findData) {
            if ($findData->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "Data archived successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function get_class_interns(Request $request)
    {
        $fullname = "TRIM(CONCAT_WS(' ', profiles.first_name, IF(profiles.middle_name='', NULL, profiles.middle_name), profiles.last_name, IF(profiles.suffix='', NULL, profiles.suffix)))";

        $data = Profile::select([
            "*",
            DB::raw("$fullname fullname"),
        ])
            ->with("user")
            ->where("intern_class_id", $request->class_id)
            ->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ], 200);
    }

    public function get_interns()
    {
        $fullname = "TRIM(CONCAT_WS(' ', profiles.first_name, IF(profiles.middle_name='', NULL, profiles.middle_name), profiles.last_name, IF(profiles.suffix='', NULL, profiles.suffix)))";

        $data = Profile::select([
            "*",
            DB::raw("$fullname fullname"),
        ])
            ->join("intern_classes", "intern_classes.id", "=", "profiles.intern_class_id")
            ->with("user", "intern_class")
            ->where("intern_classes.instructor_id", auth()->user()->id)
            ->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ], 200);
    }
}
