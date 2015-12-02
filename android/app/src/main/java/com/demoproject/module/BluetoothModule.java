package com.demoproject.module;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.demoproject.MainActivity;
import com.demoproject.R;
import com.demoproject.demoAPP;
import com.demoproject.view.MyDialog;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by kongdexing on 12/1/15.
 */
public class BluetoothModule extends ReactContextBaseJavaModule {

    private BluetoothAdapter btAdapter;
    private static final String STATE_TURNING_ON = "STATE_TURNING_ON";
    private static final String STATE_TURNING_OFF = "STATE_TURNING_OFF";
    private static final String STATE_ON = "STATE_ON";
    private static final String STATE_OFF = "STATE_OFF";
    private static final String STATE_FOUND = "STATE_FOUND";
    private static final String STATE_FINISHED = "STATE_FINISHED";
    private Callback mSuccessCallback = null;
    private ArrayList<BluetoothDevice> availableDevices;
    private ArrayList<BluetoothDevice> unpairedDevices;

    public BluetoothModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return BluetoothModule.class.getSimpleName();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(STATE_TURNING_ON, STATE_TURNING_ON);
        constants.put(STATE_ON, STATE_ON);
        constants.put(STATE_FOUND, STATE_FOUND);
        constants.put(STATE_FINISHED, STATE_FINISHED);
        return constants;
    }

    //添加注解，表明被js调用
    @ReactMethod
    public void getBluetoothList(Callback errorCallback, Callback successCallback) {
        try {
            btAdapter = BluetoothAdapter.getDefaultAdapter();
        } catch (Exception e) {
            errorCallback.invoke(R.string.msg_bluetooth_unavailable);
            return;
        }

        mSuccessCallback = successCallback;
        availableDevices = new ArrayList<BluetoothDevice>();
        unpairedDevices = new ArrayList<BluetoothDevice>();

        if (!btAdapter.isEnabled()) {
            IntentFilter intentFilter = new IntentFilter(
                    BluetoothAdapter.ACTION_STATE_CHANGED);
            getReactApplicationContext().registerReceiver(btReceiver, intentFilter);

            MyDialog myDialog = new MyDialog(demoAPP.sharedInstance().getContext(), new MyDialog.OnCustomDialogListener() {
                @Override
                public void onConfirm() {
                    super.onConfirm();
                    btAdapter.enable();
                }
            });
            myDialog.setReminderText(R.string.txt_bluetooth_open);
            myDialog.show();
            return;
        } else {
            startToBTList();
        }
    }

    private void startToBTList() {
        for (BluetoothDevice device : btAdapter.getBondedDevices()) {
            if (device.getName() != null && device.getName().length() > 0) {
                availableDevices.add(device);
            }
        }

        mSuccessCallback.invoke(STATE_FOUND, ConvertData(availableDevices), ConvertData(unpairedDevices));

        IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
        filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        demoAPP.sharedInstance().getContext().registerReceiver(mReceiver, filter);
    }

    private String ConvertData(ArrayList<BluetoothDevice> devices) {
        try {
            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < devices.size(); i++) {
                JSONObject json = new JSONObject();
                json.put("name", devices.get(i).getName());
                json.put("address", devices.get(i).getAddress());
                jsonArray.put(json);
            }
            JSONObject contentJson = new JSONObject();
            contentJson.put("total", jsonArray.length());
            contentJson.put("devices", jsonArray);
            return contentJson.toString();
        }catch (Exception ex){
            return "";
        }
    }

    private boolean deviceNotAdded(String deviceAddress) {
        if (unpairedDevices != null && unpairedDevices.size() > 0) {
            for (BluetoothDevice device : unpairedDevices) {
                if (device.getAddress().equals(deviceAddress)) {
                    return false;
                }
            }
        }
        return true;
    }

    BroadcastReceiver btReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            switch (intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, -1)) {
                case BluetoothAdapter.STATE_TURNING_ON:
                    mSuccessCallback.invoke(STATE_TURNING_ON);
                    break;
                case BluetoothAdapter.STATE_ON:
                    Toast.makeText(context, "蓝牙打开成功", Toast.LENGTH_SHORT).show();
                    mSuccessCallback.invoke(STATE_ON);
                    startToBTList();
                    break;
                default:
                    break;
            }
        }
    };

    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            // When discovery finds a device
            if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                // Get the BluetoothDevice object from the Intent
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                // If it's already paired, skip it, because it's been listed already
                if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
                    if (deviceNotAdded(device.getAddress())) {
                        Log.i("bluetooth", "GMScanDeviceAct addItem :" + device.getName());
                        mSuccessCallback.invoke(STATE_FOUND, ConvertData(availableDevices), ConvertData(unpairedDevices));
                    }
                }
                // When discovery is finished, change the Activity title
            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
                mSuccessCallback.invoke(STATE_FINISHED);
            }
        }
    };


}
