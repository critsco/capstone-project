<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDateColumnsInOjtDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ojt_details', function (Blueprint $table) {
            $table->string('moa_start_date')->after('moa_note')->nullable();
            $table->string('moa_update_date')->after('moa_start_date')->nullable();
            $table->string('ltp_start_date')->after('ltp_note')->nullable();
            $table->string('ltp_update_date')->after('ltp_start_date')->nullable();
            $table->string('wfp_start_date')->after('wfp_note')->nullable();
            $table->string('wfp_update_date')->after('wfp_start_date')->nullable();
            $table->string('wfs_start_date')->after('wfs_note')->nullable();
            $table->string('wfs_update_date')->after('wfs_start_date')->nullable();
            $table->string('endorsement_start_date')->after('endorsement_note')->nullable();
            $table->string('endorsement_update_date')->after('endorsement_start_date')->nullable();
            $table->string('dtr_start_date')->after('dtr_note')->nullable();
            $table->string('dtr_update_date')->after('dtr_start_date')->nullable();
            $table->string('eval_form_start_date')->after('eval_form_note')->nullable();
            $table->string('eval_form_update_date')->after('eval_form_start_date')->nullable();
            $table->string('term_rep_start_date')->after('term_rep_note')->nullable();
            $table->string('term_rep_update_date')->after('term_rep_start_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ojt_details', function (Blueprint $table) {
            $table->dropColumn([
                'moa_start_date',
                'moa_update_date',
                'ltp_start_date',
                'ltp_update_date',
                'wfp_start_date',
                'wfp_update_date',
                'wfs_start_date',
                'wfs_update_date',
                'endorsement_start_date',
                'endorsement_update_date',
                'dtr_start_date',
                'dtr_update_date',
                'eval_form_start_date',
                'eval_form_update_date',
                'term_rep_start_date',
                'term_rep_update_date',
            ]);
        });
    }
}