package Daser.team.com.app;

/**
 * Created by MANOHAR on 12/9/2017.
 */

public class Category {

    private int id;
    private String name;

    private String address;
    private String tkndata2;
    private String tkndata3;
    private String tkndata4;

    public Category(){}

    public Category(int id, String name, String address, String tkndata2, String tkndata3, String tkndata4){
        this.id = id;
        this.name = name;
        this.address = address;
        this.tkndata2=tkndata2;
        this.tkndata3=tkndata3;
        this.tkndata4=tkndata4;


    }

    public void setId(int id){
        this.id = id;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setAddress(String address){
        this.address = address;
    }
    public void setTkndata2(String tkndata2){
        this.tkndata2 = tkndata2;
    }
    public void setTkndata3(String tkndata3){
        this.tkndata3 = tkndata3;
    }
    public void setTkndata4(String tkndata4){
        this.tkndata4 = tkndata4;
    }

    public int getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }
    public String getAddress(){
        return this.address;
    }
    public String getTkndata2(){
        return this.tkndata2;
    }
    public String getTkndata3(){
        return this.tkndata3;
    }
    public String getTkndata4(){
        return this.tkndata4;
    }



}