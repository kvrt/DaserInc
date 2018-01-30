package Daser.team.com.app;

import android.app.Application;

/**
 * Created by MANOHAR on 12/6/2017.
 */
public class Globalvariables_set extends Application {

    private String Signup_userid;

    public String getSignup_userid() {
        return Signup_userid;
    }

    public void setSignup_userid(String Signup_userid) {
        this.Signup_userid = Signup_userid;
    }
}