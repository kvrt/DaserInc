package Daser.team.com.app;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import java.util.HashMap;

/**
 * Created by MANOHAR on 12/7/2017.
 */

public class SessionManagement {

    SharedPreferences pref;
    SharedPreferences.Editor editor;
    Context _context;

    int PRIVATE_MODE=0;

    private static final String PREF_NAME="DaserTeam";
    private static final String IS_LOGIN = "IsLoggedIn";
    public static final String KEY_id = "id";
    public static final String KEY_type = "type";
    public static final String KEY_email = "email";
    public static final String KEY_name = "name";
    public static final String KEY_lname = "lname";

    public static final String KEY_phone = "phone";
    public static final String KEY_dob = "dob";
    public static final String KEY_addr1 = "addr1";
    public static final String KEY_addr2 = "addr2";
    public static final String KEY_state = "state";
    public static final String KEY_city = "city";
    public static final String KEY_country = "country";
    public static final String KEY_zip = "zip";
    public static final String KEY_org = "org";
    public static final String KEY_stripeid = "stripeid";
    public static final String KEY_addrid = "addrid";


    public static final String KEY_token = "token";
    public SessionManagement(Context context)
    {
        this._context=context;
        pref=_context.getSharedPreferences(PREF_NAME,PRIVATE_MODE);
        editor=pref.edit();
    }



    public void LoginSession(String id,String type,String email,String name,String name1,String phone,String dob,String addr1,String addr2,String city,String state,String country,String zip,String orgname,String token,String stripe,String address)
    {
        editor.putBoolean(IS_LOGIN,true);
        editor.putString(KEY_id,id);
        editor.putString(KEY_type,type);
        editor.putString(KEY_email,email);
        editor.putString(KEY_name,name);
        editor.putString(KEY_lname,name1);

        editor.putString(KEY_phone,phone);
        editor.putString(KEY_dob,dob);
        editor.putString(KEY_addr1,addr1);
        editor.putString(KEY_addr2,addr2);
        editor.putString(KEY_city,city);
        editor.putString(KEY_state,state);
        editor.putString(KEY_country,country);
        editor.putString(KEY_zip,zip);
        editor.putString(KEY_org,orgname);
        editor.putString(KEY_token,token);
        editor.putString(KEY_stripeid,stripe);
        editor.putString(KEY_addrid,address);


        editor.commit();

    }


    public void checkLogin()
    {
        if(this.isLoggedIn())
        {
            Intent intent=new Intent(_context,Logon.class);
            // intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            // Clear all activities
            //   intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            // Add new flag to start new activity

            _context.startActivity(intent);
        }
    /*else
    {
        Intent intent=new Intent(_context,Logon.class);
   //     intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        // Clear all activities
 //       intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // Add new flag to start new activity

        _context.startActivity(intent);

    }
    */

    }

    public boolean isLoggedIn()
    {
        return pref.getBoolean(IS_LOGIN,false);
    }


// Get session data


    public HashMap<String,String> getdata()
    {
        HashMap<String, String> user=new HashMap<String, String>();

        user.put(KEY_id,pref.getString(KEY_id,null));
        user.put(KEY_type,pref.getString(KEY_type,null));
        user.put(KEY_email,pref.getString(KEY_email,null));
        user.put(KEY_name,pref.getString(KEY_name,null));
        user.put(KEY_lname,pref.getString(KEY_lname,null));

        user.put(KEY_phone,pref.getString(KEY_phone,null));
        user.put(KEY_dob,pref.getString(KEY_dob,null));
        user.put(KEY_addr1,pref.getString(KEY_addr1,null));
        user.put(KEY_addr2,pref.getString(KEY_addr2,null));
        user.put(KEY_state,pref.getString(KEY_state,null));
        user.put(KEY_city,pref.getString(KEY_city,null));
        user.put(KEY_country,pref.getString(KEY_country,null));
        user.put(KEY_zip,pref.getString(KEY_zip,null));
        user.put(KEY_org,pref.getString(KEY_org,null));
        user.put(KEY_stripeid,pref.getString(KEY_stripeid,null));
        user.put(KEY_addrid,pref.getString(KEY_addrid,null));


        user.put(KEY_token,pref.getString(KEY_token,null));



        return user;
    }


    // Logout , clear all session data

    public void logout()
    {
        editor.clear();
        editor.commit();

        // Clearing all data from shared preferences

        Intent intent=new Intent(_context, MainActivity.class);
//        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        _context.startActivity(intent);


    }


}
