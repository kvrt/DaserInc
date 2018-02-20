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

public class Service_seeker_signup extends AppCompatActivity {

    EditText fname, lname, email, phone, password, addr1, addr2, state, city, zip, country,dob;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_service_seeker_signup);

        TextView tx = (TextView) findViewById(R.id.text1);

        Typeface custom_font = Typeface.createFromAsset(getAssets(), "fonts/alegreya-sans-sc.bold.ttf");

        tx.setTypeface(custom_font);
        ActionBar ab = getSupportActionBar();
        ab.setLogo(R.mipmap.final_logo);
        ab.setDisplayUseLogoEnabled(true);
        ab.setDisplayShowHomeEnabled(true);
        ab.setTitle(" Service Seeker Signup");

        fname = (EditText) findViewById(R.id.fname);
        lname = (EditText) findViewById(R.id.lname);
        email = (EditText) findViewById(R.id.email);
        phone = (EditText) findViewById(R.id.phone);
        password = (EditText) findViewById(R.id.password);
        addr1 = (EditText) findViewById(R.id.addr1);
        addr2 = (EditText) findViewById(R.id.addr2);
        state = (EditText) findViewById(R.id.state);
        city = (EditText) findViewById(R.id.city);
        zip = (EditText) findViewById(R.id.zcode);
        country = (EditText) findViewById(R.id.country);
        dob = (EditText) findViewById(R.id.dob);


    }


    public void seekersingup(View view) {


        String firstname = fname.getText().toString();
        String lastname = lname.getText().toString();
        String mailaddr = email.getText().toString();
        String phonenum = phone.getText().toString();
        String pass = password.getText().toString();
        String address1 = addr1.getText().toString();
        String address2 = addr2.getText().toString();
        String s_state = state.getText().toString();
        String s_city = city.getText().toString();
        String zipcode = zip.getText().toString();
        String s_country = country.getText().toString();
        String s_dob = dob.getText().toString();


        String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
        if(firstname.isEmpty() || firstname.length()<3)
        {
            Toast.makeText(getApplicationContext(),"First name should not empty and min 3 characters",Toast.LENGTH_LONG).show();

        }
        else if(lastname.isEmpty() || lastname.length()<2)
        {
            Toast.makeText(getApplicationContext(),"Last name should not empty and min 2 characters",Toast.LENGTH_LONG).show();

        }
        else if(mailaddr.isEmpty() || !mailaddr.matches(emailPattern))
        {
            Toast.makeText(getApplicationContext(),"Invalid email address",Toast.LENGTH_LONG).show();
        }
        else if(s_dob.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"DOB should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if(phonenum.isEmpty() || phonenum.length()<8)
        {
            Toast.makeText(getApplicationContext(),"Phone number should not empty and min 8 numbers.!",Toast.LENGTH_LONG).show();

        }
        else if(pass.isEmpty() || pass.length()<8)
        {
            Toast.makeText(getApplicationContext(),"Password should not empty and min 8 characters.!",Toast.LENGTH_LONG).show();

        }
        else if(address1.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"Address line1 should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if(address2.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"Address line2 should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if(s_state.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"State should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if(s_city.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"City should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if(zipcode.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"Zipcode should not empty.!",Toast.LENGTH_LONG).show();
        }
        else if(s_country.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"Country should not empty.!",Toast.LENGTH_LONG).show();
        }
        else
        {
            new Service_seeker_signup.BackgroundSignup().execute(firstname, lastname, mailaddr, phonenum, pass, address1, address2, s_state, s_city, zipcode, s_country,s_dob);
        }
        //new Service_seeker_signup.BackgroundSignup().execute(firstname, lastname, mailaddr, phonenum, pass, address1, address2, s_state, s_city, zipcode, s_country,s_dob);


    }


    class BackgroundSignup extends AsyncTask<String, Integer, String> {

        String JSON_STRING;
        Context context;
        AlertDialog alertDialog;

        @Override
        protected String doInBackground(String... params) {

            //String login_url = "http://10.0.2.2:2426/Androidservices/signup";
            //String login_url="http://noticeperiod.com/Androidservices/signup";
            String login_url = "http://10.0.2.2:4001/customer/registration";

            //  if (type.equals("login")) {
            try {
                String s_fname = params[0].toString();
                String s_lname = params[1].toString();
                String s_email = params[2].toString();
                String s_phone = params[3].toString();
                String s_pass = params[4].toString();
                String s_addr1 = params[5].toString();
                String s_addr2 = params[6].toString();
                String s_state = params[7].toString();
                String s_city = params[8].toString();
                String s_zipcode = params[9].toString();
                String s_country = params[10].toString();
                String s_dobs = params[11].toString();

                URL url = new URL(login_url);
                HttpURLConnection httpsURLConnection = (HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream = httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("signer", "UTF-8") + "=" + URLEncoder.encode("Buyer", "UTF-8") + "&" + URLEncoder.encode("phone", "UTF-8") + "=" + URLEncoder.encode(s_phone, "UTF-8")+ "&" + URLEncoder.encode("fname", "UTF-8") + "=" + URLEncoder.encode(s_fname, "UTF-8")+ "&" + URLEncoder.encode("lname", "UTF-8") + "=" + URLEncoder.encode(s_lname, "UTF-8")+ "&" + URLEncoder.encode("dob", "UTF-8") + "=" + URLEncoder.encode(s_dobs, "UTF-8")+ "&" + URLEncoder.encode("email", "UTF-8") + "=" + URLEncoder.encode(s_email, "UTF-8")+ "&" + URLEncoder.encode("pass", "UTF-8") + "=" + URLEncoder.encode(s_pass, "UTF-8")+ "&" + URLEncoder.encode("addr1", "UTF-8") + "=" + URLEncoder.encode(s_addr1, "UTF-8")+ "&" + URLEncoder.encode("addr2", "UTF-8") + "=" + URLEncoder.encode(s_addr2, "UTF-8")+ "&" + URLEncoder.encode("city", "UTF-8") + "=" + URLEncoder.encode(s_city, "UTF-8")+ "&" + URLEncoder.encode("state", "UTF-8") + "=" + URLEncoder.encode(s_state, "UTF-8")+ "&" + URLEncoder.encode("zip", "UTF-8") + "=" + URLEncoder.encode(s_zipcode, "UTF-8")+ "&" + URLEncoder.encode("country", "UTF-8") + "=" + URLEncoder.encode(s_country, "UTF-8")+ "&" + URLEncoder.encode("orgname", "UTF-8") + "=" + URLEncoder.encode("0", "UTF-8")+ "&" + URLEncoder.encode("deviceid", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8");
                bufferedWriter.write(post_data);
                bufferedWriter.flush();
                bufferedWriter.close();
                outputStream.close();

                InputStream inputStream = httpsURLConnection.getInputStream();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

                StringBuilder stringBuilder = new StringBuilder();
                while ((JSON_STRING = bufferedReader.readLine()) != null) {
                    stringBuilder.append(JSON_STRING + "\n");
                }
                bufferedReader.close();
                inputStream.close();
                httpsURLConnection.disconnect();

                synchronized (this) {
                    //Initialize an integer (that will act as a counter) to zero
                    int counter = 0;
                    //While the counter is smaller than four
                    while (counter <= 4) {
                        //Wait 850 milliseconds
                        this.wait(850);
                        //Increment the counter
                        counter++;
                        //Set the current progress.
                        //This value is going to be passed to the onProgressUpdate() method.
                        publishProgress(counter * 25);
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
            // }
            return null;
        }

        @Override
        protected void onPreExecute() {
  /*      alertDialog=new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Login Status");
*/


            progressDialog = ProgressDialog.show(Service_seeker_signup.this, "Loading...",
                    "Processing Signup, please wait...", false, false);
        }

        @Override
        protected void onPostExecute(String result) {
            progressDialog.dismiss();
            /*
            Intent intent=new Intent(getApplicationContext(),Logon.class);
            startActivity(intent);*/

            JSONObject jsonObject = null;
            try {
                jsonObject = new JSONObject(result);

                String ii = jsonObject.getString("code");
                String uid = jsonObject.getString("userid");

                //Integer ii=jsonObject.getInt("code");

                // EditText editText = (EditText) findViewById(R.id.username);

                //editText.setText(ii);


                //EditText editText2 = (EditText) findViewById(R.id.password);


                if (ii.equals("1")) {

                    Globalvariables_set gbl=((Globalvariables_set)getApplicationContext());
                    gbl.setSignup_userid(uid);

                    // ((Globalvariables_set) this.getApplication()).setSignup_userid(uid);
                    Toast.makeText(getApplicationContext(), "Successfully Registered...", Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(getApplicationContext(), Emailconfirmation.class);
                    startActivity(intent);


                } else if (ii.equals("0")) {
                    Toast.makeText(getApplicationContext(), "Unable to proceed. Please try again...", Toast.LENGTH_LONG).show();


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