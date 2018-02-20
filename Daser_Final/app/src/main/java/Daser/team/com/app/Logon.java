package Daser.team.com.app;


import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.app.Fragment;

import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

import com.google.firebase.iid.FirebaseInstanceId;

import java.util.HashMap;

public class Logon extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    SessionManagement sessionManagement;
    private SharedPreferences prefs;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logon);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


        sessionManagement=new SessionManagement(getApplicationContext());
        HashMap<String, String> user = sessionManagement.getdata();
        String name = user.get(SessionManagement.KEY_name);
        String lname = user.get(SessionManagement.KEY_lname);

        String email = user.get(SessionManagement.KEY_email);
        String id = user.get(SessionManagement.KEY_id);
        String type = user.get(SessionManagement.KEY_type);




        View hView =  navigationView.getHeaderView(0);
        TextView nav_user = (TextView)hView.findViewById(R.id.logonname);
        nav_user.setText("Username : "+name+" "+lname);
        TextView nav_usertype = (TextView)hView.findViewById(R.id.utype);
        nav_usertype.setText("Signer Type : "+type);

        Menu nav_Menu = navigationView.getMenu();


        displayselectedscreen(R.id.nav_gallery);
        if(type.equals("Seller"))
        {
           nav_Menu.findItem(R.id.nav_slideshow).setVisible(false);

        }
      // else
      // {
      //      displayselectedscreen(R.id.nav_slideshow);

      // }





    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.logon, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {

            sessionManagement.logout();
            /*
            Intent intent=new Intent(this,MainActivity.class);
            startActivity(intent);
            */
        }

        return super.onOptionsItemSelected(item);
    }


    private  void displayselectedscreen(int id)
    {
        Fragment fragment=null;
        switch(id)
        {
            case R.id.nav_help:
                fragment =new help();
                break;
            case R.id.nav_manage:
                fragment =new changepassword();
                // Intent intent=new Intent(this,Signup.class);
                //startActivity(intent);

                break;
            case R.id.nav_gallery:
                fragment = new seeker_appointments_fragment();
                break;
            case R.id.nav_slideshow:
                fragment = new schedule_appointment();
                break;
            case R.id.nav_logout:

sessionManagement.logout();


  /*              Intent intent=new Intent(this,MainActivity.class);
                startActivity(intent);
*/
                break;

            case R.id.nav_camera:
                fragment = new my_account();
                break;

        }
        if(fragment!=null)
        {
            FragmentTransaction ft=getSupportFragmentManager().beginTransaction();
            ft.replace(R.id.content_main, fragment);
            ft.commit();

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);

    }
    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        displayselectedscreen(id);

        return true;
    }
}
