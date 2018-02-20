package Daser.team.com.app;

import android.app.Activity;
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
import java.util.StringTokenizer;

/**
 * Created by MANOHAR on 11/25/2017.
 */

public class my_account extends Fragment {
    private ProgressDialog progressDialog;
    SessionManagement sessionManagement;
    String id,type,token,name,phonea,doba,addr1a,addr2a,citya,statea,countrya,zipa,orgnm,emaila,lnamea,stripeid,addressid;
    String idq,typeq,tokenq,nameq,phoneaq,dobaq,addr1aq,addr2aq,cityaq,stateaq,countryaq,zipaq,orgnmq,emailaq,lnameaq;

//String url_myaccount="http://10.0.2.2:2426/Androidservices/myaccount";
    //String url="http://noticeperiod.com/Androidservices/getservices";
    // String url_myaccount="http://noticeperiod.com/Androidservices/myaccount";

    EditText country,state,fname,lname,email,phone,dob,orgn,addr1,addr2,city,zipcode;
    TextView tx;
    Activity act=getActivity();
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        View v=  inflater.inflate(R.layout.my_account,container,false);
        //inflater.inflate(R.layout.fragement1,container,false);


        tx = (TextView)v.findViewById(R.id.text1);
        country = (EditText)v.findViewById(R.id.country);
        state = (EditText)v.findViewById(R.id.state);
        fname = (EditText)v.findViewById(R.id.fname);
        lname = (EditText)v.findViewById(R.id.lname);
        email = (EditText)v.findViewById(R.id.email);
        dob = (EditText)v.findViewById(R.id.dob);
        phone = (EditText)v.findViewById(R.id.phone);
        orgn = (EditText)v.findViewById(R.id.org);
        addr1 = (EditText)v.findViewById(R.id.addr1);
        addr2 = (EditText)v.findViewById(R.id.addr2);
        city = (EditText)v.findViewById(R.id.city);
        zipcode = (EditText)v.findViewById(R.id.zcode);
        email.setEnabled(false);
        Typeface custom_font = Typeface.createFromAsset(getActivity().getAssets(),  "fonts/alegreya-sans-sc.bold.ttf");
        tx.setTypeface(custom_font);


        sessionManagement=new SessionManagement(getActivity().getApplicationContext());
        HashMap<String, String> user = sessionManagement.getdata();

        id = user.get(SessionManagement.KEY_id);
        type = user.get(SessionManagement.KEY_type);
        token = user.get(SessionManagement.KEY_token);
        name = user.get(SessionManagement.KEY_name);
        lnamea = user.get(SessionManagement.KEY_lname);
        doba = user.get(SessionManagement.KEY_dob);
        addr1a = user.get(SessionManagement.KEY_addr1);
        addr2a = user.get(SessionManagement.KEY_addr2);
        statea = user.get(SessionManagement.KEY_state);
        citya = user.get(SessionManagement.KEY_city);
        countrya = user.get(SessionManagement.KEY_country);
        zipa = user.get(SessionManagement.KEY_zip);
        phonea = user.get(SessionManagement.KEY_phone);
        emaila = user.get(SessionManagement.KEY_email);
        orgnm = user.get(SessionManagement.KEY_org);
        stripeid = user.get(SessionManagement.KEY_stripeid);
        addressid = user.get(SessionManagement.KEY_addrid);


        fname.setText(name);
        lname.setText(lnamea);
        dob.setText(doba);
        phone.setText(phonea);
        email.setText(emaila);
        addr1.setText(addr1a);
        addr2.setText(addr2a);
        state.setText(statea);
        city.setText(citya);
        country.setText(countrya);
        zipcode.setText(zipa);



        if(type.equals("Buyer"))
        {
            orgn.setVisibility(View.GONE);
        }
        else if(type.equals("Seller"))
        {
            orgn.setVisibility(View.VISIBLE);
            orgn.setText(orgnm);
        }

        //new BackgroundWorkers().execute(id,type,token);




        Button btn_txt=(Button)v.findViewById(R.id.update);

        btn_txt.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {

                //Toast.makeText(getActivity(),"Saved Successfully", Toast.LENGTH_LONG).show();

                new BackgroundWorkers_userdataupdate().execute(id,type,fname.getText().toString(),lname.getText().toString(),dob.getText().toString(),phone.getText().toString(),orgn.getText().toString(),addr1.getText().toString(),addr2.getText().toString(),state.getText().toString(),city.getText().toString(),zipcode.getText().toString(),country.getText().toString(),token);


/*
                Fragment fragment = new schedule_appointment();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.content_main, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
*/



//                Intent intent = new Intent(getActivity(), Logon.class);
                //              startActivity(intent);

                //  Toast.makeText(getApplicationContext(),"Frament button is clicked",Toast.LENGTH_LONG).show();
                // Toast.makeText(getApplicationContext(), "This is a plain toast.", Toast.LENGTH_SHORT).show();

            }

        });

        return v;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        getActivity().setTitle("My Account");

    }


    // update user data



    class BackgroundWorkers_userdataupdate extends AsyncTask<String,Integer,String> {

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

            //String login_url="http://10.0.2.2:2426/Androidservices/myaccount_update";
            //String login_url="http://noticeperiod.com/Androidservices/myaccount_update";
            String login_url="http://10.0.2.2:4001/customer/accountupdate";

            //if(type.equals("login"))
            //{
            try {
                String id1=params[0].toString();
                String type1 = params[1].toString();
                String fname1 = params[2].toString();
                String lname1 = params[3].toString();
                String dob1 = params[4].toString();
                String phone1 = params[5].toString();
                String orgn1 = params[6].toString();
                String addr11 = params[7].toString();
                String addr21 = params[8].toString();
                String state1 = params[9].toString();
                String city1 = params[10].toString();
                String zipcode1 = params[11].toString();
                String country1 = params[12].toString();
                String token1 = params[13].toString();

                URL url=new URL(login_url);
                HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream=httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("id","UTF-8")+"="+URLEncoder.encode(id1,"UTF-8")+"&"+URLEncoder.encode("type","UTF-8")+"="+URLEncoder.encode(type1,"UTF-8")+"&"+URLEncoder.encode("fname","UTF-8")+"="+URLEncoder.encode(fname1,"UTF-8")+"&"+URLEncoder.encode("lname","UTF-8")+"="+URLEncoder.encode(lname1,"UTF-8")+"&"+URLEncoder.encode("dob","UTF-8")+"="+URLEncoder.encode(dob1,"UTF-8")+"&"+URLEncoder.encode("phone","UTF-8")+"="+URLEncoder.encode(phone1,"UTF-8")+"&"+URLEncoder.encode("orgn","UTF-8")+"="+URLEncoder.encode(orgn1,"UTF-8")+"&"+URLEncoder.encode("addr1","UTF-8")+"="+URLEncoder.encode(addr11,"UTF-8")+"&"+URLEncoder.encode("addr2","UTF-8")+"="+URLEncoder.encode(addr21,"UTF-8")+"&"+URLEncoder.encode("state","UTF-8")+"="+URLEncoder.encode(state1,"UTF-8")+"&"+URLEncoder.encode("city","UTF-8")+"="+URLEncoder.encode(city1,"UTF-8")+"&"+URLEncoder.encode("zipcode","UTF-8")+"="+URLEncoder.encode(zipcode1,"UTF-8")+"&"+URLEncoder.encode("country","UTF-8")+"="+URLEncoder.encode(country1,"UTF-8")+"&"+URLEncoder.encode("token","UTF-8")+"="+URLEncoder.encode(token1,"UTF-8");
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
            //}
            return null;
        }

        @Override
        protected void onPreExecute() {


            progressDialog = ProgressDialog.show(getActivity(),"Loading...",
                    "Updating user data, please wait...", false, false);


        }

        @Override
        protected void onPostExecute(String result) {
            progressDialog.dismiss();

            JSONObject jsonObject= null;
            try {
                jsonObject = new JSONObject(result);

                String ii=jsonObject.getString("code");



                if(ii.equals("1"))
                {
                    Toast.makeText(getActivity().getApplicationContext(),"Updated Successfully...",Toast.LENGTH_LONG).show();

                    sessionManagement.LoginSession(id, type, emaila, fname.getText().toString(), lname.getText().toString(), phone.getText().toString(), dob.getText().toString(), addr1.getText().toString(), addr2.getText().toString(), city.getText().toString(), state.getText().toString(), country.getText().toString(), zipcode.getText().toString(), orgn.getText().toString(), token,stripeid,addressid);



                    Intent intent=new Intent(getActivity().getApplicationContext(),Logon.class);
                    startActivity(intent);

                }
                else if(ii.equals("0"))
                {
                    Toast.makeText(getActivity().getApplicationContext(),"Unable to update user data. Please try again...",Toast.LENGTH_LONG).show();

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





    // onload data fetching
    class BackgroundWorkers extends AsyncTask<String,Integer,String> {

        String JSON_STRING;
        Context context;
        AlertDialog alertDialog;
        @Override
        protected String doInBackground(String... params) {
            String id=params[0];
            //String login_url="http://10.0.2.2:2426/Androidservices/insert";
            //String login_url="http://www.noticeperiod.com/Androidservices/myaccount";
            String login_url="http://10.0.2.2:2426/Androidservices/myaccount";

            //if(type.equals("login"))
            //{
            try {
                String type = params[1].toString();
                String token = params[2].toString();

                URL url=new URL(login_url);
                HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream=httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("id","UTF-8")+"="+URLEncoder.encode(id,"UTF-8")+"&"+URLEncoder.encode("type","UTF-8")+"="+URLEncoder.encode(type,"UTF-8")+"&"+URLEncoder.encode("token","UTF-8")+"="+URLEncoder.encode(token,"UTF-8");
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
            //}
            return null;
        }

        @Override
        protected void onPreExecute() {


            progressDialog = ProgressDialog.show(getActivity(),"Loading...",
                    "My Account, please wait...", false, false);


        }

        @Override
        protected void onPostExecute(String result) {
            progressDialog.dismiss();
            /*
            Intent intent=new Intent(getApplicationContext(),Logon.class);
            startActivity(intent);*/
            String s = result; // "having Community Portal|Help Desk|Local Embassy|Reference Desk|Site News";
            StringTokenizer st = new StringTokenizer(s, "\\|");
            String check = st.nextToken();
            String fname1 = st.nextToken();
            String lname1 = st.nextToken();
            String mail1 = st.nextToken();
            String dob1 = st.nextToken();
            String phone1 = st.nextToken();
            String adr1 = st.nextToken();
            String adr2 = st.nextToken();
            String stat = st.nextToken();
            String city1 = st.nextToken();
            String zip1 = st.nextToken();
            String coun1 = st.nextToken();
            if(check.equals("1")) {
                String company1 = st.nextToken();

                orgn.setText(company1);
            }
            //          else if(check.equals("0"))
//            {

            //}

            fname.setText(fname1);
            lname.setText(lname1);
            email.setText(mail1);
            dob.setText(dob1);
            phone.setText(phone1);
            addr1.setText(adr1);
            addr2.setText(adr2);
            state.setText(stat);
            city.setText(city1);
            zipcode.setText(zip1);
            country.setText(coun1);
            // this will contain " they taste good"


  /*          country.setText(result);

            String[] res=result.split("^");

            tx.setText(res[0]);
            state.setText(res[1]);
*/

  /*
            String ii = null;
            JSONObject jsonObject= null;
            try {
                jsonObject = new JSONObject(result);

                 ii=jsonObject.getString("fname");
                country.setText(ii.toString());


            } catch (JSONException e) {
                e.printStackTrace();
            }
*/

        }

        @Override
        protected void onProgressUpdate(Integer... values) {


            progressDialog.setProgress(values[0]);

        }

    }





}
