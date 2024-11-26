<?php

namespace App\Http\Controllers;

use App\Models\InternClass;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\InviteNotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json($request->user()->notifications);
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
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        //
    }

    public function send_invite(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Failed to send invite."
        ];

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $ret = [
                "success" => false,
                "message" => "Email does not exist.",
            ];

            return response()->json($ret, 404);
        }

        $classCode = (string)$request->class_code;

        // Send notification
        $user->notify(new InviteNotification($classCode));

        $ret = [
            "success" => true,
            "message" => "Invite sent successfully."
        ];

        return response()->json($ret, 200);
    }

    public function accept_invite(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Failed to accept invite."
        ];

        $internClass = InternClass::where('class_code', $request->class_code)->firstOrFail();

        $user = $request->user();
        $user->intern_class_id = $internClass->id;
        $user->save();

        $ret = [
            "success" => true,
            "message" => "Invite accepted successfully."
        ];

        return response()->json($ret, 200);
    }
}
