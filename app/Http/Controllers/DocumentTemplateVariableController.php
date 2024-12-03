<?php

namespace App\Http\Controllers;

use App\Models\DocumentTemplateVariable;
use Illuminate\Http\Request;

class DocumentTemplateVariableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = DocumentTemplateVariable::where(function ($query) use ($request) {
            if ($request->search) {
                $query->orWhere('variable_name', 'LIKE', "%$request->search%");
            }
        });

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {
                $data = $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'variable_name', isset($request->sort_order)  ? $request->sort_order : 'asc');
            }
        } else {
            $data = $data->orderBy('variable_name', 'asc');
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
            "message" => "Document variable was not created"
        ];

        $data = $request->validate([
            "variable_name" => "required",
            "field_name" => "required",
        ]);

        // Wrap variable_name in curly braces
        $data['variable_name'] = "{" . $data['variable_name'] . "}";

        $document_variable = DocumentTemplateVariable::updateOrCreate(
            ["id" => $request->id],
            $data,
        );

        if ($document_variable) {
            $ret = [
                "success" => true,
                "message" => "Document variable " . ($request->id ? "updated" : "created") . " successfully.",
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DocumentTemplateVariable  $documentTemplateVariable
     * @return \Illuminate\Http\Response
     */
    public function show(DocumentTemplateVariable $documentTemplateVariable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DocumentTemplateVariable  $documentTemplateVariable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocumentTemplateVariable $documentTemplateVariable)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DocumentTemplateVariable  $documentTemplateVariable
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocumentTemplateVariable $documentTemplateVariable)
    {
        //
    }



    public function show_student_fields()
    {
        $tables = [
            'users',
            'profiles',
            'profile_addresses',
        ];

        $excludedColumns = ['id', 'user_id', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at', 'deactivated_by', 'deactivated_at', 'email_verified_at', 'password', 'user_role_id', 'status', 'remember_token'];

        $fields = [];

        foreach ($tables as $table) {
            // Get all columns for the table
            $columns = \Illuminate\Support\Facades\Schema::getColumnListing($table);

            // Filter out the excluded columns
            $filteredColumns = array_filter($columns, function ($column) use ($excludedColumns) {
                return !in_array($column, $excludedColumns);
            });

            // Append filtered columns to the allFields array
            $fields = array_merge($fields, array_values($filteredColumns));
        }

        return response()->json([
            "success" => true,
            "fields" => $fields,
        ]);
    }

    public function show_faculty_fields()
    {
        $tables = [
            'users',
            'profiles',
        ];

        $excludedColumns = ['id', 'user_id', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at', 'deactivated_by', 'deactivated_at', 'email_verified_at', 'password', 'user_role_id', 'status', 'remember_token'];

        $fields = [];

        foreach ($tables as $table) {
            // Get all columns for the table
            $columns = \Illuminate\Support\Facades\Schema::getColumnListing($table);

            // Filter out the excluded columns
            $filteredColumns = array_filter($columns, function ($column) use ($excludedColumns) {
                return !in_array($column, $excludedColumns);
            });

            // Append filtered columns to the allFields array
            $fields = array_merge($fields, array_values($filteredColumns));
        }

        return response()->json([
            "success" => true,
            "fields" => $fields,
        ]);
    }

    public function show_company_fields()
    {
        $tables = [
            'companies',
            'profile_addresses',
        ];

        $excludedColumns = ['id', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at'];

        $fields = [];

        foreach ($tables as $table) {
            // Get all columns for the table
            $columns = \Illuminate\Support\Facades\Schema::getColumnListing($table);

            // Filter out the excluded columns
            $filteredColumns = array_filter($columns, function ($column) use ($excludedColumns) {
                return !in_array($column, $excludedColumns);
            });

            // Append filtered columns to the allFields array
            $fields = array_merge($fields, array_values($filteredColumns));
        }

        return response()->json([
            "success" => true,
            "fields" => $fields,
        ]);
    }

    public function show_parent_fields()
    {
        $tables = [
            'profile_parents',
        ];

        $excludedColumns = ['id', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at'];

        $fields = [];

        foreach ($tables as $table) {
            // Get all columns for the table
            $columns = \Illuminate\Support\Facades\Schema::getColumnListing($table);

            // Filter out the excluded columns
            $filteredColumns = array_filter($columns, function ($column) use ($excludedColumns) {
                return !in_array($column, $excludedColumns);
            });

            // Append filtered columns to the allFields array
            $fields = array_merge($fields, array_values($filteredColumns));
        }

        return response()->json([
            "success" => true,
            "fields" => $fields,
        ]);
    }
}
