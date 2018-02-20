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
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

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

public class seller_bank_add extends AppCompatActivity {
    TextView otp;
    EditText acno,rno,ty;
    String uid_dy;
    TextView tx;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_seller_bank_add);
        tx = (TextView) findViewById(R.id.text1);

        Typeface custom_font = Typeface.createFromAsset(getAssets(), "fonts/alegreya-sans-sc.bold.ttf");

        tx.setTypeface(custom_font);
        ActionBar ab = getSupportActionBar();
        ab.setLogo(R.mipmap.final_logo);
        ab.setDisplayUseLogoEnabled(true);
        ab.setDisplayShowHomeEnabled(true);
        ab.setTitle(" Add Bank Details");

        //otp=(TextView)findViewById(R.id.text1);
        acno=(EditText)findViewById(R.id.acnum);
        rno=(EditText)findViewById(R.id.routenum);
        ty=(EditText)findViewById(R.id.actype);

        Globalvariables_set gbl=((Globalvariables_set)getApplicationContext());
        uid_dy=gbl.getSignup_userid();
        ///otp.setText(ui);
    }

    public void addbankaccount(View view)
    {

        if (acno.getText().toString().isEmpty()) {
            Toast.makeText(this,"Account number should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if (rno.getText().toString().isEmpty()) {
            Toast.makeText(this,"Routing number should not empty.!",Toast.LENGTH_LONG).show();

        }
        // else if(ty.getText().toString().isEmpty() || !ty.getText().toString().equals("individual") || !ty.getText().toString().equals("company"))
        // {
        //    Toast.makeText(this,"Account type should not empty. And it should be ' individual ' or ' company ' only!",Toast.LENGTH_LONG).show();
        // }
        else {



            new seller_bank_add.BackgroundWorkers().execute(uid_dy.toString(),acno.getText().toString(),rno.getText().toString(),ty.getText().toString());


/*
            Stripe stripe = new Stripe(this);

            stripe.setDefaultPublishableKey("pk_test_eu5vgSNxVXBVTWNqHxQNKVls");
            BankAccount bankAccount = new BankAccount(acno.getText().toString(), "US", "usd","US","US","US","US", rno.getText().toString());
            stripe.createBankAccountToken(bankAccount, new TokenCallback() {
                @Override
                public void onError(Exception error) {
                    Log.e("Stripe Error", error.getMessage());

                    Toast.makeText(getApplicationContext(),"Unable to create bank token, error is : "+error.getMessage(),Toast.LENGTH_LONG).show();
                }

                @Override
                public void onSuccess(com.stripe.android.model.Token token) {
                    Log.e("Bank Token", token.getId());

                    acno.setText(token.getId().toString());
                    new seller_bank_add.BackgroundWorkers().execute(uid_dy.toString(),token.getId().toString());

                }
            });*/
        }


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
            String confirmemail_url="http://10.0.2.2:4001/customer/addbankdetails";


            //  if(type.equals("login"))
            // {
            try {

                String id = params[0].toString();
                String accountno = params[1].toString();
                String accountrno = params[2].toString();
                String accountty = params[3].toString();


                URL url=new URL(confirmemail_url);
                HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream=httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("uid","UTF-8")+"="+URLEncoder.encode(id,"UTF-8")+"&"+URLEncoder.encode("acno","UTF-8")+"="+URLEncoder.encode(accountno,"UTF-8")+"&"+URLEncoder.encode("rcno","UTF-8")+"="+URLEncoder.encode(accountrno,"UTF-8")+"&"+URLEncoder.encode("btype","UTF-8")+"="+URLEncoder.encode(accountty,"UTF-8");
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


            progressDialog = ProgressDialog.show(seller_bank_add.this,"Loading...",
                    "Bank details adding, please wait...", false, false);


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

                    Toast.makeText(getApplicationContext(), "Bank account added successfully...", Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                    startActivity(intent);

                }
                else if(ii.equals("0"))
                {
                    Toast.makeText(getApplicationContext(),"Unable to proceed. Please try again...",Toast.LENGTH_LONG).show();

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
