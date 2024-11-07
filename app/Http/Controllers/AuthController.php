<?php

namespace App\Http\Controllers;

use App\Models\ProfileAddress;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Failed to create an account"
        ];

        // Basic validation rules for all users
        $rules = [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'user_role_id' => 'required|exists:user_roles,id',
            'first_name' => 'required|string|max:100',
            'middle_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'suffix' => 'string|max:20',
            'school_id' => 'required|string|max:20|unique:profiles,school_id',
            'department_id' => 'required|exists:ref_departments,id',
            'phone' => 'required|string|max:50',
            'gender' => 'required|string|max:10',
        ];

        // Check if the user role requires additional fields
        if ($request->user_role_id == 2) { // Assuming '2' is the ID for the student role
            $rules = array_merge($rules, [
                'year_level_id' => 'required|exists:ref_year_level,id',
                'birthdate' => 'required|integer|min:1920|max:' . date('YYYY-MM-DD'),
                'address_id' => 'required|exists:ref_addresses, id',
            ]);
        }

        // Validate the request data based on dynamic rules
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role_id' => $request->user_role_id,
            'created_by' => auth()->id(),
        ]);

        $addressData = [
            'region_id' => $request->region_id,
            'province_id' => $request->province_id,
            'municipality_id' => $request->municipality_id,
            'barangay_id' => $request->barangay_id,
            'street_address' => $request->street_address,
        ];

        $address = ProfileAddress::create($addressData);

        // Create the profile associated with the user
        $profileData = [
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'suffix' => $request->suffix,
            'school_id' => $request->school_id,
            'department_id' => $request->department_id,
            'phone' => $request->phone_no,
            'gender' => $request->gender,
        ];

        if ($user->user_role_id == 2) { // If the user is a student, add student-specific profile data
            $profileData['year_level_id'] = $request->year_level_id;
            $profileData['birthdate'] = $request->birthdate;
            $profileData['address_id'] = $address->id;
        }

        $profile = Profile::create($profileData);

        // Optionally, generate an API token for immediate authentication after registration
        $token = $user->createToken('API Token')->accessToken;

        $ret = [
            "success" => true,
            "message" => "Account created successfully"
        ];
        
        return response()->json($ret, 201);
    }

    public function check_auth_status()
    {
        $ret = [
            "success" => false,
            "message" => "Authentication status ok",
        ];


        return response()->json($ret, 200);
    }
}