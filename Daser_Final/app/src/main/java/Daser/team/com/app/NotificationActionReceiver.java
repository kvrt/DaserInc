package Daser.team.com.app;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

/**
 * Created by MANOHAR on 1/26/2018.
 */

public class NotificationActionReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {


        if (intent.getAction().equalsIgnoreCase("CONFIRM")) {
Bundle bui = intent.getExtras();
            String as=bui.getString("sid");
            String ass=bui.getString("bid");

            Toast.makeText(context, "Booking your ride"+as+" and "+ass, Toast.LENGTH_SHORT).show();


        } else if (intent.getAction().equalsIgnoreCase("CANCEL")) {

            NotificationManager notificationManager =
                    (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.cancel(1);

        }

    }
}
