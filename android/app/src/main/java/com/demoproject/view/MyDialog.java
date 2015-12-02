package com.demoproject.view;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.demoproject.R;

/**
 * Created by kongdexing on 3/2/15.
 */

public class MyDialog extends Dialog implements OnClickListener {

    private OnCustomDialogListener customDialogListener;
    private OnPasswordVisibilityListener passwordVisibilityListener;
    private RelativeLayout parentview;
    private Context context;
    private LinearLayout ll_dialogview;
    private TextView txt_cancle, txt_confirm;
    private RelativeLayout rl_wifipassword_visibility;
    private ImageView img_wifipassword_visibility;

    public MyDialog(Context context,
                    OnCustomDialogListener _customDialogListener) {
        super(context);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.context = context;
        customDialogListener = _customDialogListener;
        setContentView(R.layout.layout_mydialog);
        parentview = (RelativeLayout) findViewById(R.id.parentview);
        ll_dialogview = (LinearLayout) findViewById(R.id.ll_dialogview);
        txt_cancle = (TextView) findViewById(R.id.txt_cancle);
        txt_confirm = (TextView) findViewById(R.id.txt_confirm);
        txt_cancle.setOnClickListener(this);
        txt_confirm.setOnClickListener(this);
        this.setCanceledOnTouchOutside(false);
        this.setOnKeyListener(new OnKeyListener() {

            @Override
            public boolean onKey(DialogInterface dialog, int keyCode,
                                 KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK) {
                    // 操作
                    if (customDialogListener != null) {
                        customDialogListener.onCancle();
                        dismiss();
                        return true;
                    }
                }
                return false;
            }
        });
    }


    public void setRightBtnText(int resId) {
        txt_confirm.setText(resId);
    }

    public void setConfirmVisible(boolean visible) {
        txt_confirm.setVisibility(visible ? View.VISIBLE : View.GONE);
    }

    public void setCancleVisible(boolean visible) {
        txt_cancle.setVisibility(visible ? View.VISIBLE : View.GONE);
    }

    public void setDialogView(int layoutId) {
        View view = LayoutInflater.from(this.context).inflate(layoutId, null);
        ll_dialogview.addView(view);
    }

    public void setDialogView(View view) {
        Log.i("song", "ll_dialogview == null:" + (ll_dialogview == null));
        ll_dialogview.addView(view);
    }

    public void setReminderText(String text){
        View view = LayoutInflater.from(this.context).inflate(
                R.layout.layout_mydialog_reminder, null);
        TextView txtmsg = (TextView) view.findViewById(R.id.txt_token);
        txtmsg.setText(text);
        ll_dialogview.addView(view);
    }

    public void setReminderText(int resid) {
        setReminderText(this.context.getString(resid));
    }

    public void setDialogBackground(String colorStr) {
        parentview.setBackgroundColor(Color.parseColor(colorStr));
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.txt_cancle:
                if (customDialogListener != null) {
                    customDialogListener.onCancle();
                }
                this.dismiss();
                break;
            case R.id.txt_confirm:
                if (customDialogListener != null) {
                    customDialogListener.onConfirm();
                }
                this.dismiss();
                break;
//            case R.id.rl_wifipassword_visibility:
//                if (passwordVisibilityListener != null) {
//                    updateCheckBox(passwordVisibilityListener.updateCheckBox());
//                }
//                return;
        }
    }

//    public void updateCheckBox(boolean wifiPasswordVisible) {
//        if (wifiPasswordVisible) {
//            img_wifipassword_visibility
//                    .setBackgroundResource(R.drawable.ic_check_pre);
//        }else{
//            img_wifipassword_visibility
//                    .setBackgroundResource(R.drawable.ic_check_def);
//        }
//    }

    /**
     * 初始化打开蓝牙时的提示框
     *
     * @param context
     * @return
     */
//    public MyDialog createBluetoothOpenDialog(final Context context,final OnCustomDialogListener dialogListener) {
//        View view = LayoutInflater.from(this.context).inflate(R.layout.dialog_create_bluetooth_open,
//                null);
//        MyDialog myDialog = new MyDialog(context,dialogListener);
//        myDialog.setDialogView(view);
//        return myDialog;
//    }

    public interface OnPasswordVisibilityListener {
        public boolean updateCheckBox();
    }

    public static class OnCustomDialogListener {
        public void onConfirm() {
        }

        public void onCancle() {
        }
    }

}

