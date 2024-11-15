<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Profile;
use App\Models\ProfileAddress;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $address = "TRIM(CONCAT_WS(', ', UPPER(profile_addresses.street_address), ref_barangays.barangay, ref_municipalities.municipality, ref_provinces.province, ref_regions.region))";

        $data = Company::select([
            'companies.*',
            DB::raw("$address address"),
        ])
            ->leftJoin('profile_addresses', 'companies.address_id', '=', 'profile_addresses.id')
            ->leftJoin('ref_barangays', 'profile_addresses.barangay_id', '=', 'ref_barangays.id')
            ->leftJoin('ref_municipalities', 'profile_addresses.municipality_id', '=', 'ref_municipalities.id')
            ->leftJoin('ref_provinces', 'profile_addresses.province_id', '=', 'ref_provinces.id')
            ->leftJoin('ref_regions', 'profile_addresses.region_id', '=', 'ref_regions.id');

        $data->where(function ($query) use ($request) {
            if ($request->search) {
                $query->orWhere('company_name', 'LIKE', "%$request->search%");
                $query->orWhere('office', 'LIKE', "%$request->search%");
                $query->orWhere('office_head', 'LIKE', "%$request->search%");
            }
        });

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data = $data->orderBy('id', 'desc');
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
            "message" => "Data not " . ($request->id ? "updated" : "saved"),
        ];

        $addressData = [
            'region_id' => $request->region_id,
            'province_id' => $request->province_id,
            'municipality_id' => $request->municipality_id,
            'barangay_id' => $request->barangay_id,
            'street_address' => strtoupper($request->street_address),
        ];

        // Find existing address or create a new one
        $address = ProfileAddress::firstOrCreate($addressData);

        // Prepare the company data, including the address_id
        $companyData = [
            "company_name" => ucwords(strtolower($request->company_name)),
            "office" => ucwords(strtolower($request->office)),
            "office_head" => ucwords(strtolower($request->office_head)),
            "email" => $request->email,
            "address_id" => $address->id,
        ];

        // Set created_by or updated_by based on request
        $companyData += $request->id
            ? ["updated_by" => auth()->user()->id]
            : ["created_by" => auth()->user()->id];

        // // Check if the record exists, including soft-deleted records
        // $existingCompany = Company::withTrashed()->find($request->id);

        // // Restore the company if it was soft-deleted
        // if ($existingCompany) {
        //     $existingCompany->restore();
        // }

        // Create or update the company record
        $company = Company::updateOrCreate(
            ["id" => $request->id ?? null],
            $companyData
        );

        // Return success if the company record was created or updated
        if ($company) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "created") . " successfully"
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fullname = "TRIM(CONCAT_WS(' ', profiles.first_name, IF(profiles.middle_name='', NULL, profiles.middle_name), profiles.last_name, IF(profiles.suffix='', NULL, profiles.suffix)))";
        // $year_level = "SELECT year_level FROM ref_year_levels"

        // Fetch profiles where the company_id matches the given ID
        $profiles = Profile::select([
            '*',  // Select all profile fields
            DB::raw("$fullname as fullname") // Add the concatenated fullname field
        ])
            ->where('company_id', $id)
            ->with([
                'ref_year_level',  // Example of additional relationships
                'ref_department',
            ])
            ->get();

        // Return the result in a JSON response
        return response()->json([
            'success' => true,
            'data' => $profiles,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        //
    }
}
