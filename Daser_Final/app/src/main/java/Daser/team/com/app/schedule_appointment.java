package Daser.team.com.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.ProgressDialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
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
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import com.stripe.android.Stripe;
import com.stripe.android.TokenCallback;
import com.stripe.android.model.Card;
import com.stripe.android.model.Token;

/**
 * Created by MANOHAR on 11/25/2017.
 */

public class schedule_appointment extends Fragment implements AdapterView.OnItemSelectedListener {
    ArrayList<String> categories;
    private ProgressDialog progressDialog;
    private ArrayList<Category> categoriesList;
    Spinner spinnerFood;
    private int mYear, mMonth, mDay, mHour, mMinute;
    SessionManagement sessionManagement;
    Activity act=getActivity();
    TextView textView,calc,calc1,tx,exist_addr,cdetails,cdetails1,updatecrd,keepcrd;
    EditText srvids,ctkn,crdstatus,dynamic_text,dynamic_text1,dynamic_text2,dynamic_text3,count,dd,tt,cnt,param,addr1, addr2, state, city, zip, country,vl,cardn,em,ey,cvc,tn2,tn3,tn4;
    android.support.design.widget.TextInputLayout fl1,fl2;
    float seramt,seramt1=0;
    double seramt3=0;
    String serids="",ssid="";
    List<EditText> allEds;
    List<EditText> allEds_amt;
    List<EditText> allEds_tags;
    List<EditText> allEds_ids;
    List<EditText> serviceids;
    List<android.support.design.widget.TextInputLayout> flabels;


    LinearLayout dyna,adcard,excard,dyna_serviceid;
    String url,getdata,id,type,param_value,param_amt,token,param_id,cardtoken,cardid,digits,crdtype,stripeid,addressid;
    Button sbt,qt;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        final View v=  inflater.inflate(R.layout.schedule_appointment,container,false);
        //inflater.inflate(R.layout.fragement1,container,false);

        final LinearLayout newaddr=(LinearLayout)v.findViewById(R.id.newadd);
        newaddr.setVisibility(View.GONE);
        final LinearLayout linearLayout=(LinearLayout)v.findViewById(R.id.oldaddr);
        final Button btn_txt=(Button)v.findViewById(R.id.schedule_submit);
        btn_txt.setVisibility(View.GONE);
        TextView view_txt=(TextView) v.findViewById(R.id.newaddr);
        TextView backtoold=(TextView) v.findViewById(R.id.old);
        exist_addr=(TextView)v.findViewById(R.id.eaddr);
        cdetails=(TextView)v.findViewById(R.id.crddgts);
        cdetails1=(TextView)v.findViewById(R.id.crdty);
        updatecrd=(TextView)v.findViewById(R.id.updcard);
        keepcrd=(TextView)v.findViewById(R.id.existngcard);

        //   new schedule_appointment.BackgroundWorkers().execute();
        adcard=(LinearLayout)v.findViewById(R.id.cardinfo);
        excard=(LinearLayout)v.findViewById(R.id.existcardinfo);


        tx = (TextView)v.findViewById(R.id.text1);

        tn2 = (EditText)v.findViewById(R.id.tkn2);
        tn3 = (EditText)v.findViewById(R.id.tkn3);
        tn4 = (EditText)v.findViewById(R.id.tkn4);
        // srvids = (EditText)v.findViewById(R.id.serviceid);



        crdstatus = (EditText)v.findViewById(R.id.cardstatus);

        ctkn = (EditText)v.findViewById(R.id.cardtkn);

        vl = (EditText)v.findViewById(R.id.adrhv);
        addr1 = (EditText)v.findViewById(R.id.addr1);
        addr2 = (EditText)v.findViewById(R.id.addr2);
        state = (EditText)v.findViewById(R.id.state);
        city = (EditText)v.findViewById(R.id.city);
        zip = (EditText)v.findViewById(R.id.zcode);
        country = (EditText)v.findViewById(R.id.country);

        cardn = (EditText)v.findViewById(R.id.card);
        em = (EditText)v.findViewById(R.id.expm);
        ey = (EditText)v.findViewById(R.id.expy);
        cvc = (EditText)v.findViewById(R.id.cvc);



        dyna=(LinearLayout)v.findViewById(R.id.dynamic);
        dyna_serviceid=(LinearLayout)v.findViewById(R.id.dynamic_serviceid);

/*        int i=1;
        for(i=1;i<=5;i++)
        {
            dynamic_text=new EditText(getActivity());
            dynamic_text.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
            dynamic_text.setHint("Fields"+i);
            dynamic_text.setId(i+10);
            dyna.addView(dynamic_text);
        }
        count=new EditText(getActivity());
        count.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        count.setHint("Total count");
        count.setId(100+1);

        count.setText(""+i);
        dyna.addView(count);

Dynamic adding data
  */
        spinnerFood = (Spinner)v.findViewById(R.id.spinner);
        //  txtCategory = (TextView) findViewById(R.id.txtCategory);

        categoriesList = new ArrayList<Category>();

        // spinner item select listener
        spinnerFood.setOnItemSelectedListener(this);
        categoriesList = new ArrayList<Category>();
        sessionManagement=new SessionManagement(getActivity().getApplicationContext());
        HashMap<String, String> user = sessionManagement.getdata();
        String name = user.get(SessionManagement.KEY_name);
        String email = user.get(SessionManagement.KEY_email);
        id = user.get(SessionManagement.KEY_id);
        type = user.get(SessionManagement.KEY_type);
        token = user.get(SessionManagement.KEY_token);
        stripeid = user.get(SessionManagement.KEY_stripeid);
        addressid = user.get(SessionManagement.KEY_addrid);



        // Spinner Drop down elements
        //categories = new ArrayList<String>();
        //url = "http://10.0.2.2:2426/Androidservices/getservices";
        //getdata = "http://10.0.2.2:2426/Androidservices/getsubservices";
        //url="http://noticeperiod.com/Androidservices/getservices?id="+id+"";
        //getdata="http://noticeperiod.com/Androidservices/getsubservices";
        // String login_url = "http://10.0.2.2:2426/Androidservices/signup";
        url = "http://10.0.2.2:4001/customer/servicesget";
        getdata = "http://10.0.2.2:4001/customer/subservices";

        textView=(TextView)v.findViewById(R.id.text1);

        new GetCategories().execute(id,token);

  /*      try {
            //JSONArray data = new JSONArray(getJSONUrl(url));

        } catch (JSONException e) {
            e.printStackTrace();
        }
*/
  /*      categories.add("Service Type");
        categories.add("Floor Cleaning");
        categories.add("Whitewash");

*/

        // Creating adapter for spinner
/*        ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_item, categories);

        spinner.setPrompt("Service Type");

        // Drop down layout style - list view with radio button
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        // attaching data adapter to spinner
        spinner.setAdapter(dataAdapter);


    */


        cnt=(EditText)v.findViewById(R.id.counter);

        cnt.setVisibility(View.GONE);


        dd=(EditText)v.findViewById(R.id.date);
        tt=(EditText)v.findViewById(R.id.time);
        // sbt=(Button)v.findViewById(R.id.schedule_submit);
        qt=(Button)v.findViewById(R.id.quote);
        calc=(TextView)v.findViewById(R.id.calcu);
        calc1=(TextView)v.findViewById(R.id.calcu1);

        qt.setVisibility(View.GONE);
        calc1.setVisibility(View.GONE);


        qt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String cnv=cnt.getText().toString();

                int cnvv=Integer.parseInt(cnv);
                String res=null,res1 = null,res2=null,res3=null,res4=null;
                calc1.setVisibility(View.VISIBLE);
                calc.setVisibility(View.VISIBLE);
                btn_txt.setVisibility(View.VISIBLE);
                calc1.setText(Html.fromHtml("<h1> Calculation : </h1>"));
  /*              for(int i=1;i<=cnvv;i++)
                {
                    int prm=i+11;
                  //  param=(EditText)v.findViewById(R.id.prm);


                }
*/
                seramt1=0;
                seramt3=0;

                seramt=0;
                param_value=null;
                param_amt=null;
                //String[] strings = new String[](allEds.size());

                for(int i=0; i <allEds.size(); i++){

                    res1= allEds.get(i).getText().toString();
                    res2= allEds_amt.get(i).getText().toString();
                    res3= allEds_tags.get(i).getText().toString();
                    res4= allEds_ids.get(i).getText().toString();

                    if(res1.equals(null) || res2.equals(null)) {

                    }
                    else
                    {
                        if(res3.equals("# of Kitchens"))
                        {

                            String bdrms=allEds.get(0).getText().toString();
                            if(bdrms.equals("1"))
                            {
                                seramt = Float.parseFloat(res1) * Float.parseFloat(res2);
                                res += res3 + " : " + res1 + " X " + res2 + " = " + seramt + "<br/>";
                                seramt1 = seramt1 + seramt;

                                param_value += res1 + "^";
                                param_amt += res2 + "^";
                                param_id += res4 + "^";

                            }
                            else {
                                // Float rv=0.1;
                                double ktch = (Float.parseFloat(bdrms) * (0.1)) + 1;


                                seramt = (float) ((Float.parseFloat(res1) * Float.parseFloat(res2)) * ktch);
                                res += res3 + "( 10% of bedrooms ) : " + res1 + " X " + res2 + " = " + seramt + "<br/>";
                                seramt1 = seramt1 + seramt;

                                param_value += res1 + "^";
                                param_amt += res2 + "^";
                                param_id += res4 + "^";

                            }
                        }
                        else {
                            seramt = Float.parseFloat(res1) * Float.parseFloat(res2);
                            res += res3 + " : " + res1 + " X " + res2 + " = " + seramt + "<br/>";
                            seramt1 = seramt1 + seramt;

                            param_value += res1 + "^";
                            param_amt += res2 + "^";
                            param_id += res4 + "^";

                        }

                    }

                }

                double fres = Math.round(((seramt1/60)*25)*100.0)/100.0;
                double fhr = Math.round((seramt1/60)*100.0)/100.0;
                seramt3=fres;

//                calc.setText(Html.fromHtml("<b>Cost per Hr / $25</b><br/><h5><b'>"+res.substring(4)+"<h2>Total Mins : <u>"+seramt1+"</u></h2><br/><h2>Total Hours : <u> "+fhr+"</u></h2><br/><h2>Sub Total : <u> $ "+fres+"</u></h2></b></h5>"));
                calc.setText(Html.fromHtml("<h5><b><h2>Sub Total : <u> $ "+fres+"</u></h2></b></h5>"));

                //  Toast.makeText(getActivity(),"particular : "+res1+" amount : "+res2,Toast.LENGTH_LONG).show();




                if(tn2.getText().toString().equals("0"))
                {
                    adcard.setVisibility(View.VISIBLE);
                    excard.setVisibility(View.GONE);
                    crdstatus.setText("0");
                    keepcrd.setVisibility(View.GONE);


                }
                else
                {

                    adcard.setVisibility(View.GONE);
                    excard.setVisibility(View.VISIBLE);
                    int len=tn3.getText().toString().length();
                    if(len==1)
                    {
                        cdetails.setText(Html.fromHtml("<b>Card Number : </b>000"+tn3.getText().toString()) );

                    }
                    else if(len==3)
                    {
                        cdetails.setText(Html.fromHtml("<b>Card Number : </b>0"+tn3.getText().toString()) );

                    }
                    else if(len==2)
                    {
                        cdetails.setText(Html.fromHtml("<b>Card Number : </b>00"+tn3.getText().toString()) );

                    }
                    else
                    {
                        cdetails.setText(Html.fromHtml("<b>Card Number : </b>"+tn3.getText().toString()) );

                    }
                    cdetails1.setText(Html.fromHtml("<b>Card Type : </b>"+tn4.getText().toString()) );
                    crdstatus.setText("1");

                }



            }
        });

        updatecrd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                adcard.setVisibility(View.VISIBLE);
                excard.setVisibility(View.GONE);
                crdstatus.setText("0");

            }
        });

        keepcrd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                adcard.setVisibility(View.GONE);
                excard.setVisibility(View.VISIBLE);
                crdstatus.setText("1");

            }
        });


  /*      sbt.setOnClickListener(new View.OnClickListener() {
                                  @Override
                                  public void onClick(View view) {


                                      Toast.makeText(getActivity(),"particular : ",Toast.LENGTH_LONG).show();

                                     // new Backgroundservicerequest().execute(id,type,dd.toString(),tt.toString());


                                      //Toast.makeText(getActivity(),"Successfully Schedule Appointment",Toast.LENGTH_LONG).show();
                                      //Intent intent = new Intent(getActivity(), Logon.class);
                                      //startActivity(intent);

                                  }
                              });

*/
        dd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                // Get Current Date
                final Calendar c = Calendar.getInstance();
                mYear = c.get(Calendar.YEAR);
                mMonth = c.get(Calendar.MONTH);
                mDay = c.get(Calendar.DAY_OF_MONTH);


                DatePickerDialog datePickerDialog = new DatePickerDialog(getActivity(),
                        new DatePickerDialog.OnDateSetListener() {

                            @Override
                            public void onDateSet(DatePicker view, int year,
                                                  int monthOfYear, int dayOfMonth) {

                                dd.setText(dayOfMonth + "-" + (monthOfYear + 1) + "-" + year);

                            }
                        }, mYear, mMonth, mDay);
                datePickerDialog.show();



            }
        });

        tt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                // Get Current Time
                final Calendar c = Calendar.getInstance();
                mHour = c.get(Calendar.HOUR_OF_DAY);
                mMinute = c.get(Calendar.MINUTE);

                // Launch Time Picker Dialog
                TimePickerDialog timePickerDialog = new TimePickerDialog(getActivity(),
                        new TimePickerDialog.OnTimeSetListener() {

                            @Override
                            public void onTimeSet(TimePicker view, int hourOfDay,
                                                  int minute) {

                                tt.setText(hourOfDay + ":" + minute);
                            }
                        }, mHour, mMinute, false);
                timePickerDialog.show();


            }
        });



        view_txt.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {

                linearLayout.setVisibility(View.GONE);

                newaddr.setVisibility(View.VISIBLE);
                vl.setText("1");
                //Toast.makeText(getActivity(),"Frament button is clicked",Toast.LENGTH_LONG).show();

  /*              Fragment fragment = new new_address();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.content_main, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
*/
            }

        });

        backtoold.setOnClickListener(new View.OnClickListener()
        {

            @Override
            public void onClick(View view) {


                linearLayout.setVisibility(View.VISIBLE);

                newaddr.setVisibility(View.GONE);
                vl.setText("0");

            }
        });
        btn_txt.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {

                //Toast.makeText(getActivity(),"Frament button is clicked",Toast.LENGTH_LONG).show();

/*
                Fragment fragment = new appointments_fragment();
                FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.content_main, fragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
*/

                //Toast.makeText(getActivity(),"particular : "+param_value+" spinner "+param_amt,Toast.LENGTH_LONG).show();

                if(vl.getText().toString().equals("0")) {

                    if (spinnerFood.getSelectedItem().equals("Service Type")) {
                        Toast.makeText(getActivity(),"Please choose service type",Toast.LENGTH_LONG).show();

                    } else if (dd.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Date should not empty.!",Toast.LENGTH_LONG).show();
                    } else if (tt.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Time should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else {

                        if(crdstatus.getText().toString().equals("0"))
                        {
//|| cardn.getText().toString().length()<16 || cardn.getText().toString().length()>16
                            if (cardn.getText().toString().isEmpty() ) {
                                Toast.makeText(getActivity(),"Card number should not empty and it should be 16 digits.!",Toast.LENGTH_LONG).show();
                            }
                            else if (em.getText().toString().isEmpty() || em.getText().toString().length()<2 || em.getText().toString().length()>2) {
                                Toast.makeText(getActivity(),"Expiry date should not empty and it should be 2 digits!",Toast.LENGTH_LONG).show();
                            }
                            else if (ey.getText().toString().isEmpty() || ey.getText().toString().length()<4 || ey.getText().toString().length()>4) {
                                Toast.makeText(getActivity(),"Expiry year should not empty and it should be 4 digits.!",Toast.LENGTH_LONG).show();
                            }
                            else if (cvc.getText().toString().isEmpty() || cvc.getText().toString().length()<3 || cvc.getText().toString().length()>3) {
                                Toast.makeText(getActivity(),"CVC should not empty and it should be 3 digits.!",Toast.LENGTH_LONG).show();
                            }
                            else
                            {


                                Card card = new Card(cardn.getText().toString(), Integer.parseInt(em.getText().toString()), Integer.parseInt(ey.getText().toString()), cvc.getText().toString());
                                //String wa=card.getCustomerId();
                                // tt.setText(wa);
// Remember to validate the card object before you use it to save time.
                                if (!card.validateCard()) {
                                    // Do not continue token creation.

                                    Toast.makeText(getActivity(), "Invalid card number.!", Toast.LENGTH_LONG).show();
                                } else if (!card.validateCVC()) {
                                    Toast.makeText(getActivity(), "Invalid cvc number.!", Toast.LENGTH_LONG).show();
                                } else {

                                    Stripe stripe = new Stripe(getActivity(), "pk_test_eu5vgSNxVXBVTWNqHxQNKVls");
                                    stripe.createToken(
                                            card,
                                            new TokenCallback() {
                                                public void onSuccess(Token token) {
                                                    // Send token to your server
                                                    // Toast.makeText(getContext(),token.getId(),Toast.LENGTH_LONG).show();
                                                    ctkn.setText(token.getId());
                                                    //new Backgroundservicerequest().execute(id,type,dd.getText().toString(),tt.getText().toString(), String.valueOf(seramt3),addr1.getText().toString(),addr2.getText().toString(),city.getText().toString(),state.getText().toString(),country.getText().toString(),zip.getText().toString(),spinnerFood.getSelectedItem().toString(),cnt.getText().toString(),param_value.substring(4),param_amt.substring(4),token,param_id.substring(4));

                                                }
                                                public void onError(Exception error) {
                                                    // Show localized error message
                                                    Toast.makeText(getContext(),error.getLocalizedMessage(),Toast.LENGTH_LONG).show();
                                                }
                                            }
                                    );
                                    //Toast.makeText(getContext(),ctkn.getText().toString(),Toast.LENGTH_LONG).show();

                                    new Backgroundservicerequest().execute(id,type,dd.getText().toString(),tt.getText().toString(), String.valueOf(seramt3),addr1.getText().toString(),addr2.getText().toString(),city.getText().toString(),state.getText().toString(),country.getText().toString(),zip.getText().toString(),spinnerFood.getSelectedItem().toString(),cnt.getText().toString(),param_value.substring(4),param_amt.substring(4),token,param_id.substring(4),ctkn.getText().toString(),tn2.getText().toString(),crdstatus.getText().toString(),stripeid.toString(),addressid.toString());

                                }


                            }

                        }
                        else
                        {
                            new Backgroundservicerequest().execute(id,type,dd.getText().toString(),tt.getText().toString(), String.valueOf(seramt3),addr1.getText().toString(),addr2.getText().toString(),city.getText().toString(),state.getText().toString(),country.getText().toString(),zip.getText().toString(),spinnerFood.getSelectedItem().toString(),cnt.getText().toString(),param_value.substring(4),param_amt.substring(4),token,param_id.substring(4),ctkn.getText().toString(),tn2.getText().toString(),crdstatus.getText().toString(),stripeid.toString(),addressid.toString());

                        }


                    }

                }
                else if(vl.getText().toString().equals("1"))
                {
                    if (spinnerFood.getSelectedItem().equals("Service Type")) {
                        Toast.makeText(getActivity(),"Please choose service type",Toast.LENGTH_LONG).show();

                    } else if (dd.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Date should not empty.!",Toast.LENGTH_LONG).show();
                    } else if (tt.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Time should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else if (addr1.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Address line1 should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else if (addr2.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Address line2 should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else if (state.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"State should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else if (city.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"City should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else if (zip.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Zipcode should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else if (country.getText().toString().isEmpty()) {
                        Toast.makeText(getActivity(),"Country should not empty.!",Toast.LENGTH_LONG).show();
                    }
                    else
                    {


                        if(crdstatus.getText().toString().equals("0"))
                        {
//|| cardn.getText().toString().length()<16 || cardn.getText().toString().length()>16
                            if (cardn.getText().toString().isEmpty() ) {
                                Toast.makeText(getActivity(),"Card number should not empty and it should be 16 digits.!",Toast.LENGTH_LONG).show();
                            }
                            else if (em.getText().toString().isEmpty() || em.getText().toString().length()<2 || em.getText().toString().length()>2) {
                                Toast.makeText(getActivity(),"Expiry date should not empty and it should be 2 digits!",Toast.LENGTH_LONG).show();
                            }
                            else if (ey.getText().toString().isEmpty() || ey.getText().toString().length()<4 || ey.getText().toString().length()>4) {
                                Toast.makeText(getActivity(),"Expiry year should not empty and it should be 4 digits.!",Toast.LENGTH_LONG).show();
                            }
                            else if (cvc.getText().toString().isEmpty() || cvc.getText().toString().length()<3 || cvc.getText().toString().length()>3) {
                                Toast.makeText(getActivity(),"CVC should not empty and it should be 3 digits.!",Toast.LENGTH_LONG).show();
                            }
                            else
                            {


                                Card card = new Card(cardn.getText().toString(), Integer.parseInt(em.getText().toString()), Integer.parseInt(ey.getText().toString()), cvc.getText().toString());
                                //String wa=card.getCustomerId();
                                // tt.setText(wa);
// Remember to validate the card object before you use it to save time.
                                if (!card.validateCard()) {
                                    // Do not continue token creation.

                                    Toast.makeText(getActivity(), "Invalid card number.!", Toast.LENGTH_LONG).show();
                                } else if (!card.validateCVC()) {
                                    Toast.makeText(getActivity(), "Invalid cvc number.!", Toast.LENGTH_LONG).show();
                                } else {

                                    Stripe stripe = new Stripe(getActivity(), "pk_test_eu5vgSNxVXBVTWNqHxQNKVls");
                                    stripe.createToken(
                                            card,
                                            new TokenCallback() {
                                                public void onSuccess(Token token) {
                                                    // Send token to your server
                                                    // Toast.makeText(getContext(),token.getId(),Toast.LENGTH_LONG).show();
                                                    ctkn.setText(token.getId());
                                                    //new Backgroundservicerequest().execute(id,type,dd.getText().toString(),tt.getText().toString(), String.valueOf(seramt3),addr1.getText().toString(),addr2.getText().toString(),city.getText().toString(),state.getText().toString(),country.getText().toString(),zip.getText().toString(),spinnerFood.getSelectedItem().toString(),cnt.getText().toString(),param_value.substring(4),param_amt.substring(4),token,param_id.substring(4));

                                                }
                                                public void onError(Exception error) {
                                                    // Show localized error message
                                                    Toast.makeText(getContext(),error.getLocalizedMessage(),Toast.LENGTH_LONG).show();
                                                }
                                            }
                                    );
                                    //Toast.makeText(getContext(),ctkn.getText().toString(),Toast.LENGTH_LONG).show();

                                    new Backgroundservicerequest().execute(id,type,dd.getText().toString(),tt.getText().toString(), String.valueOf(seramt3),addr1.getText().toString(),addr2.getText().toString(),city.getText().toString(),state.getText().toString(),country.getText().toString(),zip.getText().toString(),spinnerFood.getSelectedItem().toString(),cnt.getText().toString(),param_value.substring(4),param_amt.substring(4),token,param_id.substring(4),ctkn.getText().toString(),tn2.getText().toString(),crdstatus.getText().toString(),stripeid.toString(),addressid.toString());

                                }


                            }

                        }
                        else
                        {
                            new Backgroundservicerequest().execute(id,type,dd.getText().toString(),tt.getText().toString(), String.valueOf(seramt3),addr1.getText().toString(),addr2.getText().toString(),city.getText().toString(),state.getText().toString(),country.getText().toString(),zip.getText().toString(),spinnerFood.getSelectedItem().toString(),cnt.getText().toString(),param_value.substring(4),param_amt.substring(4),token,param_id.substring(4),ctkn.getText().toString(),tn2.getText().toString(),crdstatus.getText().toString(),stripeid.toString(),addressid.toString());

                        }


                    }

                }


                //      Intent intent = new Intent(getActivity(), Logon.class);
                //    startActivity(intent);

                //  Toast.makeText(getApplicationContext(),"Frament button is clicked",Toast.LENGTH_LONG).show();
                // Toast.makeText(getApplicationContext(), "This is a plain toast.", Toast.LENGTH_SHORT).show();

            }

        });

        return v;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);


        getActivity().setTitle("Schedule Appointment");

    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        // On selecting a spinner item
        String item = parent.getItemAtPosition(position).toString();


        // res4= serviceids.get(id).getText().toString();

        // srvids.setText(categoriesList.get(2).getId());
        // Showing selected spinner item
        //Category country = (Category) parent.getSelectedItem();

        //Toast.makeText(parent.getContext(),parent.getItemAtPosition(position).toString() +" Selected" ,Toast.LENGTH_LONG).show();

        if(parent.getItemAtPosition(position).toString().equals("Service Type"))
        {

        }
        else {
            calc1.setVisibility(View.GONE);
            calc.setVisibility(View.GONE);
            qt.setVisibility(View.GONE);

            //  Toast.makeText(parent.getContext(), serviceids.get((int) (id-1)).getText().toString()+" Selected: " + item+" "+position+" "+id, Toast.LENGTH_LONG).show();
            ssid=serviceids.get((int) (id-1)).getText().toString();
            new getsubservices().execute(ssid,token);
        }
    }
    public void onNothingSelected(AdapterView<?> arg0) {
        // TODO Auto-generated method stub
    }



    private void populateSpinner() {
        List<String> lables = new ArrayList<String>();
        lables.add("Service Type");
        // txtCategory.setText("");

        for (int i = 0; i < categoriesList.size(); i++) {
            lables.add(categoriesList.get(i).getName());
            exist_addr.setText(categoriesList.get(i).getAddress());

            tn2.setText(categoriesList.get(i).getTkndata2());
            tn3.setText(categoriesList.get(i).getTkndata3());
            tn4.setText(categoriesList.get(i).getTkndata4());
            // srvids.setText(categoriesList.get(i).getId());



        }

        // Creating adapter for spinner
        ArrayAdapter<String> spinnerAdapter = new ArrayAdapter<String>(getActivity(),android.R.layout.simple_spinner_item, lables);

        // Drop down layout style - list view with radio button
        spinnerAdapter
                .setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        // attaching data adapter to spinner
        spinnerFood.setAdapter(spinnerAdapter);
    }

    /**
     * Async task to get all food categories
     * */
    private class GetCategories extends AsyncTask<Object, Object, String> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

        }

        @Override
        protected String doInBackground(Object... arg0) {


            Object id = arg0[0];
            Object newtoken = arg0[1];


            // Preparing post params
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("id", (String) id));
            params.add(new BasicNameValuePair("token", (String) newtoken));


            ServiceHandler serviceClient = new ServiceHandler();

            String json = serviceClient.makeServiceCall(url,
                    ServiceHandler.POST, params);


//            ServiceHandler jsonParser = new ServiceHandler();
            //String json = jsonParser.makeServiceCall(url, ServiceHandler.GET);

            Log.e("Response: ", "> " + json);


            return json;
        }

        @Override
        protected void onPostExecute(String result) {
            //  super.onPostExecute(result);

            //  dyna_serviceid.addView(srvids);


            if (result != null) {
                try {
                    JSONObject jsonObj = new JSONObject(result);
                    if (jsonObj != null) {


  /*                      JSONArray categories_addr = jsonObj.getJSONArray("user_address");

                        for (int i = 0; i < categories_addr.length(); i++) {
                            JSONObject catObj_addr = (JSONObject) categories_addr.get(i);

                            exist_addr.setText(Html.fromHtml(catObj_addr.getString("addr1")+", "+catObj_addr.getString("addr2")+", <br/>"+catObj_addr.getString("city")+", "+catObj_addr.getString("state")+", <br/>"+catObj_addr.getString("country")+", "+catObj_addr.getString("zip")));
                        }
*/

                        serviceids = new ArrayList<EditText>();
                        JSONArray categories = jsonObj.getJSONArray("data");

                        for (int i = 0; i < categories.length(); i++) {
                            JSONObject catObj = (JSONObject) categories.get(i);



                            String ii = catObj.getString("code");

                            if (ii.equals("404")) {
                                Toast.makeText(getActivity(), "Session is expired...", Toast.LENGTH_LONG).show();
                                sessionManagement.logout();

                            }
                            else {

                                // serids+=serids+catObj.getInt("id")+"^";

                                //  tx.setText("asdas");
                                srvids=new EditText(getActivity());

                                srvids.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                                srvids.setHint(catObj.getString("id"));
                                srvids.setText(catObj.getString("id"));
                                srvids.setVisibility(View.GONE);
                                srvids.setId(i+511);
                                serviceids.add(srvids);
                                dyna_serviceid.addView(srvids);
                                // dyna.addView(srvids);


                                //exist_addr.setText(Html.fromHtml(catObj.getString("addr1")+", "+catObj.getString("addr2")+", <br/>"+catObj.getString("city")+", "+catObj.getString("state")+", <br/>"+catObj.getString("country")+", "+catObj.getString("zip")));
                                String adr = catObj.getString("addr1") + ", " + catObj.getString("addr2") + ", " + catObj.getString("city") + ", " + catObj.getString("state") + ", " + catObj.getString("country") + ", " + catObj.getString("zip");
                                Category cat = new Category(catObj.getInt("id"),
                                        catObj.getString("name"), adr, catObj.getString("cstatus"), catObj.getString("ldigits"), catObj.getString("ctype"));
                                categoriesList.add(cat);




                            }
                        }


                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }



            } else {
                Log.e("JSON Data", "Didn't receive any data from server!");
            }

            // tx.setText(serids);
            populateSpinner();
        }

    }













    private class getsubservices extends AsyncTask<Object, Object, String> {

        boolean isNewCategoryCreated = false;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

        }

        @Override
        protected String doInBackground(Object... arg) {

            Object newCategory = arg[0];
            Object newtoken = arg[1];


            // Preparing post params
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("name", (String) newCategory));
            params.add(new BasicNameValuePair("token", (String) newtoken));


            ServiceHandler serviceClient = new ServiceHandler();

            String json = serviceClient.makeServiceCall(getdata,
                    ServiceHandler.POST, params);

            Log.d("Create Response: ", "> " + json);

            return json;

            //return null;
        }

        @Override
        protected void onPostExecute(String result) {

            // dd.setText(result);

            try {
                JSONObject jsonObj = new JSONObject(result);
                if (jsonObj != null) {
                    JSONArray categories = jsonObj
                            .getJSONArray("category");
                    int j=0;
                    dyna.removeAllViews();

                    allEds = new ArrayList<EditText>();
                    allEds_amt = new ArrayList<EditText>();
                    allEds_ids = new ArrayList<EditText>();

                    //flabels=new ArrayList<android.support.design.widget.TextInputLayout>();
                    allEds_tags = new ArrayList<EditText>();

                    for (int i = 0; i < categories.length(); i++) {
                        j++;
                        JSONObject catObj = (JSONObject) categories.get(i);
                        //  fl1=new android.support.design.widget.TextInputLayout(getActivity());
                        // fl1.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                        dynamic_text=new EditText(getActivity());
                        allEds.add(dynamic_text);
                        dynamic_text.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                        dynamic_text.setHint(catObj.getString("tag"));
                        dynamic_text.setId(i+11);
                        //fl1.addView(dynamic_text);
                        dyna.addView(dynamic_text);



                        dynamic_text1=new EditText(getActivity());
                        allEds_amt.add(dynamic_text1);
                        dynamic_text1.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                        dynamic_text1.setHint(catObj.getString("amount"));
                        dynamic_text1.setText(catObj.getString("amount"));

                        dynamic_text1.setId(i+21);
                        dynamic_text1.setVisibility(View.GONE);
                        dyna.addView(dynamic_text1);



                        dynamic_text2=new EditText(getActivity());
                        allEds_tags.add(dynamic_text2);
                        dynamic_text2.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                        dynamic_text2.setText(catObj.getString("tag"));
                        dynamic_text2.setId(i+31);
                        dynamic_text2.setVisibility(View.GONE);
                        dyna.addView(dynamic_text2);


                        dynamic_text3=new EditText(getActivity());
                        allEds_ids.add(dynamic_text3);
                        dynamic_text3.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                        dynamic_text3.setText(catObj.getString("id"));
                        dynamic_text3.setId(i+41);
                        dynamic_text3.setVisibility(View.GONE);
                        dyna.addView(dynamic_text3);



                        /*Category cat = new Category(catObj.getInt("id"),
                                catObj.getString("name"));
                        categoriesList.add(cat);

                        */
                    }
                    cnt.setText(""+j);
                    qt.setVisibility(View.VISIBLE);
                    /*
                    count=new EditText(getActivity());
                    count.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                    count.setHint("Total count");
                    count.setId(100+1);

                    count.setText(""+j);
                    count.setVisibility(View.GONE);
                    dyna.addView(count);*/

                }

            } catch (JSONException e) {
                e.printStackTrace();
            }


        }
    }



    class Backgroundservicerequest extends AsyncTask<String, Integer, String> {

        String JSON_STRING;
        Context context;
        AlertDialog alertDialog;

        @Override
        protected String doInBackground(String... params) {

            //String login_url = "http://10.0.2.2:2426/Androidservices/service_request";
            //String login_url="http://noticeperiod.com/Androidservices/service_request";
            String login_url = "http://10.0.2.2:4001/customer/schedule";


            //  if (type.equals("login")) {
            try {
                String s_id = params[0].toString();
                String s_type = params[1].toString();
                String s_date = params[2].toString();
                String s_time = params[3].toString();
                String s_amount = params[4].toString();
                String s_addr1 = params[5].toString();
                String s_addr2 = params[6].toString();
                String s_city = params[7].toString();
                String s_state = params[8].toString();
                String s_country = params[9].toString();
                String s_zip = params[10].toString();

                String service = params[11].toString();

                String pmax = params[12].toString();

                String pvalue = params[13].toString();

                String pamt = params[14].toString();
                String tokens = params[15].toString();
                String prmid = params[16].toString();

                String cardtoken = params[17].toString();

                String cardid = params[18].toString();

                String statuscard = params[19].toString();
                String stripei = params[20].toString();
                String addressi = params[21].toString();

                //dd.setText(cardtoken);
                /*
                SharedPreferences pref;
                SharedPreferences.Editor editor = null;

                final String KEY_cardtoken = "cardtoken";
                final String KEY_cardid = "cardid";
                final String KEY_carddigits = "carddigits";
                final String KEY_cardtype = "cardtype";


                editor.putString(KEY_cardtoken,cardtoken);
                editor.putString(KEY_cardid,crdid);
                editor.putString(KEY_carddigits,crddigits);
                editor.putString(KEY_cardtype,crdtype);
                editor.apply();*/

                URL url = new URL(login_url);
                HttpURLConnection httpsURLConnection = (HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream = httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data = URLEncoder.encode("id", "UTF-8") + "=" + URLEncoder.encode(s_id, "UTF-8") + "&" +URLEncoder.encode("type", "UTF-8") + "=" + URLEncoder.encode(s_type, "UTF-8")+ "&" +URLEncoder.encode("date", "UTF-8") + "=" + URLEncoder.encode(s_date, "UTF-8")+ "&" +URLEncoder.encode("time", "UTF-8") + "=" + URLEncoder.encode(s_time, "UTF-8")+ "&" +URLEncoder.encode("amount", "UTF-8") + "=" + URLEncoder.encode(s_amount, "UTF-8")+ "&" + URLEncoder.encode("addr1", "UTF-8") + "=" + URLEncoder.encode(s_addr1, "UTF-8")+ "&" + URLEncoder.encode("addr2", "UTF-8") + "=" + URLEncoder.encode(s_addr2, "UTF-8")+ "&" + URLEncoder.encode("city", "UTF-8") + "=" + URLEncoder.encode(s_city, "UTF-8")+ "&" + URLEncoder.encode("state", "UTF-8") + "=" + URLEncoder.encode(s_state, "UTF-8")+ "&" + URLEncoder.encode("zip", "UTF-8") + "=" + URLEncoder.encode(s_zip, "UTF-8")+ "&" + URLEncoder.encode("country", "UTF-8") + "=" + URLEncoder.encode(s_country, "UTF-8")+ "&" + URLEncoder.encode("service", "UTF-8") + "=" + URLEncoder.encode(ssid, "UTF-8")+ "&" + URLEncoder.encode("max", "UTF-8") + "=" + URLEncoder.encode(pmax, "UTF-8")+ "&" + URLEncoder.encode("paramv", "UTF-8") + "=" + URLEncoder.encode(pvalue, "UTF-8")+ "&" + URLEncoder.encode("parama", "UTF-8") + "=" + URLEncoder.encode(pamt, "UTF-8") + "&" + URLEncoder.encode("token","UTF-8") + "=" + URLEncoder.encode(tokens,"UTF-8") + "&" + URLEncoder.encode("prmid","UTF-8") + "=" + URLEncoder.encode(prmid,"UTF-8") + "&" + URLEncoder.encode("cardtoken","UTF-8") + "=" + URLEncoder.encode(ctkn.getText().toString(),"UTF-8") + "&" + URLEncoder.encode("cardid","UTF-8") + "=" + URLEncoder.encode(tn2.getText().toString(),"UTF-8") + "&" + URLEncoder.encode("statuscard","UTF-8") + "=" + URLEncoder.encode(statuscard,"UTF-8") + "&" + URLEncoder.encode("stripeidcus","UTF-8") + "=" + URLEncoder.encode(stripei,"UTF-8") + "&" + URLEncoder.encode("adrid","UTF-8") + "=" + URLEncoder.encode(addressi,"UTF-8");
                //tt.setText(post_data);
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


            progressDialog = ProgressDialog.show(getActivity(), "Loading...",
                    "Service request is processing, please wait...", false, false);
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
                //tx.setText(result);
                String ii = jsonObject.getString("code");
                //String uid = jsonObject.getString("userid");
//                Toast.makeText(getActivity(), "Unable to proceed. Please try again... "+result, Toast.LENGTH_LONG).show();

                //Integer ii=jsonObject.getInt("code");

                // EditText editText = (EditText) findViewById(R.id.username);

                //editText.setText(ii);


                //EditText editText2 = (EditText) findViewById(R.id.password);


                if (ii.equals("1")) {

                    //Globalvariables_set gbl=((Globalvariables_set)getApplicationContext());
                    //gbl.setSignup_userid(uid);

                    // ((Globalvariables_set) this.getApplication()).setSignup_userid(uid);






                    Toast.makeText(getActivity(), "Successfully Service Requested...", Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(getActivity(), Logon.class);
                    startActivity(intent);


                } else if (ii.equals("0")) {
                    Toast.makeText(getActivity(), "Unable to proceed. Please try again...", Toast.LENGTH_LONG).show();


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





}


