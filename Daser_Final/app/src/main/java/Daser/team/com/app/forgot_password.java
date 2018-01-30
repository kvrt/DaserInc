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

public class forgot_password extends AppCompatActivity {
    EditText email;
    private ProgressDialog progressDialog;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);


        TextView tx = (TextView)findViewById(R.id.text1);

        Typeface custom_font = Typeface.createFromAsset(getAssets(),  "fonts/alegreya-sans-sc.bold.ttf");

        tx.setTypeface(custom_font);
        ActionBar ab=getSupportActionBar();
        ab.setLogo(R.mipmap.final_logo);
        ab.setDisplayUseLogoEnabled(true);
        ab.setDisplayShowHomeEnabled(true);
        ab.setTitle(" Forgot Password");
email=(EditText)findViewById(R.id.forgot);
    }
    public void backtohome(View view)
    {
        Intent intent=new Intent(getApplicationContext(),MainActivity.class);
        startActivity(intent);
    }


    public void Forgot(View view)
    {

        String mail=email.getText().toString();
        String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
if(mail.isEmpty() || !mail.matches(emailPattern))
{
    Toast.makeText(getApplicationContext(),"Invalid e-Mail address. Please enter valid e-Mail address.!",Toast.LENGTH_LONG).show();
}
else
{
    new forgot_password.BackgroundWorkers().execute(mail);
}
    //    new forgot_password.BackgroundWorkers().execute(mail);

    }

    class BackgroundWorkers extends AsyncTask<String,Integer,String>
    {
        String JSON_STRING;
        Context context;
        AlertDialog alertDialog;
        @Override
        protected String doInBackground(String... params) {
           //String confirmemail_url="http://10.0.2.2:2426/Androidservices/forgotpassword";
            //String confirmemail_url="http://noticeperiod.com/Androidservices/forgotpassword";
            String confirmemail_url="http://10.0.2.2:4001/customer/forgotpassword";

            //  if(type.equals("login"))
            // {
            try {

                String mails = params[0].toString();


                URL url=new URL(confirmemail_url);
                HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream=httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("forgot","UTF-8")+"="+URLEncoder.encode(mails,"UTF-8");
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

            progressDialog = ProgressDialog.show(forgot_password.this,"Loading...",
                    "Forgot password request processing, please wait...", false, false);



        }

        @Override
        protected void onPostExecute(String result) {

            progressDialog.dismiss();

            JSONObject jsonObject= null;
            try {
                jsonObject = new JSONObject(result);

                String ii=jsonObject.getString("code");

                //Integer ii=jsonObject.getInt("code");



                if(ii.equals("1"))
                {

                    Toast.makeText(getApplicationContext(),"Username and password sent to your email. Please chck it...",Toast.LENGTH_LONG).show();
                    Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                    startActivity(intent);

                }
                else if(ii.equals("0"))
                {
                    Toast.makeText(getApplicationContext(),"Invalid email id. Please try again...",Toast.LENGTH_LONG).show();

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
