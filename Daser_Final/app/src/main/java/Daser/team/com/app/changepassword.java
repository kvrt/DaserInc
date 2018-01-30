package Daser.team.com.app;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
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
import java.util.HashMap;

/**
 * Created by MANOHAR on 11/25/2017.
 */

public class changepassword extends Fragment {

    EditText cpass,npass,cfpass;
    SessionManagement sessionManagement;
    private ProgressDialog progressDialog;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        View v= inflater.inflate(R.layout.changepassword,container,false);


        TextView tx = (TextView)v.findViewById(R.id.text1);

        Typeface custom_font = Typeface.createFromAsset(getActivity().getAssets(),  "fonts/alegreya-sans-sc.bold.ttf");

        tx.setTypeface(custom_font);
        Button btn_txt=(Button)v.findViewById(R.id.ch_pass);
        cpass=(EditText)v.findViewById(R.id.cpasss);
        npass=(EditText)v.findViewById(R.id.npass);
        cfpass=(EditText)v.findViewById(R.id.cfpass);

        btn_txt.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {

  /*              //Toast.makeText(getActivity(),"Frament button is clicked",Toast.LENGTH_LONG).show();


                Intent intent = new Intent(getActivity(), Logon.class);
                startActivity(intent);

                //  Toast.makeText(getApplicationContext(),"Frament button is clicked",Toast.LENGTH_LONG).show();
                // Toast.makeText(getApplicationContext(), "This is a plain toast.", Toast.LENGTH_SHORT).show();
*/

                String pass1=cpass.getText().toString();
                String pass2=npass.getText().toString();
                String pass3=cfpass.getText().toString();

                sessionManagement=new SessionManagement(getActivity().getApplicationContext());
                if(pass1.isEmpty())
                {
                    Toast.makeText(getActivity(),"Current password should not empty.!",Toast.LENGTH_LONG).show();
                }
                else if(pass2.isEmpty())
                {
                    Toast.makeText(getActivity(),"New password should not empty.!",Toast.LENGTH_LONG).show();
                }
                else if(pass3.isEmpty())
                {
                    Toast.makeText(getActivity(),"Confirm password should not empty.!",Toast.LENGTH_LONG).show();
                }
                else if(!pass2.equals(pass3))
                {
                    Toast.makeText(getActivity(),"Password not match. Please check it.!",Toast.LENGTH_LONG).show();
                }
                else
                {
                    new BackgroundWorkers().execute(pass1,pass2,pass3);
                }
                //new BackgroundWorkers().execute(pass1,pass2,pass3);





            }

        });

        return v;
    }



    class BackgroundWorkers extends AsyncTask<String,Integer,String> {

        String JSON_STRING;
        Context context;
        AlertDialog alertDialog;
        @Override
        protected String doInBackground(String... params) {



            HashMap<String, String> user = sessionManagement.getdata();

            String id = user.get(SessionManagement.KEY_id);
            String type = user.get(SessionManagement.KEY_type);
            String token = user.get(SessionManagement.KEY_token);
            //String login_url="http://10.0.2.2:2426/Androidservices/changepassword";
           // String login_url="http://noticeperiod.com/Androidservices/changepassword";
            String login_url="http://10.0.2.2:4001/customer/changepassword";


            //if(type.equals("login"))
            //{
            try {
                String cpass1 = params[0].toString();
                String cpass2 = params[1].toString();
                String cpass3 = params[2].toString();

                URL url=new URL(login_url);
                HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream=httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("uid","UTF-8")+"="+URLEncoder.encode(id,"UTF-8")+"&"+URLEncoder.encode("chpass1","UTF-8")+"="+URLEncoder.encode(cpass1,"UTF-8")+"&"+URLEncoder.encode("chpass2","UTF-8")+"="+URLEncoder.encode(cpass2,"UTF-8")+"&"+URLEncoder.encode("chpass3","UTF-8")+"="+URLEncoder.encode(cpass3,"UTF-8")+"&"+URLEncoder.encode("token","UTF-8")+"="+URLEncoder.encode(token,"UTF-8");
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
            // }
            return null;
        }

        @Override
        protected void onPreExecute() {
  /*      alertDialog=new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Login Status");
*/


            progressDialog = ProgressDialog.show(getActivity(),"Loading...",
                    "Processing Changepassword, please wait...", false, false);

        }

        @Override
        protected void onPostExecute(String result) {
            progressDialog.dismiss();
            /*
            Intent intent=new Intent(getApplicationContext(),Logon.class);
            startActivity(intent);*/

            JSONObject jsonObject= null;
            try {
                jsonObject = new JSONObject(result);

                String ii=jsonObject.getString("code");


                if(ii.equals("1"))
                {


                    Toast.makeText(getActivity(),"Password Changed Successfully...",Toast.LENGTH_LONG).show();
                    Intent intent=new Intent(getActivity(),Logon.class);
                    startActivity(intent);

                }
                else if(ii.equals("0"))
                {
                    Toast.makeText(getActivity(),"Invalid current password. Please try again...",Toast.LENGTH_LONG).show();


                }
                else if(ii.equals("404"))
                {
                    Toast.makeText(context, "Session is expired...", Toast.LENGTH_LONG).show();
                    sessionManagement.logout();
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





    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        getActivity().setTitle("Change Password");


    }
}

