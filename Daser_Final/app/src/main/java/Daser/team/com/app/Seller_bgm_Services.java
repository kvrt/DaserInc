package Daser.team.com.app;

import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.widget.Toast;

public class Seller_bgm_Services extends Service implements Runnable {


    public static final String TAG="Seller_bgm_Services";

    private Handler handler=new Handler();

    int i=0;

    public Seller_bgm_Services() {
        super();
    }


    @Override
    public void onCreate() {
        super.onCreate();
        Toast.makeText(this,"servicce started ",Toast.LENGTH_LONG).show();
        handler.postDelayed(this,1000);
       // Log.d("Seller_bgm_Services","Service is started");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        Toast.makeText(this,"servicce stopped ",Toast.LENGTH_LONG).show();
       // Log.d("Seller_bgm_Services","Service is stopped");
        handler.removeCallbacks(this);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void run() {
        i=i+1;

        Toast.makeText(this, "I value is run every : "+i+" second", Toast.LENGTH_SHORT).show();
    }
}
