package Daser.team.com.app;


import android.app.AlertDialog;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.NotificationCompat;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.iid.FirebaseInstanceId;
import com.stripe.android.Stripe;
import com.stripe.android.TokenCallback;
import com.stripe.android.model.BankAccount;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    EditText username,password;
    Spinner stype;
    TextView tx;
    Button btn;
    private ProgressDialog progressDialog;
    SessionManagement sessionManagement;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        System.out.println("Activity Started1");
        setContentView(R.layout.activity_main);
        username=(EditText)findViewById(R.id.username);
        password=(EditText)findViewById(R.id.password);
        // stype=(EditText)findViewById(R.id.signert);

        stype = (Spinner) findViewById(R.id.signert);
        ArrayAdapter<String> adapter;
        List<String> list;

        list = new ArrayList<String>();
        list.add("Buyer");
        list.add("Seller");

        adapter = new ArrayAdapter<String>(getApplicationContext(),
                android.R.layout.simple_spinner_item, list);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        stype.setAdapter(adapter);
        // //dNH8jE8ZF7c:APA91bFk-V3MEoKkDNC79_NG6nL0DPfmzeGoSjEj1IdDmFdFHrwrCc7zIJKIaCxZZZZXbiySw8CDf_uBmOt-c9rVAtTESUp2Xa5NMsjxr7etRaQOf6Bchds-6ZK23KKuH67DtcEu71mD
        // //dNH8jE8ZF7c:APA91bFk-V3MEoKkDNC79_NG6nL0DPfmzeGoSjEj1IdDmFdFHrwrCc7zIJKIaCxZZZZXbiySw8CDf_uBmOt-c9rVAtTESUp2Xa5NMsjxr7etRaQOf6Bchds-6ZK23KKuH67DtcEu71mD
        // Session Manager

        //  FirebaseInstanceIdService tok=new FirebaseInstanceIdService();

        //tok.onTokenRefresh();
        //username.setText(tok.onTokenRefresh());
        //Toast.makeText(this, ,Toast.LENGTH_LONG).show();

        sessionManagement=new SessionManagement(getApplicationContext());

        sessionManagement.checkLogin();

        tx = (TextView)findViewById(R.id.text1);

        Typeface custom_font = Typeface.createFromAsset(getAssets(),  "fonts/alegreya-sans-sc.bold.ttf");

        tx.setTypeface(custom_font);
        ActionBar ab=getSupportActionBar();
        ab.setLogo(R.mipmap.final_logo);
        ab.setDisplayUseLogoEnabled(true);
        ab.setDisplayShowHomeEnabled(true);
        ab.setTitle(" Daser - Welcome");

    }
    public void notifications(View view)
    {
/*
        Stripe stripe = new Stripe(this);

        stripe.setDefaultPublishableKey("pk_test_eu5vgSNxVXBVTWNqHxQNKVls");
        BankAccount bankAccount = new BankAccount("individual","usd","Emma Moore","US","110000000","000123456789","hg","");
        stripe.createBankAccountToken(bankAccount, new TokenCallback() {
            @Override
            public void onError(Exception error) {
                Log.e("Stripe Error", error.getMessage());

                Toast.makeText(getApplicationContext(),"Unable to create bank token, error is : "+error.getMessage(),Toast.LENGTH_LONG).show();
            }

            @Override
            public void onSuccess(com.stripe.android.model.Token token) {
                Log.e("Bank Token", token.getId());
tx.setText(token.getId().toString());
               // acno.setText(token.getId().toString());
               // new seller_bank_add.BackgroundWorkers().execute(uid_dy.toString(),token.getId().toString());

            }
        });

        /*
        int notificationId = 1;
        String title="Notififcation Title";
        String ntxt="Notififcation body, for testing purpose i only put dummy data. Notififcation body, for testing purpose i only put dummy data. Notififcation body, for testing purpose i only put dummy data. ";
        Intent intentconfirm=new Intent(this,NotificationActionReceiver.class);
        intentconfirm.setAction("Confirm");
        intentconfirm.putExtra("sid","2463");
        intentconfirm.putExtra("bid","B1234");

        intentconfirm.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        Intent intentcancel=new Intent(this,NotificationActionReceiver.class);
        intentcancel.setAction("Cancel");
        intentcancel.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntentconfirm=PendingIntent.getBroadcast(this, 0, intentconfirm,PendingIntent.FLAG_CANCEL_CURRENT);

        PendingIntent pendingIntentcancel=PendingIntent.getBroadcast(this,0, intentcancel,PendingIntent.FLAG_CANCEL_CURRENT);


        Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
       // builder.setSound(alarmSound);
        NotificationCompat.Builder builder= (NotificationCompat.Builder) new NotificationCompat.Builder(MainActivity.this)
                .setSmallIcon(android.R.drawable.ic_btn_speak_now)
                .setContentTitle(title)
                .setContentText(ntxt)
                .setSound(alarmSound)
                .setAutoCancel(true);

        builder.addAction(android.R.drawable.sym_action_chat,"Confirm",pendingIntentconfirm);
        builder.addAction(android.R.drawable.sym_action_call,"Cancel",pendingIntentcancel);


        NotificationManager notificationManager=(NotificationManager)getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify(notificationId,builder.build());
*/

    }


    public void forgotpassword(View view)
    {

//        MessageReceiver receiver=new MessageReceiver(new Message());

        //Intent intent=new Intent(this,Seller_bgm_Services.class);
        //startService(intent);

        // String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        //  Toast.makeText(this,"token : "+refreshedToken,Toast.LENGTH_LONG).show();

        Intent intent=new Intent(getApplicationContext(),forgot_password.class);
        startActivity(intent);

    }
    /*public class Message
    {
        public void displayMessage(int resultCode, Bundle resultData)
        {
                String message=resultData.getString("message");
                Toast.makeText(MainActivity.this, resultCode+" "+message,Toast.LENGTH_LONG).show();
        }
    }*/
    public void seeker_signup(View view)
    {

/*
        Intent intent=new Intent(this,Seller_bgm_Services.class);
        stopService(intent);
        */


        Intent intent=new Intent(getApplicationContext(),Service_seeker_signup.class);
        startActivity(intent);

    }

    public void provider_signup(View view)
    {

        Intent intent=new Intent(getApplicationContext(),Service_provider_signup.class);
        startActivity(intent);
    }

    public void OnLogin(View v)
    {
        String uname=username.getText().toString();
        String pass=password.getText().toString();
        String ltype=stype.getSelectedItem().toString();

        String type="login";
        if(uname.isEmpty() || uname.length()< 6) {
            Toast.makeText(getApplicationContext(),"Username should not be empty and min 6 characters",Toast.LENGTH_LONG).show();
        }
        else
        {
            if(pass.isEmpty())
            {
                Toast.makeText(getApplicationContext(),"Password should not be empty",Toast.LENGTH_LONG).show();
            }
            else if(ltype.isEmpty())
            {
                Toast.makeText(getApplicationContext(),"Signer type should not be empty",Toast.LENGTH_LONG).show();
            }
            else
            {
                new BackgroundWorkers().execute(type,uname,pass,ltype);

            }
        }
//        new BackgroundWorkers().execute(type,uname,pass);

        //insertdata();
    }


    class BackgroundWorkers extends AsyncTask<String,Integer,String> {

        String JSON_STRING;
        Context context;
        AlertDialog alertDialog;
//        BackgroundWorker(Context ctx)
        // {
        //   context = ctx;
        //}
/*
        public BackgroundWorker(Context ctx) {
            context=ctx;
        }*/

        @Override
        protected String doInBackground(String... params) {
            String type=params[0];
            //String login_url="http://10.0.2.2:2426/Androidservices/insert";
            // String login_url="http://noticeperiod.com/Androidservices/insert";
            String login_url="http://10.0.2.2:4001/customer/signin";


            if(type.equals("login"))
            {
                try {
                    String username = params[1].toString();
                    String password = params[2].toString();

                    String logintype = params[3].toString();

                    URL url=new URL(login_url);
                    HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                    httpsURLConnection.setRequestMethod("POST");
                    httpsURLConnection.setDoOutput(true);
                    httpsURLConnection.setDoInput(true);
                    OutputStream outputStream=httpsURLConnection.getOutputStream();
                    BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                    String post_data= URLEncoder.encode("username","UTF-8")+"="+URLEncoder.encode(username,"UTF-8")+"&"+URLEncoder.encode("password","UTF-8")+"="+URLEncoder.encode(password,"UTF-8")+"&"+URLEncoder.encode("signertype","UTF-8")+"="+URLEncoder.encode(logintype,"UTF-8");
                    bufferedWriter.write(post_data);
                    bufferedWriter.flush();
                    bufferedWriter.close();
                    outputStream.close();

                    InputStream inputStream=httpsURLConnection.getInputStream();
                    BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(inputStream));

                    StringBuilder stringBuilder=new StringBuilder();
                    while((JSON_STRING=bufferedReader.readLine())!=null)
                    {
                        stringBuilder.append(JSON_STRING+"\n");
                    }
                    bufferedReader.close();
                    inputStream.close();
                    httpsURLConnection.disconnect();

                    synchronized (this)
                    {
                        //Initialize an integer (that will act as a counter) to zero
                        int counter = 0;
                        //While the counter is smaller than four
                        while(counter <= 4)
                        {
                            //Wait 850 milliseconds
                            this.wait(850);
                            //Increment the counter
                            counter++;
                            //Set the current progress.
                            //This value is going to be passed to the onProgressUpdate() method.
                            publishProgress(counter*25);
                        }
                    }

                    return stringBuilder.toString();





/*                InputStream inputStream=httpsURLConnection.getInputStream();
                BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(httpsURLConnection.getInputStream(),"iso-8859-1"));
                String result="";
                String line="";
                StringBuilder stringBuilder=new StringBuilder();
                while ((line=bufferedReader.readLine())!="")
                {
                    //result+=line;
                    stringBuilder.append(line+"\n");
                }
                    bufferedReader.close();
                inputStream.close();
                httpsURLConnection.disconnect();

                System.out.println(stringBuilder.toString()+" resultsss");
               return stringBuilder.toString();*/


                } catch (MalformedURLException e) {

                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }

        @Override
        protected void onPreExecute() {
  /*      alertDialog=new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Login Status");
*/


            progressDialog = ProgressDialog.show(MainActivity.this,"Loading...",
                    "Processing Login, please wait...", false, false);

  /*          //Create a new progress dialog
            progressDialog = new ProgressDialog(MainActivity.this);
            //Set the progress dialog to display a horizontal progress bar
            progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
            //Set the dialog title to 'Loading...'
            progressDialog.setTitle("Loading...");
            //Set the dialog message to 'Loading application View, please wait...'
            progressDialog.setMessage("Loading application View, please wait...");
            //This dialog can't be canceled by pressing the back key
            progressDialog.setCancelable(false);
            //This dialog isn't indeterminate
            progressDialog.setIndeterminate(false);
            //The maximum number of items is 100
            progressDialog.setMax(100);
            //Set the current progress to zero
            progressDialog.setProgress(0);
            //Display the progress dialog
            progressDialog.show();
*/

        }

        @Override
        protected void onPostExecute(String result) {
            progressDialog.dismiss();
            /*
            Intent intent=new Intent(getApplicationContext(),Logon.class);
            startActivity(intent);*/

            //   tx.setText(result);


            JSONObject jsonObject = null;

            EditText editText = (EditText) findViewById(R.id.username);

            //editText.setText(ii);


            EditText editText2 = (EditText) findViewById(R.id.password);

            if (result.equals("")) {
                Toast.makeText(getApplicationContext(),"Invalid credentials. Please try again...",Toast.LENGTH_LONG).show();
                editText.setText("");
                editText2.setText("");
            }
            else
            {

                //tx.setText(result);


                try {
                    jsonObject = new JSONObject(result);

                    String ii = jsonObject.getString("code");

                    //Integer ii=jsonObject.getInt("code");


                    if (ii.equals("1")) {
                        String unames = jsonObject.getString("first_name");
                        String unames1 =jsonObject.getString("last_name");
                        String ids = jsonObject.getString("id");
                        String phonenumbers = jsonObject.getString("phonenumber");
                        String signertype = jsonObject.getString("type");
                        String emailsa = jsonObject.getString("emailaddress");
                        String dob = jsonObject.getString("dob");
                        String address1 = jsonObject.getString("address1");
                        String address2 = jsonObject.getString("address2");
                        String city = jsonObject.getString("city");
                        String state = jsonObject.getString("state");
                        String country = jsonObject.getString("country");
                        String zip = jsonObject.getString("zip");
                        String organization = jsonObject.getString("orgn");
                        String stripeid = jsonObject.getString("stripeid");
                        String addrid = jsonObject.getString("addressid");


                        String token = jsonObject.getString("token");


                        sessionManagement.LoginSession(ids, signertype, emailsa, unames,unames1, phonenumbers,dob,address1,address2,city,state,country,zip,organization,token,stripeid,addrid);

                        Toast.makeText(getApplicationContext(), "Successfully Logged In...", Toast.LENGTH_LONG).show();
                        Intent intent = new Intent(getApplicationContext(), Logon.class);
                        startActivity(intent);

                    } else if (ii.equals("0")) {
                        Toast.makeText(getApplicationContext(), "Invalid credentials. Please try again...", Toast.LENGTH_LONG).show();
                        editText.setText("");
                        editText2.setText("");

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }


        }

        @Override
        protected void onProgressUpdate(Integer... values) {


            progressDialog.setProgress(values[0]);

        }

    }



}
