<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $fullname = "TRIM(CONCAT_WS(' ', first_name, IF(middle_name='', NULL, middle_name), last_name, IF(suffix='', NULL, suffix)))";
        $email = "(SELECT email FROM users WHERE users.id = profiles.user_id)";
        $created_at_formatted = "DATE_FORMAT(profiles.created_at, '%m-%d-%Y')";
        $user_role_id = "(SELECT user_role_id FROM users WHERE users.id = profiles.user_id)";

        $data = Profile::select([
            "*",
            DB::raw("$fullname fullname"),
            DB::raw("$email email"),
            DB::raw("$created_at_formatted created_at_formatted"),
        ]);

        $data->where(function ($query) use ($request, $fullname, $email, $created_at_formatted) {
            if ($request->search) {
                $query->orWhere(DB::raw("$fullname"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("$email"), 'LIKE', "%$request->search%");
                $query->orWhere(DB::raw("$created_at_formatted"), 'LIKE', "%$request->search%");
            }
        });

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data->orderBy('id', 'desc');
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fullname = "TRIM(CONCAT_WS(' ', profiles.first_name, IF(profiles.middle_name='', NULL, profiles.middle_name), profiles.last_name, IF(profiles.suffix='', NULL, profiles.suffix)))";
        $parent_fullname = "TRIM(CONCAT_WS(' ', profile_parents.first_name, IF(profile_parents.middle_name='', NULL, profile_parents.middle_name), profile_parents.last_name, IF(profile_parents.suffix='', NULL, profile_parents.suffix)))";
        $address = "TRIM(CONCAT_WS(', ', UPPER(profile_addresses.street_address), ref_barangays.barangay, ref_municipalities.municipality, ref_provinces.province, ref_regions.region))";

        $data = Profile::select([
            '*',
            DB::raw("$fullname fullname"),
            DB::raw("$parent_fullname parent_fullname"),
            DB::raw("$address address"),
        ])
        ->leftJoin('profile_parents', 'profiles.parent_id', '=', 'profile_parents.id')
        ->leftJoin('profile_addresses', 'profiles.address_id', '=', 'profile_addresses.id')
        ->leftJoin('ref_barangays', 'profile_addresses.barangay_id', '=', 'ref_barangays.id')
        ->leftJoin('ref_municipalities', 'profile_addresses.municipality_id', '=', 'ref_municipalities.id')
        ->leftJoin('ref_provinces', 'profile_addresses.province_id', '=', 'ref_provinces.id')
        ->leftJoin('ref_regions', 'profile_addresses.region_id', '=', 'ref_regions.id')
        ->with([
            'user',
            'profile_parent',
            'company',
            'ref_year_level',
            'ref_department',
            'ref_course'
        ])->find($id);

        return response()->json([
            "success" => true,
            "data" => $data
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }
}