package Daser.team.com.app;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.iid.FirebaseInstanceId;

import org.json.JSONArray;
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
import java.util.HashMap;
import java.util.List;

/**
 * Created by MANOHAR on 11/25/2017.
 */

public class seeker_appointments_fragment extends Fragment {



    // CONNECTION_TIMEOUT and READ_TIMEOUT are in milliseconds
    //public static final int CONNECTION_TIMEOUT = 10000000;
    //public static final int READ_TIMEOUT = 15000000;
    private RecyclerView mRVFishPrice;
    private AdapterAppointments mAdapter;
    String id,type,token,refreshedToken;
    SessionManagement sessionManagement;
    Activity act=getActivity();
    //EditText orgg;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        View v=  inflater.inflate(R.layout.seeker_appointments_fragment,container,false);
        //inflater.inflate(R.layout.fragement1,container,false);
        mRVFishPrice = (RecyclerView)v.findViewById(R.id.appointments);
        // orgg = (EditText)v.findViewById(R.id.org);

       refreshedToken = FirebaseInstanceId.getInstance().getToken();
        //Toast.makeText(getActivity(),"token : "+refreshedToken,Toast.LENGTH_LONG).show();
        //orgg.setEnabled(false);
        new AsyncLogin().execute();

        sessionManagement=new SessionManagement(getActivity().getApplicationContext());
        HashMap<String, String> user = sessionManagement.getdata();
        String name = user.get(SessionManagement.KEY_name);
        String email = user.get(SessionManagement.KEY_email);
        id = user.get(SessionManagement.KEY_id);
        type = user.get(SessionManagement.KEY_type);
        token = user.get(SessionManagement.KEY_token);

  /*      TextView des=(TextView)v.findViewById(R.id.cardview_desc);
*/
        // des.setText(id+" "+name+" "+type+" "+email);



        Button btn_txt=(Button)v.findViewById(R.id.schedule);

        if(type.equals("Seller"))
        {
            btn_txt.setVisibility(View.GONE);
        }
        btn_txt.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {

                //Toast.makeText(getActivity(),"Frament button is clicked",Toast.LENGTH_LONG).show();


                Fragment fragment = new schedule_appointment();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.content_main, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();




                //Intent intent = new Intent(getActivity(), Seeker_logon.class);
                //startActivity(intent);

                //  Toast.makeText(getApplicationContext(),"Frament button is clicked",Toast.LENGTH_LONG).show();
                // Toast.makeText(getApplicationContext(), "This is a plain toast.", Toast.LENGTH_SHORT).show();

            }

        });

        return v;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        getActivity().setTitle("Appointments");

    }




    private class AsyncLogin extends AsyncTask<String, String, String> {
        ProgressDialog pdLoading = new ProgressDialog(getActivity());
        HttpURLConnection conn;
        URL url = null;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            //this method will be running on UI thread
            pdLoading.setMessage("\tLoading...");
            pdLoading.setCancelable(false);
            pdLoading.show();

        }

        @Override
        protected String doInBackground(String... params) {
            try {

                // Enter URL address where your json file resides
                // Even you can make call to php file which returns json data
                // url = new URL("http://10.0.2.2:2426/Androidservices/test/example.json");
                //url = new URL("http://10.0.2.2:2426/Androidservices/appointments?id="+id+"&type="+type+"");
                //url = new URL("http://10.0.2.2:2426/Androidservices/appointments?id="+id+"&type="+type+"");
                //url = new URL("http://noticeperiod.com/Androidservices/appointments?id="+id+"&type="+type+"");
                //url = new URL("http://10.0.2.2:4001/customer/appointments?id="+id+"&type="+type+"");
                url = new URL("http://10.0.2.2:4001/customer/appointments");

            } catch (MalformedURLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                return e.toString();
            }
            try {

                // Setup HttpURLConnection class to send and receive data from php and mysql
                conn = (HttpURLConnection) url.openConnection();
                // conn.setReadTimeout(READ_TIMEOUT);
                //conn.setConnectTimeout(CONNECTION_TIMEOUT);
                conn.setRequestMethod("POST");

                // setDoOutput to true as we recieve data from json file
                conn.setDoInput(true);
                conn.setDoOutput(true);
                OutputStream outputStream=conn.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("id","UTF-8")+"="+URLEncoder.encode(id,"UTF-8")+"&"+URLEncoder.encode("type","UTF-8")+"="+URLEncoder.encode(type,"UTF-8")+"&"+URLEncoder.encode("token","UTF-8")+"="+URLEncoder.encode(token,"UTF-8")+"&"+URLEncoder.encode("deviceid","UTF-8")+"="+URLEncoder.encode(refreshedToken,"UTF-8");
                bufferedWriter.write(post_data);
                bufferedWriter.flush();
                bufferedWriter.close();
                outputStream.close();


            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
                return e1.toString();
            }

            try {

                int response_code = conn.getResponseCode();

                // Check if successful connection made
                if (response_code == HttpURLConnection.HTTP_OK) {

                    // Read data sent from server
                    InputStream input = conn.getInputStream();
                    BufferedReader reader = new BufferedReader(new InputStreamReader(input));
                    StringBuilder result = new StringBuilder();
                    String line;

                    while ((line = reader.readLine()) != null) {
                        result.append(line);
                    }

                    // Pass data to onPostExecute method
                    return (result.toString());

                } else {

                    return ("unsuccessful");
                }

            } catch (IOException e) {
                e.printStackTrace();
                return e.toString();
            } finally {
                conn.disconnect();
            }


        }

        @Override
        protected void onPostExecute(String result) {

            //this method will be running on UI thread

/*
            JSONObject jsonObj = new JSONObject(result);
            if (jsonObj != null) {
                JSONArray categories = jsonObj
                        .getJSONArray("category");
            */

            pdLoading.dismiss();
            List<DataAppointments> data=new ArrayList<>();

            pdLoading.dismiss();
            try {


                JSONObject jsonObj = new JSONObject(result);




                JSONArray jArray = jsonObj.getJSONArray("data");

                // Extract data from json and store into ArrayList as class objects
                for (int i = 0; i < jArray.length(); i++) {
                    JSONObject json_data = jArray.getJSONObject(i);


                    String ii = json_data.getString("code");

                    if (ii.equals("404")) {
                        Toast.makeText(getActivity(), "Session is expired...", Toast.LENGTH_LONG).show();
                        sessionManagement.logout();

                    }
                    else
                    {

                    DataAppointments fishData = new DataAppointments();
                    //fishData.fishImage= json_data.getString("fish_img");
                    fishData.username = json_data.getString("fname") + " " + json_data.getString("lname");
                    fishData.dateofservice = json_data.getString("service_date");
                    fishData.description = json_data.getString("servicetype");
                    fishData.address11 = json_data.getString("address1") + " " + json_data.getString("address2") + " " + json_data.getString("city");
                    fishData.address22 = json_data.getString("state") + " " + json_data.getString("country") + " " + json_data.getString("zip");

                    fishData.org = json_data.getString("organisation");
                    fishData.status = json_data.getString("status");
                    fishData.price_status = json_data.getString("amount");
                    fishData.email = json_data.getString("mail");
                    fishData.mobile = json_data.getString("phone");
                    fishData.recordid = json_data.getString("id");
                    fishData.selleruid = json_data.getString("sellerid");


                    data.add(fishData);
                }
                }

                // Setup and Handover data to recyclerview
                mAdapter = new AdapterAppointments(getActivity(), data);
                mRVFishPrice.setAdapter(mAdapter);
                mRVFishPrice.setLayoutManager(new LinearLayoutManager(getActivity()));

            } catch (JSONException e) {
                Toast.makeText(getActivity(), e.toString(), Toast.LENGTH_LONG).show();
            }

        }

    }




}