package Daser.team.com.app;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.AsyncTask;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

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

public class Emailconfirmation extends AppCompatActivity {
TextView otp;
    EditText uotp;
    String uid_dy;
    TextView tx;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_emailconfirmation);
        tx = (TextView) findViewById(R.id.text1);

        Typeface custom_font = Typeface.createFromAsset(getAssets(), "fonts/alegreya-sans-sc.bold.ttf");

        tx.setTypeface(custom_font);
        ActionBar ab = getSupportActionBar();
        ab.setLogo(R.mipmap.final_logo);
        ab.setDisplayUseLogoEnabled(true);
        ab.setDisplayShowHomeEnabled(true);
        ab.setTitle(" Email Confirmation");

        //otp=(TextView)findViewById(R.id.text1);

        uotp=(EditText)findViewById(R.id.otp);

        Globalvariables_set gbl=((Globalvariables_set)getApplicationContext());
        uid_dy=gbl.getSignup_userid();
        ///otp.setText(ui);
    }

    public void emailotp(View view)
    {
        String otp_s=uotp.getText().toString();
        String userid_s=uid_dy.toString();

        new Emailconfirmation.BackgroundWorkers().execute(userid_s,otp_s);

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

           //String confirmemail_url="http://10.0.2.2:2426/Androidservices/emailconfirm";
         //  String confirmemail_url="http://noticeperiod.com/Androidservices/emailconfirm";
            String confirmemail_url="http://10.0.2.2:4001/customer/emailconfirmation";


            //  if(type.equals("login"))
           // {
                try {

                    String id = params[0].toString();
                    String numcode = params[1].toString();

                    URL url=new URL(confirmemail_url);
                    HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                    httpsURLConnection.setRequestMethod("POST");
                    httpsURLConnection.setDoOutput(true);
                    httpsURLConnection.setDoInput(true);
                    OutputStream outputStream=httpsURLConnection.getOutputStream();
                    BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                    String post_data= URLEncoder.encode("uid","UTF-8")+"="+URLEncoder.encode(id,"UTF-8")+"&"+URLEncoder.encode("otpcode","UTF-8")+"="+URLEncoder.encode(numcode,"UTF-8");
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




                } catch (MalformedURLException e) {

                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
          //  }
            return null;
        }

        @Override
        protected void onPreExecute() {
  /*      alertDialog=new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Login Status");
*/


            progressDialog = ProgressDialog.show(Emailconfirmation.this,"Loading...",
                    "Confirming email, please wait...", false, false);


        }

        @Override
        protected void onPostExecute(String result) {
            progressDialog.dismiss();

            JSONObject jsonObject= null;
            try {
                jsonObject = new JSONObject(result);

                String ii=jsonObject.getString("code");

                //Integer ii=jsonObject.getInt("code");

tx.setText(ii);

                if(ii.equals("1"))
                {

                    Toast.makeText(getApplicationContext(),"Email Confirmed Successfully...",Toast.LENGTH_LONG).show();
                    Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                    startActivity(intent);

                }
                else if(ii.equals("0"))
                {
                    Toast.makeText(getApplicationContext(),"Invalid OTP. Please try again...",Toast.LENGTH_LONG).show();

                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        @Override
        protected void onProgressUpdate(Integer... values) {


            progressDialog.setProgress(values[0]);

        }

    }

}
