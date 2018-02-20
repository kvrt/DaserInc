package Daser.team.com.app;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;

/**
 * Created by MANOHAR on 1/27/2018.
 */
@SuppressLint("ParcelCreator")
public class MessageReceiver extends ResultReceiver {

    private MainActivity message;


    public MessageReceiver(MainActivity message)
    {
        super(new Handler());
        this.message=message;
    }

    @Override
    protected void onReceiveResult(int resultCode, Bundle resultData) {
//        message.displayMessage(resultCode, resultData);

    }


}
