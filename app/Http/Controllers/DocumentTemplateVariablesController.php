<?php

namespace App\Http\Controllers;

use App\Models\DocumentTemplateVariables;
use Illuminate\Http\Request;

class DocumentTemplateVariablesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        $ret = [
            "success" => false,
            "message" => "Document variable was not created"
        ];

        $data = $request->validate([
            "reference" => "required",
            "variable_name" => "required",
            "field_name" => "required",
        ]);

        // if ($request->reference = "") {
            
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DocumentTemplateVariables  $documentTemplateVariables
     * @return \Illuminate\Http\Response
     */
    public function show(DocumentTemplateVariables $documentTemplateVariables)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DocumentTemplateVariables  $documentTemplateVariables
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocumentTemplateVariables $documentTemplateVariables)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DocumentTemplateVariables  $documentTemplateVariables
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocumentTemplateVariables $documentTemplateVariables)
    {
        //
    }

    public function show_all_fields()
    {
        $tables = [
            'users',
            'profiles',
            'profile_addresses',
            'profile_parents',
            'companies',
        ];

        $excludedColumns = ['created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at', 'deactivated_by', 'deactivated_at', 'email_verified_at', 'password', 'user_role_id', 'status', 'remember_token'];

        $fields = [];

        foreach ($tables as $table) {
            // Get all columns for the table
            $columns = \Schema::getColumnListing($table);
    
            // Filter out the excluded columns
            $filteredColumns = array_filter($columns, function ($column) use ($excludedColumns) {
                return !in_array($column, $excludedColumns);
            });
    
            // Map the table name and filtered columns
            $fields[$table] = array_values($filteredColumns); // Reindex array for clean output
        }

        return response()->json([
            "success" => true,
            "fields" => $fields,
        ]);
    }
}