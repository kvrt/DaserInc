package Daser.team.com.app;

/**
 * Created by MANOHAR on 12/22/2017.
 */

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.v7.widget.PopupMenu;
import android.support.v7.widget.RecyclerView;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
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
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class AdapterAppointments extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private Context context;
    String id,type,mtype,token,rcid,amt;
    private LayoutInflater inflater;
    List<DataAppointments> data= Collections.emptyList();
    DataAppointments current;
    int currentPos=0;
    SessionManagement sessionManagement;
    // create constructor to innitilize context and data sent from appointment fragments
    public AdapterAppointments(Context context, List<DataAppointments> data){
        this.context=context;
        inflater= LayoutInflater.from(context);
        this.data=data;


        sessionManagement=new SessionManagement(context);
        HashMap<String, String> user = sessionManagement.getdata();
        String name = user.get(SessionManagement.KEY_name);
        String email = user.get(SessionManagement.KEY_email);
        id = user.get(SessionManagement.KEY_id);
        type = user.get(SessionManagement.KEY_type);
        token = user.get(SessionManagement.KEY_token);

    }

    // Inflate the layout when viewholder created
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view=inflater.inflate(R.layout.container_appointments, parent,false);
        MyHolder holder=new MyHolder(view);
        return holder;
    }

    // Bind data
    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, final int position) {

        // Get current position of item in recyclerview to bind data and assign values from list
        final MyHolder myHolder= (MyHolder) holder;
        current=data.get(position);
        myHolder.uname1.setText(current.username);
        myHolder.sdate.setText(current.dateofservice);
        //myHolder.orgs.setText(current.org);


        //if((current.org).equals("") || (current.org).equals("0") )
        //{
          //  myHolder.orgs.setText("Not Yet Assign");

        //}
        //else
        //{
            myHolder.orgs.setText(current.org);
      //  }

        String q="<font color='black'>"+current.description+"</font> [<font color='#606060'> "+current.mobile+" - "+current.email+"</font> ]";
        String qq="<font color='#606060'><br/>"+current.address11+" "+current.address22+"\n</font>";
        myHolder.desc1.setText(Html.fromHtml(q+qq));
        // myHolder.desc1.setTextColor(Color.parseColor("#606060"));
        if(current.status.equals("C"))
        {
            myHolder.status1.setText("Close");
            myHolder.status1.setTextColor(Color.parseColor("#228B22"));
        }
        else if(current.status.equals("I"))
        {
            myHolder.status1.setText("Open");
            myHolder.status1.setTextColor(Color.parseColor("#FFA500"));
        }
        else if(current.status.equals("P"))
        {
            myHolder.status1.setText("Pending");
            myHolder.status1.setTextColor(Color.parseColor("#FF6347"));
        }


        myHolder.price1.setText("$ "+current.price_status);

        // myHolder.textPrice.setTextColor(ContextCompat.getColor(context, R.color.colorAccent));

        // load image into imageview using glide
        /*Glide.with(context).load("http://192.168.1.7/test/images/" + current.fishImage)
                .placeholder(R.drawable.ic_img_error)
                .error(R.drawable.ic_img_error)
                .into(myHolder.ivFish);*/


        myHolder.popupid.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                current=data.get(position);
                //creating a popup menu
                PopupMenu popup = new PopupMenu(context, myHolder.popupid);
                //inflating menu from xml resource
                popup.inflate(R.menu.options_popup_menu);
                //adding click listener

                Menu nav_Menu = popup.getMenu();
                if(type.equals("Seller"))
                {

                    if(current.selleruid.equals("0"))
                    {
                        nav_Menu.findItem(R.id.menu1).setVisible(true);
                        nav_Menu.findItem(R.id.menu2).setVisible(false);

                    }
                    else
                    {
                        nav_Menu.findItem(R.id.menu1).setVisible(true);
                        nav_Menu.findItem(R.id.menu2).setVisible(true);
                    }
                    nav_Menu.findItem(R.id.menu3).setVisible(false);
                }
                else if(type.equals("Buyer"))
                {
                    nav_Menu.findItem(R.id.menu1).setVisible(false);
                    nav_Menu.findItem(R.id.menu2).setVisible(false);


                    // nav_Menu.findItem(R.id.menu3).setTitle(current.selleruid);
                    if(current.selleruid.equals("0"))
                    {
                        nav_Menu.findItem(R.id.menu3).setVisible(true);
                    }
                    else
                    {
                        nav_Menu.findItem(R.id.menu3).setVisible(false);

                    }
                }

                popup.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem item) {

                        switch (item.getItemId()) {
                            case R.id.menu1:
                                //handle menu1 click
                                new AsyncLogin().execute("Open",current.recordid,current.price_status);
                                //Toast.makeText(context,"Mennu 1 "+current.recordid,Toast.LENGTH_LONG).show();

                                break;
                            case R.id.menu2:
                                //handle menu2 click

                                new AsyncLogin().execute("Closed",current.recordid,current.price_status);
                                //Toast.makeText(context,"Mennu 2 "+current.recordid,Toast.LENGTH_LONG).show();

                                break;
                            case R.id.menu3:
                                //handle menu3 click


                                //Toast.makeText(context,"Mennu 3 "+position,Toast.LENGTH_LONG).show();

                                new AsyncLogin().execute("Cancelled",current.recordid,current.price_status);

                                break;
                        }
                        return false;
                    }
                });
                //displaying the popup
                popup.show();

            }
        });


    }

    // return total item from List
    @Override
    public int getItemCount() {
        return data.size();
    }


    class MyHolder extends RecyclerView.ViewHolder{

        TextView uname1;
        // ImageView ivFish;
        TextView sdate;
        TextView desc1;
        TextView price1;
        TextView status1;
        EditText orgs;
        ImageView popupid;

        // create constructor to get widget reference
        public MyHolder(View itemView) {
            super(itemView);
            uname1= (TextView) itemView.findViewById(R.id.uname);
            // ivFish= (ImageView) itemView.findViewById(R.id.ivFish);
            desc1 = (TextView) itemView.findViewById(R.id.desc);
            orgs = (EditText) itemView.findViewById(R.id.company);
            sdate = (TextView) itemView.findViewById(R.id.datetime);
            status1 = (TextView) itemView.findViewById(R.id.open);
            price1 = (TextView) itemView.findViewById(R.id.price);

            popupid = (ImageView) itemView.findViewById(R.id.cardview2_img);


        }

    }




    private class AsyncLogin extends AsyncTask<String, String, String> {
        ProgressDialog pdLoading = new ProgressDialog(context);
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
                mtype=params[0];
                rcid=params[1];
                amt=params[2];


                // url = new URL("http://10.0.2.2:2426/Androidservices/cancel_appointment?id="+id+"&type="+type+"&recid="+current.recordid+"&mtypes="+mtype);
                //url = new URL("http://noticeperiod.com/Androidservices/cancel_appointment?id="+id+"&type="+type+"&recid="+current.recordid+"&mtypes="+mtype);
                //url = new URL("http://10.0.2.2:4001/customer/appointments_actions?id="+id+"&type="+type+"&recid="+current.recordid+"&mtypes="+mtype);
                url = new URL("http://10.0.2.2:4001/customer/appointments_actions");

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
                String post_data= URLEncoder.encode("id","UTF-8")+"="+URLEncoder.encode(id,"UTF-8")+"&"+URLEncoder.encode("type","UTF-8")+"="+URLEncoder.encode(type,"UTF-8")+"&"+URLEncoder.encode("recid","UTF-8")+"="+URLEncoder.encode(rcid,"UTF-8")+"&"+URLEncoder.encode("mtypes","UTF-8")+"="+URLEncoder.encode(mtype,"UTF-8")+"&"+URLEncoder.encode("token","UTF-8")+"="+URLEncoder.encode(token,"UTF-8")+"&"+URLEncoder.encode("amts","UTF-8")+"="+URLEncoder.encode(amt,"UTF-8");
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

            //pdLoading.dismiss();
            //      List<DataFish> data=new ArrayList<>();

            pdLoading.dismiss();
            try {

                JSONObject json_data = new JSONObject(result);

                String res=json_data.getString("code");
                if(res.equals("1"))
                {

                    Toast.makeText(context, "Appointment "+mtype+" Successfully...", Toast.LENGTH_LONG).show();
                    Intent intent=new Intent(context,Logon.class);
                    context.startActivity(intent);
                }
                else if(res.equals("0"))
                {
                    Toast.makeText(context, "Unable to proceed. Please try again...", Toast.LENGTH_LONG).show();
                }
                else if(res.equals("404"))
                {
                    Toast.makeText(context, "Session is expired...", Toast.LENGTH_LONG).show();
                    sessionManagement.logout();
                }
                //JSONArray jArray = new JSONArray(result);

                // Extract data from json and store into ArrayList as class objects
                //for(int i=0;i<jArray.length();i++){
                //  JSONObject json_data = jArray.getJSONObject(i);
                //                DataFish fishData = new DataFish();
                //fishData.fishImage= json_data.getString("fish_img");
                //                  fishData.username= json_data.getString("name");
//                    fishData.dateofservice= json_data.getString("service_date");
                // }

            } catch (JSONException e) {
                Toast.makeText(context, e.toString(), Toast.LENGTH_LONG).show();
            }

        }

    }




}
