<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
        $email = "(SELECT email FROM users WHERE users.id = profiles.user_id)";
        $parent_fullname = "TRIM(CONCAT_WS(' ', profile_parents.first_name, IF(profile_parents.middle_name='', NULL, profile_parents.middle_name), profile_parents.last_name, IF(profile_parents.suffix='', NULL, profile_parents.suffix)))";
        $address = "TRIM(CONCAT_WS(', ', UPPER(profile_addresses.street_address), ref_barangays.barangay, ref_municipalities.municipality, ref_provinces.province, ref_regions.region))";

        $data = Profile::select([
            'profiles.*',
            DB::raw("$fullname fullname"),
            DB::raw("$email email"),
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
                'profile_parent',
                'profile_address',
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

    public function update_student_profile(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Profile not updated",
            "request" => $request->all(),
        ];

        $rules = [
            'email' => 'required|email',
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'suffix' => 'nullable',
            'school_id' => 'required',
            'year_level_id' => 'required',
            'department_id' => 'required',
            'course_id' => 'required',
            'phone' => 'required',
            'birthdate' => 'required',
            'gender' => 'required',
            'region_id' => 'required',
            'province_id' => 'required',
            'municipality_id' => 'required',
            'barangay_id' => 'required',
            'street_address' => 'required',
            'p_first_name' => 'required',
            'p_middle_name' => 'required',
            'p_last_name' => 'required',
            'relationship' => 'required',
            'p_phone' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $findProfile = Profile::find($request->id);

        if ($findProfile) {
            $findProfile->user->email = $request->email;
            $findProfile->user->save();

            $findProfile->first_name = $request->first_name;
            $findProfile->middle_name = $request->middle_name;
            $findProfile->last_name = $request->last_name;
            $findProfile->suffix = $request->suffix;
            $findProfile->school_id = $request->school_id;
            $findProfile->year_level_id = $request->year_level_id;
            $findProfile->department_id = $request->department_id;
            $findProfile->course_id = $request->course_id;
            $findProfile->phone = $request->phone;
            $findProfile->birthdate = $request->birthdate;
            $findProfile->gender = $request->gender;
            $findProfile->save();

            if ($findProfile->profile_address) {
                $findProfile->profile_address->region_id = $request->region_id;
                $findProfile->profile_address->province_id = $request->province_id;
                $findProfile->profile_address->municipality_id = $request->municipality_id;
                $findProfile->profile_address->barangay_id = $request->barangay_id;
                $findProfile->profile_address->street_address = $request->street_address;
                $findProfile->profile_address->save();
            }

            $parentId = null;

            if ($findProfile->profile_parent) {
                $findProfile->profile_parent->first_name = $request->p_first_name;
                $findProfile->profile_parent->middle_name = $request->p_middle_name;
                $findProfile->profile_parent->last_name = $request->last_name;
                $findProfile->profile_parent->relationship = $request->relationship;
                $findProfile->profile_parent->phone = $request->p_phone;
                $findProfile->profile_parent->save();
                $parentId = $findProfile->profile_parent->id;
            } else {
                $createdParent = $findProfile->profile_parent()->create([
                    'first_name' => $request->p_first_name,
                    'middle_name' => $request->p_middle_name,
                    'last_name' => $request->p_last_name,
                    'relationship' => $request->relationship,
                    'phone' => $request->p_phone,
                ]);
                $parentId = $createdParent->id;
            }

            if ($parentId) {
                $findProfile->parent_id = $parentId;
                $findProfile->save();
            }

            if ($request->company_name) {
                $findCompany = Company::where('company_name', $request->company_name)
                ->where('office', $request->office)
                ->first();

                $findProfile->company_id = $findCompany->id;
                $findProfile->save();
            }

            $ret = [
                "success" => true,
                "message" => "Profile successfully updated",
            ];
        }

        return response()->json($ret, 200);
    }

    public function update_profile_company(Request $request)
    {
        // Retrieve the company that matches both the `company_name` and `office`
        $company = Company::where('company_name', $request->company_name)
            ->where('office', $request->office)
            ->first();

        // If no matching company is found, return an error response
        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company with the specified name and office not found.'
            ], 404);
        }

        // Retrieve the student profile and update the company_id field
        $studentProfile = Profile::find($request->student_profile_id);

        // If no student profile is found, return an error response
        if (!$studentProfile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found.'
            ], 404);
        }

        // Update the student profile's company_id with the retrieved company's id
        $studentProfile->company_id = $company->id;
        $studentProfile->save();

        // Return a success response
        return response()->json([
            'success' => true,
            'message' => 'Profile updated with company successfully.',
            'company_id' => $company->id
        ], 200);
    }
}