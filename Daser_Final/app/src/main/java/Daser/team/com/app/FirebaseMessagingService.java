package Daser.team.com.app;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.RemoteMessage;

import java.util.Random;

public class FirebaseMessagingService extends com.google.firebase.messaging.FirebaseMessagingService {

    private static final String TAG = "Android News App";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
String bid="",sid="";
        //It is optional
        Log.e(TAG, "From: " + remoteMessage.getFrom());
        Log.e(TAG, "Notification Message Body: " + remoteMessage.getNotification().getBody());
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());
            bid = remoteMessage.getData().get("buyerid");
            sid = remoteMessage.getData().get("sellerid");

        }
        //Calling method to generate notification
        sendNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody(),bid,sid);
    }

    //This method is only generating push notification
    private void sendNotification(String title, String messageBody, String buyerid, String sellerid) {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent,
                PendingIntent.FLAG_ONE_SHOT);

        String asdf=messageBody;
String tit=title;
        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.mipmap.final_logo)
                .setContentTitle(tit)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(asdf))
                .setContentText(asdf)
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        Random r = new Random();
        int i1 = r.nextInt(1000 - 1) + 1;

        notificationManager.notify(i1, notificationBuilder.build());
    }
}