<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InviteNotification extends Notification
{
    use Queueable;

    public $data;

    /**
     * Create a new notification instance.
     *
     * @param string $class_code
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /** 
     * Store the  notification in the database.
     * 
     * @param mixed $notifiable
     * @return array
     */

    public function toArray($notifiable)
    {
        return [
            'class_code' => $this->data->class_code, // Ensure this is a string
            'message' => "You have been invited to join the class: " . $this->data->class_code,
        ];
    }
}
