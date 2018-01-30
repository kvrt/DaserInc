package Daser.team.com.app;

import android.app.AlertDialog;
import android.content.Context;
import android.os.AsyncTask;

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

/**
 * Created by MANOHAR on 11/20/2017.
 */

public class BackgroundWorker extends AsyncTask<String,Void,String> {

    String JSON_STRING;
    Context context;
    AlertDialog alertDialog;
    BackgroundWorker(Context ctx)
    {
        context = ctx;
    }
    @Override
    protected String doInBackground(String... params) {
        String type=params[0];
        String login_url="http://100.108.35.173:2426/Androidservices/insert.php";
        if(type.equals("login"))
        {
            try {
                String username = params[1].toString();
                String password = params[2].toString();

                URL url=new URL(login_url);
                HttpURLConnection httpsURLConnection=(HttpURLConnection) url.openConnection();
                httpsURLConnection.setRequestMethod("POST");
                httpsURLConnection.setDoOutput(true);
                httpsURLConnection.setDoInput(true);
                OutputStream outputStream=httpsURLConnection.getOutputStream();
                BufferedWriter bufferedWriter=new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                String post_data= URLEncoder.encode("username","UTF-8")+"="+URLEncoder.encode(username,"UTF-8")+"&"+URLEncoder.encode("password","UTF-8")+"="+URLEncoder.encode(password,"UTF-8");
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
            }
        }
        return null;
    }

    @Override
    protected void onPreExecute() {
  /*      alertDialog=new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Login Status");
*/

    }

    @Override
    protected void onPostExecute(String result) {
        //EditText editText=(EditText)findViewById(R.id.username);
    }

    @Override
    protected void onProgressUpdate(Void... values) {
        super.onProgressUpdate(values);
    }

}
