package Daser.team.com.app;

import android.util.Log;
import android.widget.Toast;

import com.google.firebase.iid.FirebaseInstanceId;

/**
 * Created by MANOHAR on 1/30/2018.
 */
public class FirebaseInstanceIdService extends com.google.firebase.iid.FirebaseInstanceIdService {

    private static final String TAG = "MyFirebaseIIDService";

    @Override
    public void onTokenRefresh() {

        //Getting registration token
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();

        //Displaying token in logcat
        Log.e(TAG, "Refreshed token: " + refreshedToken);
        //Toast.makeText(this,"Firebase token is : "+refreshedToken,Toast.LENGTH_LONG).show(); dNH8jE8ZF7c:APA91bFk-V3MEoKkDNC79_NG6nL0DPfmzeGoSjEj1IdDmFdFHrwrCc7zIJKIaCxZZZZXbiySw8CDf_uBmOt-c9rVAtTESUp2Xa5NMsjxr7etRaQOf6Bchds-6ZK23KKuH67DtcEu71mD

    }

    private void sendRegistrationToServer(String token) {
        //You can implement this method to store the token on your server
        //Not required for current project
    }
}