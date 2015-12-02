package com.demoproject.module;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by kongdexing on 12/2/15.
 */
public class TestModule extends ReactContextBaseJavaModule {

    public TestModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return TestModule.class.getSimpleName();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void addition(int a, int b, Callback successCallback) {
        try {
            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < 3; i++) {
                JSONObject json = new JSONObject();
                json.put("name", "abc" + i);
                json.put("address", "address" + i);
                jsonArray.put(json);
            }
            JSONObject contentJson = new JSONObject();
            contentJson.put("total", jsonArray.length());
            contentJson.put("devices", jsonArray);
            successCallback.invoke(a + b + "", contentJson.toString());
        } catch (Exception ex) {
            successCallback.invoke(ex.getMessage());
        }
    }
}
