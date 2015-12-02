package com.demoproject.reactpackage;

import com.demoproject.module.BluetoothModule;
import com.demoproject.module.TestModule;
import com.demoproject.module.ToastModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.drawer.ReactDrawerLayoutManager;
import com.facebook.react.views.image.ReactImageManager;
import com.facebook.react.views.progressbar.ReactProgressBarViewManager;
import com.facebook.react.views.scroll.ReactHorizontalScrollViewManager;
import com.facebook.react.views.scroll.ReactScrollViewManager;
import com.facebook.react.views.switchview.ReactSwitchManager;
import com.facebook.react.views.text.ReactRawTextManager;
import com.facebook.react.views.text.ReactTextViewManager;
import com.facebook.react.views.text.ReactVirtualTextViewManager;
import com.facebook.react.views.textinput.ReactTextInputManager;
import com.facebook.react.views.toolbar.ReactToolbarManager;
import com.facebook.react.views.view.ReactViewManager;
import com.facebook.react.views.viewpager.ReactViewPagerManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by kongdexing on 11/20/15.
 */
public class ExampleReactPackage implements ReactPackage {

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return Arrays.asList(new ViewManager[]{new ReactDrawerLayoutManager(), new ReactHorizontalScrollViewManager(), new ReactImageManager(), new ReactProgressBarViewManager(), new ReactRawTextManager(), new ReactScrollViewManager(), new ReactSwitchManager(), new ReactTextInputManager(), new ReactTextViewManager(), new ReactToolbarManager(), new ReactViewManager(), new ReactViewPagerManager(), new ReactVirtualTextViewManager()});
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ToastModule(reactApplicationContext));
        modules.add(new BluetoothModule(reactApplicationContext));
        modules.add(new TestModule(reactApplicationContext));
        return modules;
    }
}
