<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOjtDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ojt_details', function (Blueprint $table) {
            $table->id();

            $table->integer('profile_id')->nullable();
            $table->integer('company_id')->nullable();
            $table->string('status')->nullable();
            $table->string('date_started')->nullable();
            $table->string('moa_status')->nullable();
            $table->string('moa_note')->nullable();
            $table->string('ltp_status')->nullable();
            $table->string('ltp_note')->nullable();
            $table->string('wfp_status')->nullable();
            $table->string('wfp_note')->nullable();
            $table->string('wfs_status')->nullable();
            $table->string('wfs_note')->nullable();
            $table->string('endorsement_status')->nullable();
            $table->string('endorsement_note')->nullable();
            $table->string('dtr_status')->nullable();
            $table->string('dtr_note')->nullable();
            $table->string('eval_form_status')->nullable();
            $table->string('eval_form_note')->nullable();
            $table->string('term_rep_status')->nullable();
            $table->string('term_rep_note')->nullable();

            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ojt_details');
    }
}