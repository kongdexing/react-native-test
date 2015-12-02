package com.demoproject;

import android.app.Application;
import android.content.Context;

/**
 * Created by kongdexing on 12/2/15.
 */
public class demoAPP extends Application {

    private Context mContext;
    private static demoAPP mInstance = null;

    public static demoAPP sharedInstance() {
        return mInstance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
    }

    public void setContext(Context context){
        mContext = context;
    }

    public Context getContext(){
        return mContext;
    }

}
